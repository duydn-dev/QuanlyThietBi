using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Neac.DataAccess
{
    public class Department
    {
        [Key]
        public Guid DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? Status { get; set; }

        public IList<User> User { get; set; }
    }
}
