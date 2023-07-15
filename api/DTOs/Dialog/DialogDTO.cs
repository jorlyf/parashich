namespace api.DTOs;

public class DialogDTO
{
  public required Guid Id { get; set; }

  public required List<Guid> UserIds { get; set; }
}