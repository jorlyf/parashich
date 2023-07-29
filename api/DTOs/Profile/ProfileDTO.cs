namespace api.DTOs;

public class ProfileDTO
{
  public required Guid Id { get; set; }

  public required string Login { get; set; }

  public string? AvatarUrl { get; set; }

  public string? Status { get; set; }
}