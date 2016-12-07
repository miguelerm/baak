using System.Collections.Generic;
using Baak.Modelos;

namespace Baak.Seguridad.Modelos
{
    public class UsuarioResumenPagina : IPagina<UsuarioResumen>
    {
        public IEnumerable<UsuarioResumen> Elementos { get; set; }
        public int PaginaActual { get; set; }
        public int ElementosPorPagina { get; set; }
        public int Paginas { get; set; }
        public int Total { get; set; }
    }
}