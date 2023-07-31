namespace api.DTOs;

public class ProfilePhotoDTO
{
  public required Guid Id { get; set; }

  public required Guid ProfileId { get; set; }

  public required string Url { get; set; }

  public required long CreatedAt { get; set; }
}