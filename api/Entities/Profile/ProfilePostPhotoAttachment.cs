using System.ComponentModel.DataAnnotations;

namespace api.Entities;

public class ProfilePostPhotoAttachment : IEntity
{
  [Key]
  public Guid Id { get; set; }

  [Required]
  public Guid PostId { get; set; }

  [Required]
  public ProfilePost Post { get; set; } = null!;

  [Required]
  public required string Url { get; set; }
}