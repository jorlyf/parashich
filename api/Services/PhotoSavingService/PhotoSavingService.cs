using api.Infrastructure;
using api.Infrastructure.Exceptions;
using api.Services.Interfaces;

namespace api.Services.Implementations;

public class PhotoSavingService : IPhotoSavingService
{
  private readonly IFileSavingService _fileSavingService;

  public PhotoSavingService(FileSavingService fileSavingService)
  {
    _fileSavingService = fileSavingService;
  }

  public async Task<string> SaveAsync(IFormFile formFile)
  {
    FileType type = FileUtils.AnalyzeExtension(formFile.FileName);
    if (type != FileType.Photo) throw new ApiException(400, "File type is not valid");

    string fileName = await _fileSavingService.SaveAsync(formFile, Directories.Photos);
    string filePath = $"{Directories.Photos}\\{fileName}";
    
    return filePath;
  }

  public Task DeleteAsync(string path)
  {
    return _fileSavingService.DeleteAsync(path);
  }
}