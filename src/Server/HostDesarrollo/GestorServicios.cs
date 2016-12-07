using Baak.Hosts.Desarrollo.Logging;
using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Baak.Hosts.Desarrollo
{
    class GestorServicios : IDisposable
    {
        private static readonly ILog log = LogProvider.For<GestorServicios>();

        private readonly List<IDisposable> servicios;

        public GestorServicios()
        {
            servicios = new List<IDisposable>();
        }

        public void Iniciar<T>(string url)
        {
            var nombre = ObtenerNombreServicio<T>();
            log.InfoFormat("Iniciando servicio {Servicio}...", nombre);
            
            var servicio = WebApp.Start<T>(url);
            servicios.Add(servicio);

            log.InfoFormat("Servicio {Servicio} iniciado en {Url}", nombre, url);
        }

        public void Dispose()
        {
            servicios.ForEach(x => x.Dispose());
        }
                
        private static string ObtenerNombreServicio<T>()
        {
            var servicioNamespace = typeof(T).Namespace;
            var nombre = servicioNamespace.Split('.').LastOrDefault();

            if (string.IsNullOrWhiteSpace(nombre))
            {
                nombre = typeof(T).Name;
            }

            return nombre;
        }
    }
}
