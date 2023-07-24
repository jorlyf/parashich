using api.DbContexts;
using api.Entities;

namespace api.Repositories;

public class ProfileRepository : RepositoryBase<Profile>
{
  public ProfileRepository(DataContext context) : base(context) { }

  public IQueryable<Profile> GetByUserId(Guid userId)
  {
    return Set.Where(profile => profile.UserId == userId);
  }
}