namespace api.DTOs;

public class ProfileSearchResponseDTO
{
  public required Guid Id { get; set; }

  public required string Login { get; set; }

  public string? AvatarUrl { get; set; }
}