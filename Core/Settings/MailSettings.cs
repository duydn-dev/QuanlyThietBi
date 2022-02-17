using Core.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Core.Settings
{
    public class MailSettings
    {
        public static IConfigurationRoot Configuration { get; set; }
        static MailSettings()
        {
            Configuration = ConfigurationHelper.Init();
        }
        
        private static string GetByKey(string key)
        {
            return Configuration.GetSection("Mail")[key] ?? "";
        }
        private static bool GetByKeyToBool(string key)
        {
            return Utility.ConvertToBoolean(Configuration.GetSection("Mail")[key] ?? "False");
        }

        public static string Host
        {
            get { return GetByKey("Host"); }
        }
        public static int Port
        {
            get { return int.Parse(GetByKey("Port")); }
        }
        public static string Password
        {
            get { return GetByKey("Password"); }
        }
        public static string Email
        {
            get { return GetByKey("Email"); }
        }
        public static string EmailDisplay
        {
            get { return GetByKey("EmailDisplay"); }
        }
    }
}
