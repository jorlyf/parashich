using api.Entities;

namespace api.Services.Interfaces;

public interface ITokenService
{
  public string Encode(User user);

  // public UserTokenClaims Decode(string token);
}