using api.Entities;
using api.Infrastructure.Exceptions;
using api.Repositories;
using api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Implementations;

public class UserSettingsService : IUserSettingsService
{
  private readonly UnitOfWork _UoW;
  private readonly IHashService _hashService;

  public UserSettingsService(UnitOfWork uow, HashService hashService)
  {
    _UoW = uow;
    _hashService = hashService;
  }

  public async Task ChangePasswordAsync(Guid userId, string password)
  {
    User user = await _UoW.UserRepository
      .GetById(userId)
      .FirstOrDefaultAsync()
      ?? throw new ApiException(404, "User is not exist");

    if (!IsPasswordValid(password)) throw new ApiException(400, "Bad password");

    string passwordHash = _hashService.GetHash(password);
    user.PasswordHash = passwordHash;

    _UoW.UserRepository.Update(user);
    
    await _UoW.SaveAsync();
  }

  private static bool IsPasswordValid(string password)
  {
    if (password.Length < 5) return false;

    return true;
  }
}