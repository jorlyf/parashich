using api.DTOs;
using api.Entities;
using api.Infrastructure.Exceptions;
using api.Repositories;
using api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Implementations;

public class DialogService : IDialogService
{
  private readonly UnitOfWork _UoW;

  public DialogService(UnitOfWork uow)
  {
    _UoW = uow;
  }

  public Task CreateGroupDialogAsync(Guid principalId)
  {
    throw new NotImplementedException();
  }

  public async Task CreatePrivateDialogAsync(Guid principalId, Guid firstUserId, Guid secondUserId)
  {
    if (principalId != firstUserId)
      throw new ApiException(403, "Access denied");

    Task<Profile?> firstProfileTask = _UoW.ProfileRepository
      .GetById(firstUserId)
      .AsNoTracking()
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "User is not exist");

    Task<Profile?> secondProfileTask = _UoW.ProfileRepository
    .GetById(secondUserId)
    .AsNoTracking()
    .FirstOrDefaultAsync()
    ?? throw new ApiException(400, "User is not exist");

    Task.WaitAll(firstProfileTask, secondProfileTask);
    Profile firstProfile = firstProfileTask.Result!;
    Profile secondProfile = secondProfileTask.Result!;

    if (await _UoW.DialogRepository.IsPrivateExist(firstProfile.Id, secondProfile.Id))
      throw new ApiException(400, "Private dialog already exists. It is impossible to create a duplicate");

    Dialog dialog = new()
    {
      Type = DialogType.Private,
    };
    await _UoW.DialogRepository.AddAsync(dialog);

    List<DialogParticipant> participants = new() {
      new() { DialogId = dialog.Id, ProfileId = firstProfile.Id },
      new() { DialogId = dialog.Id, ProfileId = secondProfile.Id }
    };

    // await _UoW.D

    dialog.Participants = participants;

    await _UoW.SaveAsync();
  }

  public async Task<DialogDTO> GetDialogDTOAsync(Guid principalId, Guid dialogId)
  {
    Task<Profile?> profileTask = _UoW.ProfileRepository
      .GetById(principalId)
      .AsNoTracking()
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "User is not exist");

    Task<Dialog?> dialogTask = _UoW.DialogRepository
      .GetById(dialogId)
      .AsNoTracking()
      .Include(dialog => dialog.Participants)
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "Dialog is not exist");

    Task.WaitAll(profileTask, dialogTask);
    Profile user = profileTask.Result!;
    Dialog dialog = dialogTask.Result!;

    if (!_UoW.DialogRepository.IsDialogParticipantsContainsProfileId(dialog, user.Id))
      throw new ApiException(404, "Not found");

    DialogDTO dialogDTO = new()
    {
      Id = dialog.Id,
      UserIds = dialog.Participants.Select(x => x.Id).ToList()
    };

    return dialogDTO;
  }

  public Task SendMessageAsync(Guid principalId)
  {
    throw new NotImplementedException();
  }
}