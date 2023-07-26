using api.DTOs;

namespace api.Services.Interfaces;

public interface IDialogService
{
  public Task CreatePrivateDialogAsync(Guid principalUserId, Guid firstUserId, Guid secondUserId);

  public Task CreateGroupDialogAsync(Guid principalUserId);

  public Task<DialogDTO> GetDialogDTOAsync(Guid principalUserId, Guid dialogId);

  public Task SendMessageAsync(Guid principalUserId);
}