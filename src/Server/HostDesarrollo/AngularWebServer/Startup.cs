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
            string dir = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
            Console.WriteLine("Dir: {0}", dir);
            string contentPath = Path.GetFullPath(Path.Combine(dir, @"../../Client"));
            Console.WriteLine("Content Path: {0}", contentPath);

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
