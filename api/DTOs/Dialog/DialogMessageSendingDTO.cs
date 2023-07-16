namespace api.DTOs;

public class DialogMessageSendingDTO
{
  public string DialogId { get; set; } = null!;

  public string? Text { get; set; }

  public List<DialogMessagePhotoAttachmentSendingDTO> Photos { get; set; } = null!;
}