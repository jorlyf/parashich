using api.DTOs;

namespace api.Services.Interfaces;

public interface IDialogService
{
  public Task CreatePrivateDialogAsync(Guid principalId, Guid firstUserId, Guid secondUserId);

  public Task CreateGroupDialogAsync(Guid principalId);

  public Task<DialogDTO> GetDialogDTOAsync(Guid principalId, Guid dialogId);

  public Task SendMessageAsync(Guid principalId);
}