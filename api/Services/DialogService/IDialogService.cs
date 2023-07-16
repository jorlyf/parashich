using api.DTOs;

namespace api.Services.Interfaces;

public interface IDialogService
{
  public Task CreatePrivateDialogAsync(Guid requesterUserId, Guid firstUserId, Guid secondUserId);

  public Task CreateGroupDialogAsync(Guid requesterUserId);

  public Task<DialogDTO> GetDialogDTOAsync(Guid requesterUserId, Guid dialogId);

  public Task SendMessageAsync(Guid requesterUserId);
}