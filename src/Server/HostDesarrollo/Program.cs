using Microsoft.Owin.Hosting;
using Serilog;
using System;
using System.Collections.Generic;

namespace Baak.Hosts.Desarrollo
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .WriteTo
                .LiterateConsole(outputTemplate: "{Timestamp:HH:mm} [{Level}] ({SourceContext:l}){NewLine} {Message}{NewLine}{Exception}")
                .CreateLogger();

            var argumentos = new Argumentos(args);

            using (var servicios = new ServiciosManager(argumentos))
            {
                Console.WriteLine("Servicios Iniciados");
                Console.ReadLine();
            }
        }

        private class ServiciosManager : IDisposable
        {
            private readonly List<IDisposable> servicios;

            public ServiciosManager(Argumentos args)
            {
                servicios = new List<IDisposable> {
                    WebApp.Start<Autenticacion.Startup>("http://localhost:50001"),
                    WebApp.Start<Seguridad.Startup>("http://localhost:50002")
                };

                if (args.ServeAngularApp)
                {
                    servicios.Add(WebApp.Start<AngularWebServer.Startup>("http://localhost:40000"));
                }
            }

            public void Dispose()
            {
                servicios.ForEach(x => x.Dispose());
            }
        }

        public class Argumentos
        {
            public bool ServeAngularApp { get; set; }

            public Argumentos(string[] args)
            {
                foreach (var arg in args)
                {
                    if (arg == "--serve-angular-app")
                    {
                        ServeAngularApp = true;
                    }
                }
            }
        }
    }
}