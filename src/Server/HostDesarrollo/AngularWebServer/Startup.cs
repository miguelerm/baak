using Baak.Logging;
using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;
using System.IO;
using System.Reflection;

namespace Baak.Hosts.Desarrollo.AngularWebServer
{
    class Startup
    {
        private static readonly ILog log = LogProvider.For<Startup>();

        public void Configuration(IAppBuilder app)
        {
            var hostRelativeContentPath = @"../../Client";
            var executionPath = Assembly.GetExecutingAssembly().Location;
            var executionDir = Path.GetDirectoryName(executionPath);
            var contentPath = Path.GetFullPath(Path.Combine(executionDir, hostRelativeContentPath));

            log.InfoFormat("Host dir: {executionDir}", executionDir);
            log.InfoFormat("Content path: {contentPath}", contentPath);

            app.UseFileServer(new FileServerOptions
            {
                EnableDefaultFiles = true,
                FileSystem = new PhysicalFileSystem(contentPath),
                RequestPath = new PathString(string.Empty)
            });

            app.UseDefaultFiles();
        }
    }
}
