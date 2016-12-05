using System.Reflection;
using System.Security.Cryptography.X509Certificates;

namespace Baak.Autenticacion.Configuracion
{
    internal static class Certificado
    {
        public static X509Certificate2 ObtenerCertificadoDeDesarrollo()
        {
            var assembly = typeof(Certificado).Assembly;
            var certificado = GetResourceAsBytes(assembly, "Baak.Autenticacion.Configuracion.Certificado.Desarrollo.pfx");
            var password = "$Baak!";

            return new X509Certificate2(certificado, password);
        }

        private static byte[] GetResourceAsBytes(Assembly assembly, string resourceName)
        {
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                byte[] bytes = new byte[stream.Length];
                stream.Read(bytes, 0, bytes.Length);
                return bytes;
            }
        }
    }
}