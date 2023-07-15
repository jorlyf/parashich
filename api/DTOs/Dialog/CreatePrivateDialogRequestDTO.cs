namespace api.DTOs;

public class CreatePrivateDialogRequestDTO
{
  // requester user id
  public string FirstUserId { get; set; } = null!;

  public string SecondUserId { get; set; } = null!;
}