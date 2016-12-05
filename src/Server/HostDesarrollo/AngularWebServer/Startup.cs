using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;
using System;
using System.IO;

namespace Baak.Hosts.Desarrollo.AngularWebServer
{
    class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            string dir = AppDomain.CurrentDomain.RelativeSearchPath;
            string contentPath = Path.GetFullPath(Path.Combine(dir, @"../../Client"));

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
