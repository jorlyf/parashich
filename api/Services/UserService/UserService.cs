using api.DTOs;
using api.Entities;
using api.Infrastructure.Exceptions;
using api.Repositories;
using api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Implementations;

public class UserService : IUserService
{
  private readonly UnitOfWork _UoW;

  public UserService(UnitOfWork uow)
  {
    _UoW = uow;
  }

  public async Task<UserDTO> GetUserDTOByIdAsync(Guid requesterUserId, Guid userId)
  {
    Task<User?> requesterUserTask = _UoW.UserRepository
      .GetById(requesterUserId)
      .AsNoTracking()
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "User is not exist");

    Task<User?> findedUserTask = _UoW.UserRepository
      .GetById(userId)
      .AsNoTracking()
      .Include(user => user.Profile)
      .FirstOrDefaultAsync()
      ?? throw new ApiException(404, "User not found");

    Task.WaitAll(requesterUserTask, findedUserTask);
    User findedUser = findedUserTask.Result!;

    UserDTO userDTO = new()
    {
      Id = findedUser.Id,
      Login = findedUser.Login,
      Profile = new()
      {
        UserId = findedUser.Id,
        AvatarUrl = findedUser.Profile!.AvatarUrl,
        Status = findedUser.Profile!.Status
      }
    };

    return userDTO;
  }

  public async Task<List<UserDTO>> GetUserDTOByLoginContainsAsync(Guid requesterUserId, string login)
  {
    Task<User?> requesterUserTask = _UoW.UserRepository
      .GetById(requesterUserId)
      .AsNoTracking()
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "User is not exist");

    Task<List<User>> findedUsersTask = _UoW.UserRepository
      .GetByLoginContains(login, Infrastructure.StringComparisonType.CaseUnsensetive)
      .AsNoTracking()
      .Include(user => user.Profile)
      .ToListAsync();

    Task.WaitAll(requesterUserTask, findedUsersTask);
    List<User> findedUsers = findedUsersTask.Result!;

    List<UserDTO> userDTOs = findedUsers
      .Where(user => user.Id != requesterUserId)
      .Select(user => new UserDTO()
      {
        Id = user.Id,
        Login = user.Login,
        Profile = new()
        {
          UserId = user.Id,
          AvatarUrl = user.Profile!.AvatarUrl,
          Status = user.Profile!.Status
        }
      })
      .ToList();

    return userDTOs;
  }
}