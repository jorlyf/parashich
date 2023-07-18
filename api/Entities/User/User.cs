using System.ComponentModel.DataAnnotations;

namespace api.Entities;

public class User : IEntity
{
  [Key]
  public Guid Id { get; set; }

  [Required]
  public required string Login { get; set; }

  [Required]
  public required string PasswordHash { get; set; }

  [Required]
  public required Profile Profile { get; set; } = null!;
}