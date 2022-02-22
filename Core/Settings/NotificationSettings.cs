using Core.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Core.Settings
{
    public class NotificationSettings
    {
        public static IConfigurationRoot Configuration { get; set; }
        static NotificationSettings()
        {
            Configuration = ConfigurationHelper.Init();
        }

        private static string GetByKey(string key)
        {
            return Configuration.GetSection("Notification")[key] ?? "";
        }
        private static bool GetByKeyToBool(string key)
        {
            return Utility.ConvertToBoolean(Configuration.GetSection("Notification")[key] ?? "False");
        }

        public static string OneSignalAppId
        {
            get { return GetByKey("OneSignalAppId"); }
        }
        public static bool Enabled
        {
            get { return GetByKeyToBool("Enabled"); }
        }
    }
}
