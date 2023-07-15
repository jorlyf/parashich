namespace api.DTOs;

public class ProfileDTO
{
  public required Guid UserId { get; set; }

  public string? AvatarUrl { get; set; }

  public string? Status { get; set; }
}