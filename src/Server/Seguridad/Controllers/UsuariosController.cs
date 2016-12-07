using Baak.Seguridad.Logging;
using Baak.Seguridad.Modelos;
using System.Web.Http;

namespace Baak.Seguridad.Controllers
{
    public class UsuariosController : ApiController
    {
        private readonly ILog log = LogProvider.For<UsuariosController>();

        public IHttpActionResult Get()
        {
            log.Debug("Consultando usuarios...");

            return Ok(new UsuarioResumenPagina
            {
                Elementos = new[] { new UsuarioResumen { Id = 1, Nombre = "Demo" } },
                PaginaActual = 1,
                ElementosPorPagina = 100,
                Paginas = 1,
                Total = 1
            });
        }
    }
}