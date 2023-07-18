using api.Entities;
using api.Infrastructure;
using api.Infrastructure.Exceptions;
using api.Repositories;
using api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

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
    User user = await _UoW.UserRepository
      .GetByLogin(login)
      .AsNoTracking()
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "Invalid login data");

    string passwordHash = _hashService.GetHash(password);

    if (user.PasswordHash != passwordHash)
    {
      throw new ApiException(400, "Invalid login data");
    }

    string token = _tokenService.Encode(user);
    return token;
  }

  public async Task<string> RegisterAsync(string login, string password)
  {
    if (await _UoW.UserRepository.IsLoginExist(login))
    {
      throw new ApiException(400, "Login already in use");
    }

    string passwordHash = _hashService.GetHash(password);

    User user = new()
    {
      Login = login,
      PasswordHash = passwordHash,
      Profile = new()
      {
        CreatedAt = TimeUtils.UTCNow
      }
    };

    await _UoW.UserRepository.AddAsync(user);

    await _UoW.SaveAsync();

    string token = _tokenService.Encode(user);
    return token;
  }
}