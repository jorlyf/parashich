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

  public async Task<UserDTO> GetUserDTOByIdAsync(Guid principalId, Guid userId)
  {
    Task<Profile?> principalProfileTask = _UoW.ProfileRepository
      .GetById(principalId)
      .AsNoTracking()
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "User is not exist");

    Task<Profile?> findedUserTask = _UoW.ProfileRepository
      .GetById(userId)
      .AsNoTracking()
      .Include(profile => profile.User)
      .Include(profile => profile.Photos)
      .FirstOrDefaultAsync()
      ?? throw new ApiException(404, "User not found");

    Task.WaitAll(principalProfileTask, findedUserTask);
    Profile findedProfile = findedUserTask.Result!;

    UserDTO userDTO = new()
    {
      Id = findedProfile.Id,
      Login = findedProfile.User.Login,
      Profile = new()
      {
        Id = findedProfile.Id,
        AvatarUrl = findedProfile.Photos.Find(photo => photo.Id == findedProfile.AvatarPhotoId)?.Url,
        Status = findedProfile.Status
      }
    };

    return userDTO;
  }

  public async Task<List<UserDTO>> GetUserDTOByLoginContainsExceptPrincipalUserAsync(Guid principalId, string login)
  {
    Task<Profile?> principalProfileTask = _UoW.ProfileRepository
      .GetById(principalId)
      .AsNoTracking()
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "User is not exist");

    Task<List<User>> findedUsersTask = _UoW.UserRepository
      .GetByLoginContains(login, Infrastructure.StringComparisonType.CaseUnsensetive)
      .AsNoTracking()
      .Include(user => user.Profile)
        .ThenInclude(profile => profile.Photos)
      .ToListAsync();

    Task.WaitAll(principalProfileTask, findedUsersTask);
    List<User> findedUsers = findedUsersTask.Result!;

    List<UserDTO> userDTOs = findedUsers
      .Where(user => user.Id != principalId)
      .Select(user => new UserDTO()
      {
        Id = user.Id,
        Login = user.Login,
        Profile = new()
        {
          Id = user.Profile.Id,
          AvatarUrl = user.Profile.Photos.Find(photo => photo.Id == user.Profile.AvatarPhotoId)?.Url,
          Status = user.Profile.Status
        }
      })
      .ToList();

    return userDTOs;
  }
}