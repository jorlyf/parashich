using api.Entities;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace api.DbContexts;

public class DataContext : DbContext
{
  public DbSet<User> Users { get; set; } = null!;
  public DbSet<Profile> Profiles { get; set; } = null!;
  public DbSet<Dialog> Dialogs { get; set; } = null!;
  public DbSet<DialogMessage> DialogMessages { get; set; } = null!;
  public DbSet<DialogMessagePhotoAttachment> DialogMessagesPhotoAttachments { get; set; }
  public DbSet<DialogParticipant> DialogParticipants { get; set; }

  public DataContext(DbContextOptions<DataContext> options) : base(options)
  {
    Database.EnsureCreated();
    Batteries.Init();
  }
}