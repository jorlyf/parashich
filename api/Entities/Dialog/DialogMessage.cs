using System.ComponentModel.DataAnnotations;

namespace api.Entities;

public class DialogMessage : IEntity
{
  [Key]
  public Guid Id { get; set; }

  [Required]
  public Guid DialogId { get; set; }

  [Required]
  public Dialog Dialog { get; set; } = null!;

  [Required]
  public required Guid SenderUserId { get; set; }

  public string? Text { get; set; }

  public List<DialogMessagePhotoAttachment> Photos { get; set; } = null!;

  [Required]
  public required long CreatedAt { get; set; }

  [Required]
  public required long LastEditedAt { get; set; }
}