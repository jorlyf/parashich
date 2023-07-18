using System.ComponentModel.DataAnnotations;

namespace api.Entities;

public class DialogMessagePhotoAttachment : IEntity
{
  [Key]
  public Guid Id { get; set; }

  [Required]
  public Guid MessageId { get; set; }

  [Required]
  public DialogMessage Message { get; set; } = null!;

  [Required]
  public required string Url { get; set; }
}