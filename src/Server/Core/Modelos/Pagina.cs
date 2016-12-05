using System.Collections.Generic;

namespace Baak.Modelos
{
    public class Pagina<T>
    {
        public IEnumerable<T> Items { get; set; }
        public int PaginaActual { get; set; }
        public int ElementosPagina { get; set; }
        public int Paginas { get; set; }
    }
}