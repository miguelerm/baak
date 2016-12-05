using Baak.Autenticacion.Configuracion;
using IdentityServer3.Core.Configuration;
using Owin;

namespace Baak.Autenticacion
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var options = new IdentityServerOptions
            {
                Factory = new IdentityServerServiceFactory()
                            .UseInMemoryClients(Clients.Get())
                            .UseInMemoryScopes(Scopes.Get())
                            .UseInMemoryUsers(Users.Get()),
                SigningCertificate = Certificado.ObtenerCertificadoDeDesarrollo(),
                RequireSsl = false
            };

            app.UseIdentityServer(options);
        }
    }
}