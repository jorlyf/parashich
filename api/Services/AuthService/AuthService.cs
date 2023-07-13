using api.Entities;
using api.Repositories;
using api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Implementations;

public class AuthService : IAuthService
{
  private readonly UnitOfWork _UoW;
  private readonly ITokenService _tokenService;
  private readonly IHashService _hashService;

  public AuthService(UnitOfWork uow, TokenService tokenService, HashService hashService)
  {
    _UoW = uow;
    _tokenService = tokenService;
    _hashService = hashService;
  }

  public async Task<string> LoginAsync(string login, string password)
  {
    User? user = await _UoW.UserRepository
      .GetByLogin(login)
      .FirstOrDefaultAsync();

    if (user == null)
    {
      throw new Exception("invalid login data");
    }

    string passwordHash = _hashService.GetHash(password);

    if (user.PasswordHash != passwordHash)
    {
      throw new Exception("invalid login data");
    }

    string token = _tokenService.Encode(user);
    return token;
  }

  public async Task<string> RegisterAsync(string login, string password)
  {
    if (await (_UoW.UserRepository.IsLoginExist(login)))
    {
      throw new Exception("login exist");
    }

    string passwordHash = _hashService.GetHash(password);

    User user = new()
    {
      Login = login,
      PasswordHash = passwordHash
    };

    await _UoW.UserRepository.AddAsync(user);

    Profile profile = new()
    {
      User = user,
      Status = null,
      AvatarUrl = null
    };

    await _UoW.ProfileRepository.AddAsync(profile);

    await _UoW.SaveAsync();

    string token = _tokenService.Encode(user);
    return token;
  }
}