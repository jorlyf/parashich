using api.DbContexts;
using api.Entities;
using api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class UserRepository : RepositoryBase<User>
{
  public UserRepository(DataContext context) : base(context) { }

  public IQueryable<User> GetByLogin(
    string login,
    StringComparisonType type = StringComparisonType.CaseSensetive
    )
  {
    if (type == StringComparisonType.CaseSensetive)
      return Set.Where(user => user.Login == login);
    else
      return Set.Where(user => user.Login.ToLower() == login.ToLower());
  }

  public IQueryable<User> GetByLoginContains(
    string login,
    StringComparisonType type = StringComparisonType.CaseSensetive
    )
  {
    if (type == StringComparisonType.CaseSensetive)
      return Set.Where(user => user.Login.Contains(login));
    else
      return Set.Where(user => user.Login.ToLower().Contains(login.ToLower()));
  }

  public Task<bool> IsLoginExist(
    string login,
    StringComparisonType type = StringComparisonType.CaseSensetive
    )
  {
    if (type == StringComparisonType.CaseSensetive)
      return Set.AnyAsync(user => user.Login == login);
    else
      return Set.AnyAsync(user => user.Login.ToLower() == login.ToLower());
  }
}