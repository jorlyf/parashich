using System.ComponentModel.DataAnnotations;

namespace api.Entities;

public class Profile : IEntity
{
  [Key]
  public Guid Id { get; set; }

  public Guid UserId { get; set; }

  public User User { get; set; } = null!;

  public string? AvatarUrl { get; set; }

  public string? Status { get; set; }
}