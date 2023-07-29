using api.DTOs;
using api.Entities;
using api.Infrastructure.Exceptions;
using api.Repositories;
using api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Implementations;

public class ProfileSearchService : IProfileSearchService
{
  private readonly UnitOfWork _UoW;

  public ProfileSearchService(UnitOfWork uow)
  {
    _UoW = uow;
  }

  public async Task<List<ProfileSearchResponseDTO>> GetProfileSearchResponseDTOByLoginContainsExceptPrincipalProfileAsync(Guid principalId, string login)
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

    List<ProfileSearchResponseDTO> searchDTO = findedUsers
      .Where(user => user.Id != principalId)
      .Select(user => new ProfileSearchResponseDTO()
      {
        Id = user.Id,
        Login = user.Login,
        AvatarUrl = user.Profile.Photos.Find(photo => photo.Id == user.Profile.AvatarPhotoId)?.Url
      })
      .ToList();

    return searchDTO;
  }
}