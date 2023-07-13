namespace api.Entities;

public class DialogMessage : IEntity
{
  public Guid Id { get; set; }

  public Guid DialogId { get; set; }

  public Dialog Dialog { get; set; } = null!;

  public Guid SenderUserId { get; set; }

  public string? Text { get; set; }

  public List<DialogMessagePhotoAttachment> Photos { get; set; } = null!;

  public required DateTime CreatedAt { get; set; }

  public required DateTime LastEditedAt { get; set; }
}