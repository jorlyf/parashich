using api.Entities;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace api.DbContexts;

public class DataContext : DbContext
	{
		public DbSet<User> Users { get; set; } = null!;
		public DbSet<Profile> Profiles { get; set; } = null!;

		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{
			Database.EnsureCreated();
			Batteries.Init();
		}
	}