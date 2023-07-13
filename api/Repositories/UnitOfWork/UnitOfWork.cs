using api.DbContexts;

namespace api.Repositories;

public class UnitOfWork : IDisposable
{
  private readonly DataContext _context;

  public UserRepository UserRepository { get; }
  public ProfileRepository ProfileRepository { get; }

  public UnitOfWork(DataContext context)
  {
    _context = context;

    UserRepository = new UserRepository(_context);
    ProfileRepository = new ProfileRepository(_context);
  }

  public Task<int> SaveAsync()
  {
    return _context.SaveChangesAsync();
  }

  public void Dispose()
  {
    _context.Dispose();
    GC.SuppressFinalize(this);
  }
}