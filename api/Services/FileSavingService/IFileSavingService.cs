namespace api.Services.Interfaces;

public interface IFileSavingService
{
  /// <returns>file name of a created file</returns>
  public Task<string> SaveAsync(IFormFile formFile, string directory);
  public Task DeleteAsync(string path);
}