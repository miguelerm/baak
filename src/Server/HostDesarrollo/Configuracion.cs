namespace Baak.Hosts.Desarrollo
{
    class Configuracion
    {
        public bool ServeAngularApp { get; set; }

        public Configuracion(string[] args)
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
