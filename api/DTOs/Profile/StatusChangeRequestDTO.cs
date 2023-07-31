using System.ComponentModel.DataAnnotations;

namespace api.DTOs;

public class StatusChangeRequestDTO
{
  [Required]
  [StringLength(16)]
  public string Status { get; set; } = null!;
}