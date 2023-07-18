using System.ComponentModel.DataAnnotations;

namespace api.Entities;

public class DialogParticipant : IEntity
{
  [Key]
  public Guid Id { get; set; }

  [Required]
  public Guid DialogId { get; set; }

  [Required]
  public Dialog Dialog { get; set; } = null!;

  [Required]
  public Guid UserId { get; set; }

  [Required]
  public User User { get; set; } = null!;
}