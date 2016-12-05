using IdentityServer3.Core.Services.InMemory;
using System.Collections.Generic;

namespace Baak.Autenticacion.Configuracion
{
    internal static class Users
    {
        public static List<InMemoryUser> Get()
        {
            return new List<InMemoryUser>
            {
                new InMemoryUser
                {
                    Username = "admin",
                    Password = "admin",
                    Subject = "1"
                },
                new InMemoryUser
                {
                    Username = "user",
                    Password = "user",
                    Subject = "2"
                }
            };
        }
    }
}