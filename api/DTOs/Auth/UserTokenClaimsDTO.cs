namespace api.DTOs;

public class UserTokenClaimsDTO
{
  public required Guid Id { get; set; }

  public required string Login { get; set; }
}