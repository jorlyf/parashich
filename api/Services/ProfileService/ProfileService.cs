using api.DTOs;
using api.Entities;
using api.Infrastructure.Exceptions;
using api.Repositories;
using api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Implementations;

public class ProfileService : IProfileService
{
  private readonly UnitOfWork _UoW;
  private readonly IPhotoSavingService _photoSavingService;

  public ProfileService(UnitOfWork uow, PhotoSavingService photoSavingService)
  {
    _UoW = uow;
    _photoSavingService = photoSavingService;
  }

  public async Task<ProfileDTO> GetProfileByUserLoginAsync(Guid principalId, string login)
  {
    Task<Profile?> principalProfileTask = _UoW.ProfileRepository
      .GetById(principalId)
      .Include(profile => profile.Photos)
      .AsNoTracking()
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "User is not exist");

    Task<User?> userTask = _UoW.UserRepository
      .GetByLogin(login)
      .Include(user => user.Profile)
        .ThenInclude(profile => profile.Photos)
      .AsNoTracking()
      .FirstOrDefaultAsync()
      ?? throw new ApiException(404, "Profile is not exist");

    Task.WaitAll(principalProfileTask, userTask);
    User user = userTask.Result!;

    ProfileDTO profileDTO = new()
    {
      Id = user.Id,
      AvatarUrl = user.Profile.Photos.Find(photo => photo.Id == user.Profile.AvatarPhotoId)?.Url,
      Status = user.Profile.Status
    };

    return profileDTO;
  }

  public async Task<ProfilePhoto> AddPhotoAsync(Guid principalId, IFormFile formFile)
  {
    Profile profile = await _UoW.ProfileRepository
     .GetById(principalId)
     .Include(profile => profile.Photos)
     .AsNoTracking()
     .FirstOrDefaultAsync()
     ?? throw new ApiException(400, "User is not exist");

    string path = await _photoSavingService.SaveAsync(formFile);

    ProfilePhoto photo = new()
    {
      Url = path
    };

    profile.Photos.Add(photo);

    _UoW.ProfileRepository.Update(profile);

    await _UoW.SaveAsync();

    return photo;
  }

  public Task DeletePhotoAsync(Guid principalId, Guid photoId)
  {
    throw new NotImplementedException();
  }

  public Task SetAvatarAsync(Guid principalId, Guid photoId)
  {
    throw new NotImplementedException();
  }
}