using api.Entities;

namespace api.Services.Interfaces;

public interface IProfileService
{
  public Task<ProfilePhoto> AddPhotoAsync(Guid userId, IFormFile formFile);
  public Task DeletePhotoAsync(Guid userId, Guid photoId);
  public Task SetAvatarAsync(Guid userId, Guid photoId);
}