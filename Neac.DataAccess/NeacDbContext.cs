﻿using Microsoft.EntityFrameworkCore;
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
        public static readonly string ConnectionString = "Server=DESKTOP-6R5MOTI;Database=QuanLyThietBi;User Id=sa;Password=1Qaz2wsx;";
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
    public class NeacDbContextFactory : IDesignTimeDbContextFactory<NeacDbContext>
    {
        public NeacDbContext CreateDbContext(string[] args)
        {
            var envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var optionsBuilder = new DbContextOptionsBuilder<NeacDbContext>();
            optionsBuilder.UseSqlServer(NeacDbContext.ConnectionString);

            return new NeacDbContext(optionsBuilder.Options);
        }
    }
}
