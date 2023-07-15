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

  public async Task CreatePrivateDialogAsync(Guid requesterUserId, Guid firstUserId, Guid secondUserId)
  {
    if (requesterUserId != firstUserId)
      throw new ApiException(403, "Access denied. Requester user id is not first user id");

    Task<User?> firstUserTask = _UoW.UserRepository
      .GetById(firstUserId)
      .AsNoTracking()
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "User is not exist");

    Task<User?> secondUserTask = _UoW.UserRepository
    .GetById(secondUserId)
    .AsNoTracking()
    .FirstOrDefaultAsync()
    ?? throw new ApiException(400, "User is not exist");

    Task.WaitAll(firstUserTask, secondUserTask);
    User firstUser = firstUserTask.Result!;
    User secondUser = secondUserTask.Result!;

    if (await _UoW.DialogRepository.IsPrivateExist(firstUser.Id, secondUser.Id))
      throw new ApiException(400, "Private dialog already exists. It is impossible to create a duplicate");

    Dialog dialog = new()
    {
      Type = DialogType.Private,
    };
    await _UoW.DialogRepository.AddAsync(dialog);

    List<DialogParticipant> participants = new() {
      new() { DialogId = dialog.Id, UserId = firstUser.Id },
      new() { DialogId = dialog.Id, UserId = secondUser.Id }
    };

    // await _UoW.D

    dialog.Participants = participants;

    await _UoW.SaveAsync();
  }

  public async Task<DialogDTO> GetDialogDTOAsync(Guid requesterUserId, Guid dialogId)
  {
    Task<User?> userTask = _UoW.UserRepository
      .GetById(requesterUserId)
      .AsNoTracking()
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "User is not exist");

    Task<Dialog?> dialogTask = _UoW.DialogRepository
      .GetById(dialogId)
      .AsNoTracking()
      .Include(dialog => dialog.Participants)
      .FirstOrDefaultAsync()
      ?? throw new ApiException(400, "Dialog is not exist");

    Task.WaitAll(userTask, dialogTask);
    User user = userTask.Result!;
    Dialog dialog = dialogTask.Result!;

    if (!_UoW.DialogRepository.IsDialogParticipantsContainsUserId(dialog, user.Id))
      throw new ApiException(404, "Not found");

    DialogDTO dialogDTO = new()
    {
      Id = dialog.Id,
      UserIds = dialog.Participants.Select(x => x.Id).ToList()
    };

    return dialogDTO;
  }
}