using System.ComponentModel.DataAnnotations;

namespace api.Entities;

public class User : IEntity
{
  [Key]
  public Guid Id { get; set; }

  public required string Login { get; set; }

  public required string PasswordHash { get; set; }

  public Profile? Profile { get; set; }
}