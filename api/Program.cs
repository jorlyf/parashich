using System.Text;
using api.DbContexts;
using api.Infrastructure.Exceptions;
using api.Repositories;
using api.Services.Implementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
  string? jwtKey = builder.Configuration["Jwt:Key"] ??
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
});

#region Custom services
builder.Services.AddSingleton<TokenService>();

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<HashService>();
builder.Services.AddScoped<TokenService>();

builder.Services.AddScoped<UnitOfWork>();
#endregion

builder.Services.AddCors(options =>
{
  options.AddPolicy("Development", policy =>
  {
    policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
      .AllowAnyHeader()
      .AllowAnyMethod()
      .AllowCredentials();
  });
  options.AddPolicy("Production", policy =>
  {
    policy.WithOrigins("http://localhost", "https://localhost")
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
  config.Run(context =>
  {
    return ExceptionMiddleware.HandleExceptionAsync(context);
  });
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
