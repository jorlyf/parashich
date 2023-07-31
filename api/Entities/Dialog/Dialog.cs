using System.ComponentModel.DataAnnotations;

namespace api.Entities;

public class Dialog : IEntity
{
  [Key]
  public Guid Id { get; set; }

  [Required]
  public required DialogType Type { get; set; }

  public List<DialogMessage> Messages { get; set; } = null!;

  public List<DialogParticipant> Participants { get; set; } = null!;

  [Required]
  public long CreatedAt { get; set; }
}