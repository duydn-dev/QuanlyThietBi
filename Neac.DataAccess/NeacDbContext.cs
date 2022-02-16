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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
