using Serilog;
using System;

namespace Baak.Hosts.Desarrollo
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            ConfigurarLogging();

            var configuracion = new Configuracion(args);

            using (var servicios = new GestorServicios())
            {
                Console.WriteLine("Iniciando servicios...");
                IniciarServicios(configuracion, servicios);
                Console.WriteLine("Servicios Iniciados.");

                Console.WriteLine("Presione Ctrl+C para detener los servicios correctamente.");

                EsperarPorCtrlC();

                Console.WriteLine("Deteniendo servicios...");
            }

            Console.WriteLine("Servicios detenidos.");
        }

        private static void ConfigurarLogging()
        {
            Log.Logger = new LoggerConfiguration()
                            .MinimumLevel.Debug()
                            .WriteTo
                            .LiterateConsole(outputTemplate: "{Timestamp:HH:mm} [{Level}] ({SourceContext:l}){NewLine} {Message}{NewLine}{Exception}")
                            .CreateLogger();
        }

        private static void IniciarServicios(Configuracion configuracion, GestorServicios servicios)
        {

            servicios.Iniciar<Autenticacion.Startup>("http://localhost:50001");
            servicios.Iniciar<Seguridad.Startup>("http://localhost:50002");

            if (configuracion.ServeAngularApp)
            {
                servicios.Iniciar<AngularWebServer.Startup>("http://localhost:40000");
            }
        }

        private static void EsperarPorCtrlC()
        {
            Console.TreatControlCAsInput = true;
            while (true)
            {
                var tecla = Console.ReadKey(true);
                if ((tecla.Modifiers & ConsoleModifiers.Control) != 0 && tecla.Key == ConsoleKey.C)
                {
                    break;
                }
            }
        }
               
        
    }
}