using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Neac.DataAccess
{
    public class Config
    {
        [Key]
        public Guid ConfigId { get; set; }
        public string ConfigKey {get;set;}
        public string ConfigName {get;set;}
        public string ConfigValue {get;set;}
        public string ConfigType {get;set;}
        public string ConfigData {get;set;}
        public int? Priority { get;set;}
        public bool IsSystem { get;set;}
    }
}
