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

  public async Task<ProfilePhoto> AddPhotoAsync(Guid userId, IFormFile formFile)
  {
    Profile profile = await _UoW.ProfileRepository
     .GetByUserId(userId)
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

  public Task DeletePhotoAsync(Guid userId, Guid photoId)
  {
    throw new NotImplementedException();
  }

  public Task SetAvatarAsync(Guid userId, Guid photoId)
  {
    throw new NotImplementedException();
  }
}