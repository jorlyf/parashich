using System.ComponentModel.DataAnnotations;

namespace api.Entities;

public class ProfilePost : IEntity
{
  [Key]
  public Guid Id { get; set; }

  [Required]
  public Guid ProfileId { get; set; }

  [Required]
  public Profile Profile { get; set; } = null!;

  public List<ProfilePostPhotoAttachment> Photos { get; set; } = null!;

  [Required]
  public required DateTime CreatedAt { get; set; }

  [Required]
  public required DateTime LastEditedAt { get; set; }
}