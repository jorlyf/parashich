namespace api.DTOs;

public class CreatePrivateDialogRequestDTO
{
  // principal user id
  public string FirstUserId { get; set; } = null!;

  public string SecondUserId { get; set; } = null!;
}