using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Entities;
using api.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace api.Services.Implementations;

public class TokenService : ITokenService
{
  private readonly IConfiguration _configuration;
  public TokenService(IConfiguration configuration)
  {
    _configuration = configuration;
  }

  public string Encode(User user)
  {
    Claim[] claims = new[]
      {
        new Claim("id", user.Id.ToString()),
        new Claim("login", user.Login)
      };

    string? jwtKey = _configuration["Jwt:Key"]
    ?? throw new Exception("Jwt:Key is not defined in a config");
    
    SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(jwtKey));
    SigningCredentials signIn = new(key, SecurityAlgorithms.HmacSha512);
    JwtSecurityToken token = new(
      claims: claims,
      expires: DateTime.UtcNow.AddDays(30),
      signingCredentials: signIn
      );

    return new JwtSecurityTokenHandler().WriteToken(token);
  }

  // public UserTokenClaims Decode(string token);
}