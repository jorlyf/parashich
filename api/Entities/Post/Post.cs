namespace api.Entities;

public class Post : IEntity
{
  public Guid Id { get; set; }

  public Guid ProfileId { get; set; }

  public Profile Profile { get; set; } = null!;

  public List<PostPhotoAttachment> Photos { get; set; } = null!;

  public required DateTime CreatedAt { get; set; }

  public required DateTime LastEditedAt { get; set; }
}