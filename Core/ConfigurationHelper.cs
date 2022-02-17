using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Core
{
    public class ConfigurationHelper
    {
        public static IConfigurationRoot Init()
        {
            return new ConfigurationBuilder()
                .AddEnvironmentVariables()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{EnvironmentName}.json", true, true)
                .Build();
        }
        public static string EnvironmentName
        {
            get
            {
                return Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";
            }
        }
    }
}
