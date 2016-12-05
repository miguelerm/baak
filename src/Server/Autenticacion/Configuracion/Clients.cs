using IdentityServer3.Core.Models;
using System.Collections.Generic;
using static IdentityServer3.Core.Constants;

namespace Baak.Autenticacion.Configuracion
{
    internal static class Clients
    {
        public static List<Client> Get()
        {
            return new List<Client>
            {
                new Client
                {
                    Enabled = true,
                    ClientName = "Baak App",
                    ClientId = "baak.clients.app",
                    ClientUri = "http://localhost:40000/",
                    Flow = Flows.Implicit,
                    AllowAccessToAllScopes = true,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,
                    AccessTokenLifetime = 18000, // 5 hours
                    AuthorizationCodeLifetime = 18000, // 5 hours
                    IdentityTokenLifetime = 18000, // 5 hours
                    AllowedCorsOrigins = new List<string>
                    {
                        "http://localhost:40000"
                    },
                    RedirectUris = new List<string>
                    {
                        "http://localhost:40000/signin.html",
                        "http://localhost:40000/silent-renew.html",
                    },
                    PostLogoutRedirectUris = new List<string> {
                        "http://localhost:40000/signed-out.html"
                    }
                },

                new Client
                {
                    ClientName = "Postman",
                    ClientId = "baak.clients.postman",
                    Flow = Flows.AuthorizationCode,
                    AllowAccessToAllScopes = true,
                    IdentityTokenLifetime = 86400, // 1 day
                    AccessTokenLifetime = 86400, // 1 day
                    AuthorizationCodeLifetime = 86400, // 1 day
                    RequireConsent = true,
                    Enabled = true,
                    EnableLocalLogin = true,
                    AllowedCorsOrigins = new List<string>
                    {
                        "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop"
                    },
                    ClientSecrets = new List<Secret>
                    {
                        new Secret {
                            Value = "postman-secret".Sha256(),
                            Description = "Postman Secret",
                            Type = SecretTypes.SharedSecret
                        }
                    },
                    RedirectUris = new List<string>
                    {
                        "https://www.getpostman.com/oauth2/callback"
                    }
                }
            };
        }
    }
}