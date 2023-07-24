namespace api.Infrastructure;

public static class Directories
{
  public static string Root { get; } = Environment.CurrentDirectory;

  public static string Data { get => $"{Root}\\Data"; }

  public static string Photos { get => "Photos"; }

  public static void CreateAll()
  {
    Directory.CreateDirectory(Data);
    Directory.CreateDirectory($"{Data}\\{Photos}");
  }
}