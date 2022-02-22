using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core
{
    public static class CustomConfigProviderExtensions
    {
        public static IConfigurationBuilder AddEncryptedProvider(this IConfigurationBuilder builder)
        {
            return builder.Add(new DekiruConfigProvider());
        }
    }
}
