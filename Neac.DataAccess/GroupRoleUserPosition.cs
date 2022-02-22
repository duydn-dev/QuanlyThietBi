using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Neac.DataAccess
{
    public class GroupRoleUserPosition
    {
        [Key]
        public Guid GroupRoleUserPositionId { get; set; }
        public Guid? PositionUserId { get; set; }
        public Guid? RoleId { get; set; } 
    }
}
