namespace api.Services.Interfaces;

public interface IUserSettingsService
{
  public Task ChangePasswordAsync(Guid userId, string password);
}