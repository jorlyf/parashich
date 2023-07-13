namespace api.Entities;

public class DialogParticipants : IEntity
{
  public Guid Id { get; set; }

  public Guid DialogId { get; set; }

  public Guid UserId { get; set; }
}