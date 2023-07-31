using api.Entities;
using api.Infrastructure;
using api.Infrastructure.Exceptions;
using api.Repositories;
using api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Implementations;

public class ProfileSettingsService : IProfileSettingsService
{
  private readonly UnitOfWork _UoW;
  private readonly IPhotoSavingService _photoSavingService;

  public ProfileSettingsService(UnitOfWork uow, PhotoSavingService photoSavingService)
  {
    _UoW = uow;
    _photoSavingService = photoSavingService;
  }

  public Task DeletePhotoAsync(Guid principalId, Guid photoId)
  {
    throw new NotImplementedException();
  }

  public async Task<string> SetAvatarIdAsync(Guid principalId, Guid photoId)
  {
    Task<Profile?> principalProfileTask = _UoW.ProfileRepository
      .GetById(principalId)
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "Principal is not exist");

    Task<ProfilePhoto?> photoTask = _UoW.ProfileRepository
      .GetById(principalId)
      .Select(profile => profile.Photos.First(photo => photo.Id == photoId))
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "Photo is not exist");

    Profile principalProfile = principalProfileTask.Result!;
    ProfilePhoto photo = photoTask.Result!;

    principalProfile.AvatarPhotoId = photoId;

    _UoW.ProfileRepository.Update(principalProfile);
    await _UoW.SaveAsync();

    return photo.Url;
  }

  public async Task<string> UploadAvatarAsync(Guid principalId, IFormFile file)
  {
    Profile principalProfile = await _UoW.ProfileRepository
      .GetById(principalId)
      .Include(profile => profile.Photos)
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "Principal is not found");

    string avatarUrl = await _photoSavingService.SaveAsync(file);

    ProfilePhoto photo = new()
    {
      Url = avatarUrl,
      CreatedAt = TimeUtils.UTCNow.GetTotalMilliseconds()
    };

    principalProfile.Photos.Add(photo);
    _UoW.ProfileRepository.Update(principalProfile);
    await _UoW.SaveAsync();

    principalProfile.AvatarPhotoId = photo.Id;
    _UoW.ProfileRepository.Update(principalProfile);
    await _UoW.SaveAsync();

    return avatarUrl;
  }

  public async Task SetStatusAsync(Guid principalId, string status)
  {
    Profile principalProfile = await _UoW.ProfileRepository
      .GetById(principalId)
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "Principal is not exist");

    principalProfile.Status = status;

    _UoW.ProfileRepository.Update(principalProfile);
    await _UoW.SaveAsync();
  }
}