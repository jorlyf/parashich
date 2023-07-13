namespace api.Entities;

public class Dialog : IEntity
{
  public Guid Id { get; set; }

  public required DialogType Type { get; set; }

  public List<DialogMessage> Messages { get; set; } = null!;
}