using IdentityServer3.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace Baak.Autenticacion.Configuracion
{
    internal static class Scopes
    {
        public static List<Scope> Get()
        {
            var scopes = StandardScopes.All.ToList();
            scopes.Add(new Scope
            {
                Name = "api.seguridad",
                Type = ScopeType.Resource,
                Enabled = true
            });

            return scopes;
        }
    }
}