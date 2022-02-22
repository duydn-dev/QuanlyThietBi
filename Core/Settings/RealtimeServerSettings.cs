using System;
using System.Collections.Generic;
using System.Text;
using Core.Utils;
using Microsoft.Extensions.Configuration;

namespace Core.Settings
{
    public class RealtimeServerSettings
    {
        public static IConfigurationRoot Configuration { get; set; }
        static RealtimeServerSettings()
        {
            Configuration = ConfigurationHelper.Init();
        }

        private static string GetByKey(string key)
        {
            return Configuration.GetSection("RealtimeServer")[key] ?? "";
        }
        private static bool GetByKeyToBool(string key)
        {
            return Utility.ConvertToBoolean(Configuration.GetSection("RealtimeServer")[key] ?? "False");
        }

        public static string RealtimeServer
        {
            get { return GetByKey("RealtimeServer"); }
        }
        public static string NotifyTokenUrlFormat
        {
            get { return GetByKey("NotifyTokenUrlFormat"); }
        }
        public static string NotifyGetAllUrlFormat
        {
            get { return GetByKey("NotifyGetAllUrlFormat"); }
        }
        public static string NotifyRemoveUrlFormat
        {
            get { return GetByKey("NotifyRemoveUrlFormat"); }
        }
        public static string ConversationTokenUrlFormat
        {
            get { return GetByKey("ConversationTokenUrlFormat"); }
        }
    }
}
