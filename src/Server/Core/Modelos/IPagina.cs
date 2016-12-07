using System.Collections.Generic;

namespace Baak.Modelos
{
    /// <summary>
    /// Estructura que debe respetar un conjunto de datos que soporta paginacion.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IPagina<T>
    {
        /// <summary>
        /// Elementos de la pagina actual
        /// </summary>
        IEnumerable<T> Elementos { get; set; }

        /// <summary>
        /// Pagina en la que se encuentran los elementos actuales
        /// </summary>
        int PaginaActual { get; set; }

        /// <summary>
        /// Cantidad de elementos que tiene cada pagina
        /// </summary>
        int ElementosPorPagina { get; set; }

        /// <summary>
        /// Cantidad de paginas que existen
        /// </summary>
        int Paginas { get; set; }

        /// <summary>
        /// Cantidad total de elementos existentes en todas las páginas
        /// </summary>
        int Total { get; set; }
    }
}