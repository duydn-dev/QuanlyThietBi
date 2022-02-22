using Core.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Core.Settings
{
    public class PaypalSettings
    {
        public static IConfigurationRoot Configuration { get; set; }
        static PaypalSettings()
        {
            Configuration = ConfigurationHelper.Init();
        }

        private static string GetByKey(string key)
        {
            return Configuration.GetSection("Paypal")[key] ?? "";
        }
        private static bool GetByKeyToBool(string key)
        {
            return Utility.ConvertToBoolean(Configuration.GetSection("Paypal")[key] ?? "False");
        }

        public static bool IsSandbox
        {
            get { return GetByKeyToBool("IsSandbox"); }
        }
        public static string ApiUrl
        {
            get { return GetByKey("ApiUrl"); }
        }
    }
}
