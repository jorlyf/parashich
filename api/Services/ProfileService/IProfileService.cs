using api.DTOs;
using api.Entities;

namespace api.Services.Interfaces;

public interface IProfileService
{
  public Task<ProfileDTO> GetProfileByUserLoginAsync(Guid principalId, string login);
  public Task<ProfilePhoto> AddPhotoAsync(Guid principalId, IFormFile formFile);
  public Task DeletePhotoAsync(Guid principalId, Guid photoId);
  public Task SetAvatarAsync(Guid principalId, Guid photoId);
}