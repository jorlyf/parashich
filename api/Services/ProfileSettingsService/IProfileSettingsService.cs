namespace api.Services.Interfaces;

public interface IProfileSettingsService
{
  public Task ChangeAvatarAsync(Guid userId);
}