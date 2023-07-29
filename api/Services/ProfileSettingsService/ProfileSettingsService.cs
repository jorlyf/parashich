using api.Entities;
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
      Url = avatarUrl
    };

    principalProfile.Photos.Add(photo);
    _UoW.ProfileRepository.Update(principalProfile);
    await _UoW.SaveAsync();

    principalProfile.AvatarPhotoId = photo.Id;
    _UoW.ProfileRepository.Update(principalProfile);
    await _UoW.SaveAsync();

    return avatarUrl;
  }
}