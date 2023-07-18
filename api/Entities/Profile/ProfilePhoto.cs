using System.ComponentModel.DataAnnotations;

namespace api.Entities;

public class ProfilePhoto : IEntity
{
  [Key]
  public Guid Id { get; set; }

  [Required]
  public Guid ProfileId { get; set; }

  [Required]
  public Profile Profile { get; set; } = null!;

  [Required]
  public required string Url { get; set; } = null!;
}