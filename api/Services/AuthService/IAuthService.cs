namespace api.Services.Interfaces;

public interface IAuthService
{
  public Task<string> LoginAsync(string login, string password);
  public Task<string> RegisterAsync(string login, string password);
}