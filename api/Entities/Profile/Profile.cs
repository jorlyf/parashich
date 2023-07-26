using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities;

public class Profile : IEntity
{
  [Key]
  [ForeignKey(nameof(User))]
  public Guid Id { get; set; }

  [Required]
  public User User { get; set; } = null!;

  public Guid? AvatarPhotoId { get; set; }

  [StringLength(128)]
  public string? Status { get; set; }

  public List<ProfilePost> Posts { get; set; } = null!;

  public List<ProfilePhoto> Photos { get; set; } = null!;

  [Required]
  public required DateTime CreatedAt { get; set; }
}