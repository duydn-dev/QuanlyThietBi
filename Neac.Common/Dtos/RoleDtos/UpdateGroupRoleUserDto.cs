using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Neac.Common.Dtos.RoleDtos
{
    public class UpdateGroupRoleUserDto
    {
        public Guid? UserPositionId { get; set; }
        public List<Guid> RoleIds { get; set; }
    }
}
