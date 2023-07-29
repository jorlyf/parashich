namespace api.Services.Interfaces;

public interface IProfileSettingsService
{
  public Task<string> UploadAvatarAsync(Guid principalId, IFormFile file);
}