using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Settings
{
    public class ExtComponent
    {
        public static IConfigurationRoot Configuration { get; set; }
        static ExtComponent()
        {
            Configuration = ConfigurationHelper.Init();
        }
        public static string GetComponent(string CompanyId)
        {
            try
            {
                //var valuesSection = Configuration.GetSection("MySettings:MyValues");
                //foreach (IConfigurationSection section in valuesSection.GetChildren())
                //{
                //    var key = section.GetValue<string>("Key");
                //    var value = section.GetValue<string>("Value");
                //}

                var ExtComponent = Configuration.GetSection("ExtComponent")[CompanyId] ?? "";
                if (string.IsNullOrEmpty(ExtComponent))
                    ExtComponent = "";
                return string.Format(";{0};", ExtComponent);
            }
            catch (Exception)
            {  
                return "";
            }
        }
    }
}
