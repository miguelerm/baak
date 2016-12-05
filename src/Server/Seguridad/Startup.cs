using IdentityServer3.AccessTokenValidation;
using Newtonsoft.Json.Serialization;
using Owin;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Baak.Seguridad
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // accept access tokens from identityserver and require a scope of 'api1'
            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                Authority = "http://localhost:50001",
                ValidationMode = ValidationMode.ValidationEndpoint,

                RequiredScopes = new[] { "api.seguridad" }
            });

            // configure web api
            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute("default", "{controller}/{id}", new { id = RouteParameter.Optional });

            // require authentication for all controllers
            config.Filters.Add(new AuthorizeAttribute());

            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            app.UseWebApi(config);
        }
    }
}