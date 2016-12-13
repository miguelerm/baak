#tool nuget:?package=xunit.runner.console&version=2.1.0
#addin "Cake.Npm"

//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");

//////////////////////////////////////////////////////////////////////
// PREPARATION
//////////////////////////////////////////////////////////////////////

// Define directories.
var buildDir = Directory("./bin/Server") + Directory(configuration);

//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////

Task("Clean")
    .Does(() =>
    {
        CleanDirectory(buildDir);
        CleanDirectory(Directory("./bin/Tests"));
    });

Task("Restore-NuGet-Packages")
    .IsDependentOn("Clean")
    .Does(() =>
    {
        NuGetRestore("./src/Server/Server.sln");
    });

Task("Build-Server")
    .IsDependentOn("Restore-NuGet-Packages")
    .Does(() =>
    {
        if(IsRunningOnWindows())
        {
            // Use MSBuild
            MSBuild("./src/Server/Server.sln", settings => 
                settings.SetConfiguration(configuration)
            );
        }
        else
        {
            // Use XBuild
            XBuild("./src/Server/Server.sln", settings =>
                settings.SetConfiguration(configuration)
            );
        }
    });

Task("Run-Server-Unit-Tests")
    .IsDependentOn("Build-Server")
    .Does(() =>
    {
        XUnit2("./src/**/bin/" + configuration + "/*.Tests.dll", new XUnit2Settings {
            HtmlReport = true,
            OutputDirectory = "./bin/Tests",
            Parallelism = ParallelismOption.All
        });
    });

Task("Copy-Server-Artifacts")
    .IsDependentOn("Build-Server")
    .Does(() => {
        var srcBinDir = Directory("./src/Server/HostDesarrollo/bin") + Directory(configuration);
        CopyDirectory(srcBinDir, buildDir);
    });

Task("Restore-Npm-Packages")
    .Does(() => {

        Npm.FromPath("./src/Client").Install();

    });

Task("Build-Client")
    .IsDependentOn("Restore-Npm-Packages")
    .Does(() => {

        Npm.FromPath("./src/Client").RunScript("build");

    });

Task("Run-Client-Unit-Tests")
    .IsDependentOn("Build-Client")
    .Does(() => {
        Npm.FromPath("./src/Client").RunScript("test-once");
    });

Task("Run")
    .IsDependentOn("Copy-Server-Artifacts")
    .Does(() => {
        var processDir = buildDir + File("Baak.Hosts.Desarrollo.exe");
        var settings = new ProcessSettings { Arguments = "--serve-angular-app" }; 
        StartProcess(processDir, settings);
    });

//////////////////////////////////////////////////////////////////////
// TASK TARGETS
//////////////////////////////////////////////////////////////////////

Task("Default")
    .IsDependentOn("Run-Server-Unit-Tests")
    .IsDependentOn("Copy-Server-Artifacts")
    .IsDependentOn("Run-Client-Unit-Tests");

//////////////////////////////////////////////////////////////////////
// EXECUTION
//////////////////////////////////////////////////////////////////////

RunTarget(target);
