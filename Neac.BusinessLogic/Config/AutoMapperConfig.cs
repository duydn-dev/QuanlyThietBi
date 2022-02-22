using AutoMapper;
using Neac.Common.Dtos;
using Neac.Common.Dtos.DepartmentDtos;
using Neac.Common.Dtos.PositionDtos;
using Neac.Common.Dtos.RoleDtos;
using Neac.Common.Dtos.UserPositionDtos;
using Neac.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Neac.BusinessLogic.Config
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<UserCreateDto, User>().ForMember(x => x.UserRoles, g => g.Ignore());
            CreateMap<User, UserCreateDto>();

            CreateMap<UserPosition, PositonGetDropdownViewDto>();
            CreateMap<PositonGetDropdownViewDto, UserPosition>().ForMember(x => x.Users, g => g.Ignore());

            CreateMap<Department, DepartmentViewDto>();
            CreateMap<DepartmentViewDto, Department>().ForMember(n => n.User, g => g.Ignore());

            CreateMap<UserPosition, UserPositionDto>();
            CreateMap<UserPositionDto, UserPosition>();

            CreateMap<Role, RoleDto>();
            CreateMap<RoleDto, Role>()
                .ForMember(n => n.UserRoles, n => n.Ignore())
                .ForMember(n => n.GroupRole, n => n.Ignore());

            CreateMap<GroupRole, GroupRoleAndRoleDto>().ForMember(n => n.Roles, n => n.MapFrom(g => g.Roles));
            CreateMap<GroupRoleAndRoleDto, GroupRole>().ForMember(n => n.Roles, n => n.MapFrom(g => g.Roles));
        }
    }
}
