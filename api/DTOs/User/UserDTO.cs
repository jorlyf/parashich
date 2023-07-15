namespace api.DTOs;

public class UserDTO
{
  public required Guid Id { get; set; }

  public required string Login { get; set; }

  public required ProfileDTO Profile { get; set; }
}