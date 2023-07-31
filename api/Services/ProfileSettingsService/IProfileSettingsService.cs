namespace api.Services.Interfaces;

public interface IProfileSettingsService
{
  public Task<string> UploadAvatarAsync(Guid principalId, IFormFile file);
  public Task DeletePhotoAsync(Guid principalId, Guid photoId);
  public Task<string> SetAvatarIdAsync(Guid principalId, Guid photoId);
  public Task SetStatusAsync(Guid principalId, string status);
}