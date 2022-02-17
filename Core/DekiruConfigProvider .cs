using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Collections.Generic;

namespace Core
{
    public class DekiruConfigProvider : ConfigurationProvider, IConfigurationSource
    {
        public static IConfigurationRoot Configuration { get; set; }
        public DekiruConfigProvider()
        {

        }

        public override void Load()
        {
            Data = UnencryptMyConfiguration();            
        }

        private IDictionary<string, string> UnencryptMyConfiguration()
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");
            Configuration = builder.Build();
            var configValues = new Dictionary<string, string>
           {
                {"key1", "unencryptedValue1"},
                {"key2", "unencryptedValue2"}
           };
            return configValues;
        }

        public IConfigurationProvider Build(IConfigurationBuilder builder)
        {
            return new DekiruConfigProvider();
        }
    }
}
