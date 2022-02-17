using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Neac.DataAccess
{
    public class NeacDbContext : DbContext
    {
        public NeacDbContext(DbContextOptions<NeacDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<UserPosition> UserPositions { get; set; }
        public DbSet<GroupRole> GroupRoles { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Config> Configs { get; set; }
        public DbSet<GroupRoleUserPosition> GroupRoleUserPositions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Config>()
            .Property(p => p.IsSystem)
            .HasDefaultValueSql("0");
        }
    }
    public class NeacDbContextFactory : IDesignTimeDbContextFactory<NeacDbContext>
    {
        public NeacDbContext CreateDbContext(string[] args)
        {
            var envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var optionsBuilder = new DbContextOptionsBuilder<NeacDbContext>();
            optionsBuilder.UseSqlServer("Server=123.25.26.130,26887;Database=DTI;User Id=duydn;Password=o2tech@#;");

            return new NeacDbContext(optionsBuilder.Options);
        }
    }
}
