using Core.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Core.Settings
{
    public class AppSettings
    {
        public static IConfigurationRoot Configuration { get; set; }
        private const string SecretKey = "8vT2A12RBmZ1T5Kf";
        static AppSettings()
        {
            Configuration = ConfigurationHelper.Init();
        }
        public static string GenerateConnectionString(string input)
        {
            return Crypton.EncryptByKey(input, SecretKey);
        }
        public static string ConnectionString
        {
            get
            {
                return Crypton.DecryptByKey(Configuration.GetConnectionString("Master"), SecretKey);
            }
        }
        public static string ConnectionStringSlave
        {
            get
            {
                return Crypton.DecryptByKey(Configuration.GetConnectionString("Slave"), SecretKey);
            }
        }
        public static string GetByKey(string key)
        {
            return Configuration.GetSection("AppSettings")[key] ?? "";
        }
        public static bool GetByKeyToBool(string key)
        {
            return Utility.ConvertToBoolean(Configuration.GetSection("AppSettings")[key] ?? "False");
        }
        public static int GetByKeyToInt(string key)
        {
            return Utility.ConvertToInt(Configuration.GetSection("AppSettings")[key]);
        }
        public static string StorageDomain
        {
            get { return GetByKey("StorageDomain"); }
        }
        public static string Domain
        {
            get { return GetByKey("Domain"); }
        }
        public static string Version
        {
            get { return GetByKey("Version"); }
        }
        public static string GoogleMapKey
        {
            get { return GetByKey("GoogleMapKey"); }
        }
    }
}
