using api.DbContexts;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class DialogRepository : RepositoryBase<Dialog>
{
  public DialogRepository(DataContext context) : base(context) { }

  public IQueryable<Dialog> GetPrivateByProfileIds(Guid firstUserId, Guid secondUserId)
  {
    return Set
      .Where(dialog => dialog.Type == DialogType.Private)
      .Where(dialog => dialog.Participants.Count() == 2)
      .Where(dialog => dialog.Participants
        .All(participant => participant.ProfileId == firstUserId || participant.ProfileId == secondUserId)
      );
  }

  public async Task<bool> IsPrivateExist(Guid firstUserId, Guid secondUserId)
  {
    return await Set
      .AsNoTracking()
      .Where(dialog => dialog.Type == DialogType.Private)
      .Where(dialog => dialog.Participants.Count() == 2)
      .Where(dialog => dialog.Participants
        .All(participant => participant.ProfileId == firstUserId || participant.ProfileId == secondUserId)
      )
      .FirstOrDefaultAsync() != null;
  }

  public bool IsDialogParticipantsContainsProfileId(Dialog dialog, Guid userId)
  {
    return dialog.Participants.Any(participant => participant.ProfileId == userId);
  }
}