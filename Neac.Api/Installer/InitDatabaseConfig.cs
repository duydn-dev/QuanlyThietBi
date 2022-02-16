using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using Neac.Api.Attributes;
using Neac.Api.Controllers;
using Neac.BusinessLogic.Contracts;
using Neac.Common;
using Neac.Common.Const;
using Neac.Common.Dtos.PositionDtos;
using Neac.DataAccess;
using System;
using System.Linq;
using System.Reflection;

namespace Neac.Api.Installer
{
    public static class InitDatabaseConfig
    {
        public static async void CreateConfig(this IApplicationBuilder app)
        {
            
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<NeacDbContext>();
                if (!(context.Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator).Exists())
                {
                    context.Database.Migrate();

                    var positionRepository = serviceScope.ServiceProvider.GetRequiredService<IPositionRepository>();
                    var roleRepository = serviceScope.ServiceProvider.GetRequiredService<IRoleRepository>();

                    var adminPosition = await positionRepository.CreateAsync(new PositonGetDropdownViewDto
                    {
                        UserPositionName = "Quản trị viên",
                        IsAdministrator = true,
                        CreatedDate = DateTime.Now,
                        Status = PositionState.Active,
                    });
                    context.Users.Add(new User
                    {
                        UserId = Guid.NewGuid(),
                        UserName = "Admin",
                        PassWord = Md5Encrypt.MD5Hash("1Qaz2wsx"),
                        UserPositionId = adminPosition?.ResponseData?.UserPositionId,
                        Status = UserStatus.Working
                    });

                    Assembly asm = Assembly.GetExecutingAssembly();
                    var listController = asm.GetTypes()
                        .Where(type => typeof(ControllerBase).IsAssignableFrom(type))
                        .Select(n => new GroupRole { GroupRoleId = Guid.Empty, GroupRoleCode = n.Name.Replace("Controller", ""), GroupRoleName = ((RoleGroupDescriptionAttribute)n.GetCustomAttribute(typeof(RoleGroupDescriptionAttribute)))?.Description });

                    var controllerActionList = asm.GetTypes()
                            .Where(type => typeof(ControllerBase).IsAssignableFrom(type))
                            .SelectMany(type => type.GetMethods(BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.Public))
                            .Where(m => !m.GetCustomAttributes(typeof(System.Runtime.CompilerServices.CompilerGeneratedAttribute), true).Any())
                            .Where(m => !m.CustomAttributes.Any(n => n.AttributeType == typeof(AllowAnonymousAttribute)))
                            .Select(x => new Role
                            {
                                RoleCode = x.DeclaringType.Name.Replace("Controller", "") + "-" + x.Name,
                                RoleId = Guid.Empty,
                                RoleName = ((RoleDescriptionAttribute)x.GetCustomAttribute(typeof(RoleDescriptionAttribute)))?.Description
                            })
                            .OrderBy(x => x.RoleCode).ToList();

                    await roleRepository.UpdateListRole(controllerActionList, listController, true);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
