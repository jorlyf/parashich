namespace api.Infrastructure;


public enum FileType
{
  Photo,
  Undefined
}

public static class FileUtils
{
  public static FileType AnalyzeExtension(string fileName)
  {
    string? extension = Path.GetExtension(fileName);
    if (extension == null) { return FileType.Undefined; }

    return extension switch
    {
      ".png" or ".jpg" or ".jpeg" => FileType.Photo,
      _ => FileType.Undefined,
    };
  }
}