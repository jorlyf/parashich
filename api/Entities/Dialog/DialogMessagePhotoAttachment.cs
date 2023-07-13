namespace api.Entities;

public class DialogMessagePhotoAttachment : IEntity
{
  public Guid Id { get; set; }

  public Guid MessageId { get; set; }

  public DialogMessage Message { get; set; } = null!;

  public required string Url { get; set; }
}