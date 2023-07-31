using System.Text;
using api.DbContexts;
using api.Entities;
using api.Infrastructure;
using api.Infrastructure.Exceptions;
using api.Repositories;
using api.Services.Implementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
  .ConfigureApiBehaviorOptions(options =>
  {
    options.InvalidModelStateResponseFactory = context =>
      new BadRequestObjectResult(
        new ApiExceptionResponse()
        {
          Status = 400,
          Message = "The request model is not valid"
        }
      );
  });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
  c.SwaggerDoc("v1", new OpenApiInfo
  {
    Title = "JWTToken_Auth_API",
    Version = "v1"
  });
  c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
  {
    Name = "Authorization",
    Type = SecuritySchemeType.ApiKey,
    Scheme = "Bearer",
    BearerFormat = "JWT",
    In = ParameterLocation.Header,
    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
  });
  c.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddDbContext<DataContext>(options =>
{
  options.UseSqlite($"Data Source={Environment.CurrentDirectory}/parashich.db");
  if (builder.Environment.IsDevelopment())
  {
    options.LogTo(Console.WriteLine, LogLevel.Warning);
  }
});

builder.Services
  .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options =>
  {
    string jwtKey = builder.Configuration["Jwt:Key"] ??
     throw new Exception("Jwt:Key is not defined in a config");

    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
      ClockSkew = TimeSpan.Zero,
      RequireAudience = false,
      ValidateIssuer = false,
      ValidateAudience = false,
      ValidateLifetime = true,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
    options.Events = new JwtBearerEvents()
    {
      OnTokenValidated = async (context) =>
      {
        Guid userId = Guid.Parse(context.Principal!.Claims.FirstOrDefault(x => x.Type == "id")!.Value);

        DbContext dbContext = context.HttpContext.RequestServices.GetRequiredService<DataContext>();

        bool isUserExist = await dbContext.Set<User>().AnyAsync(user => user.Id == userId);
        if (!isUserExist)
        {
          context.Fail("Principal is not exist");
        }
      }
    };
  });

#region Custom services
builder.Services.AddSingleton<TokenService>();

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<HashService>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<DialogService>();
builder.Services.AddScoped<FileSavingService>();
builder.Services.AddScoped<PhotoSavingService>();
builder.Services.AddScoped<ProfileService>();
builder.Services.AddScoped<ProfileSettingsService>();
builder.Services.AddScoped<ProfileSearchService>();

builder.Services.AddScoped<UnitOfWork>();
#endregion

builder.Services.AddCors(options =>
{
  options.AddPolicy("Development", policy =>
  {
    policy
      .WithOrigins("http://localhost:3000", "https://localhost:3000")
      .WithOrigins("http://localhost:7114") // swagger
      .AllowAnyHeader()
      .AllowAnyMethod()
      .AllowCredentials();
  });
  options.AddPolicy("Production", policy =>
  {
    policy
      .WithOrigins("http://localhost", "https://localhost")
      .AllowAnyHeader()
      .AllowAnyMethod()
      .AllowCredentials();
  });
});

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

if (app.Environment.IsDevelopment())
  app.UseCors("Development");
else
  app.UseCors("Production");

app.UseExceptionHandler(config =>
{
  config.Run(context => ExceptionMiddleware.HandleExceptionAsync(context));
});

app.UseStaticFiles(new StaticFileOptions
{
  FileProvider = new PhysicalFileProvider(
    Path.Combine(builder.Environment.ContentRootPath, "Data")),
  RequestPath = "/api/Data",
  ServeUnknownFileTypes = true
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

Directories.CreateAll();

app.Run();
