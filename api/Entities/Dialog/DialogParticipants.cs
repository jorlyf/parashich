namespace api.Entities;

public class DialogParticipant : IEntity
{
  public Guid Id { get; set; }

  public Guid DialogId { get; set; }

  public Dialog Dialog { get; set; } = null!;

  public Guid UserId { get; set; }

  public User User { get; set; } = null!;
}