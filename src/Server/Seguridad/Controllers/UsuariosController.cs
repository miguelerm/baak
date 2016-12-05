using Baak.Logging;
using Baak.Seguridad.Modelos;
using System.Web.Http;

namespace Baak.Seguridad.Controllers
{
    public class UsuariosController : ApiController
    {
        private readonly ILog log = LogProvider.For<UsuariosController>();

        public IHttpActionResult Get()
        {
            log.Trace("0 Consultando usuarios...");
            log.Debug("1 Consultando usuarios...");
            log.Info("2 Consultando usuarios...");
            log.Warn("3 Consultando usuarios...");
            log.Error("4 Consultando usuarios...");
            log.Fatal("5 Consultando usuarios...");

            return Ok(new UsuarioResumenPagina
            {
                Items = new[] { new UsuarioResumen { Id = 1, Nombre = "Demo" } },
                PaginaActual = 1,
                ElementosPagina = 100,
                Paginas = 1
            });
        }
    }
}