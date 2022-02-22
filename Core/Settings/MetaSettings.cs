using Core.Utils;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Core.Settings
{
    public class MetaSettings
    {
        public static IConfigurationRoot Configuration { get; set; }
        static MetaSettings()
        {
            Configuration = ConfigurationHelper.Init();
        }

        public static string GetAll()
        {
            var child = Configuration.GetSection("Meta").GetChildren();
            var dicts = new List<Dictionary<string, MetaEntity>>();

            foreach (var c in child)
            {
                var dict = new Dictionary<string, MetaEntity>();
                var items = c.GetChildren();
                MetaEntity en = new MetaEntity();
                foreach (var i in items)
                {
                    if (i.Key.ToLower() == "title")
                    {
                        en.title = i.Value;
                    }
                    else if (i.Key.ToLower() == "description")
                    {
                        en.description = i.Value;
                    }
                }
                dict.Add(c.Key, en);
                dicts.Add(dict);
            }
            return Newtonsoft.Json.JsonConvert.SerializeObject(dicts);
        }
        public class MetaEntity
        {
            public string title { get; set; }
            public string description { get; set; }
        }
    }
}
