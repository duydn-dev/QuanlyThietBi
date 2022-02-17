﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Neac.BusinessLogic.BaseRepository;
using Neac.BusinessLogic.Config;
using Neac.BusinessLogic.Contracts;
using Neac.BusinessLogic.Repository;
using Neac.BusinessLogic.UnitOfWork;
using Neac.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Neac.Api.Installer
{
    public static class InstallerService
    {
        [Obsolete]
        public static void Installer(this IServiceCollection services, IConfiguration Configuration)
        {
            // add dbcontext
            services.AddHttpContextAccessor();
            services.AddDbContext<NeacDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("NeacDbContext")));
            //add cache service
            services.AddMemoryCache();

            //add authen
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            // Adding Jwt Bearer  
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                };
            });

            // add base service
            services.AddTransient<Func<NeacDbContext>>((provider) => () => provider.GetService<NeacDbContext>());
            services.AddAutoMapper(typeof(AutoMapperConfig).Assembly);
            services.AddSingleton<ILogRepository, LogRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient(typeof(IStoreProcedureRepository<>), typeof(StoreProcedureRepository<>));
            // add user-defined service

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<IPositionRepository, PositionRepository>();
            services.AddTransient<IDepartmentRepository, DepartmentRepository>();
        }
    }
}
