namespace api.Entities;

public class PostPhotoAttachment : IEntity
{
  public Guid Id { get; set; }

  public Guid PostId { get; set; }

  public Post Post { get; set; } = null!;

  public required string Url { get; set; }
}