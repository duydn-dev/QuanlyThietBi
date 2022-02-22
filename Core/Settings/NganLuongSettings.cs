using Core.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Core.Settings
{
    public class NganLuongSettings
    {
        public static IConfigurationRoot Configuration { get; set; }
        static NganLuongSettings()
        {
            Configuration = ConfigurationHelper.Init();
        }

        private static string GetByKey(string key)
        {
            return Configuration.GetSection("NganLuong")[key] ?? "";
        }
        private static bool GetByKeyToBool(string key)
        {
            return Utility.ConvertToBoolean(Configuration.GetSection("NganLuong")[key] ?? "False");
        }

        public static string MerchantId
        {
            get { return GetByKey("MerchantId"); }
        }
        public static string MerchantPassword
        {
            get { return GetByKey("MerchantPassword"); }
        }
        public static string MerchantEmail
        {
            get { return GetByKey("MerchantEmail"); }
        }
        public static string ApiUrl
        {
            get { return GetByKey("ApiUrl"); }
        }
        public static string ApiCardUrl
        {
            get { return GetByKey("ApiCardUrl"); }
        }
        public static int CardLossPercent
        {
            get { return int.Parse(GetByKey("CardLossPercent")); }
        }
    }
}
