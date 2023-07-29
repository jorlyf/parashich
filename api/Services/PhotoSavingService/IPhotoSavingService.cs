namespace api.Services.Interfaces;

public interface IPhotoSavingService
{
  public Task<string> SaveAsync(IFormFile formFile);
  public Task DeleteAsync(string path);
}