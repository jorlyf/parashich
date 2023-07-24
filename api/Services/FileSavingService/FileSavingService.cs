using api.Infrastructure;
using api.Services.Interfaces;

namespace api.Services.Implementations;

public class FileSavingService : IFileSavingService
{
  public async Task<string> SaveAsync(IFormFile formFile, string directory)
  {
    string fileName = GenerateHash();
    string path = $"{Directories.Data}\\{directory}\\{fileName}";

    using (Stream sw = new FileStream(path, FileMode.CreateNew))
    {
      await formFile.CopyToAsync(sw);
    }

    return fileName;
  }

  public Task DeleteAsync(string path)
  {
    return Task.Run(() => File.Delete(path));
  }

  private static string GenerateHash()
  {
    return Guid.NewGuid().ToString();
  }
}