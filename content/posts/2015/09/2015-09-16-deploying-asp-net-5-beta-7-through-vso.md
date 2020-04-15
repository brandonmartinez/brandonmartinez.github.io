---
coverImageUri: ''
title: 'Deploying ASP.NET 5 Beta 7 Through Visual Studio Online'
datetime: '2015-09-16T19:00:13.000Z'
categories: 'technology'
tags: 'asp.net 5,asp.net dnx,visual studio,visual studio online'
excerpt:
  "If you're trying to deploy your ASP.NET 5 beta 7 application, you may be
  running into an error."
---

If you're trying to deploy your ASP.NET 5 beta 7 application, you may be running
into this error:
`System.IO.FileNotFoundException: Could not load file or assembly 'Microsoft.DNX.PackageManager' or one of its dependencies. The system cannot find the file specified.`

The reason for that is the version of Visual Studio 2015 in the hosted build
controller doesn't have the latest set of web tools installed. The only way
around this, besides hosting your own build controller, is to drop back to
`dnu build` and `dnu publish`.

## The Prep

The easiest way is to make sure you've followed all of the directions in
Microsoft's original post:
[Build and Deploy your ASP.NET 5 Application to an Azure Web App](https://msdn.microsoft.com/en-us/Library/vs/alm/Build/azure/deploy-aspnet5 'Build and Deploy your ASP.NET 5 Application to an Azure Web App').
After that, you'll need to make a few modifications in anticipation for running
the `dnu` commands.

## The Change

We need to add an extra (hopefully temporary) PowerShell script that is going to
do the build and publish for us. I created a file called `LocalPublish.ps1` at
the root of my solution and had contents similar to this:

```powershell
#Requires -Version 3.0

param($vsoProjectName, $projectName, $buildConfiguration, $buildSourcesDirectory)

$VerbosePreference = "continue"
$ErrorActionPreference = "Stop"

& { $Branch = 'dev'; iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1')) }
$globalJson = Get-Content -Path $PSScriptRoot\global.json -Raw -ErrorAction Ignore | ConvertFrom-Json -ErrorAction Ignore

if ($globalJson) {
    $dnxVersion = $globalJson.sdk.version
}
else {
    Write-Warning "Unable to locate global.json to determine using 'latest'"
    $dnxVersion = "latest"
}

& $env:USERPROFILE\.dnx\bin\dnvm install $dnxVersion -Persistent

$dnxRuntimePath = "$($env:USERPROFILE)\.dnx\runtimes\dnx-clr-win-x86.$dnxVersion"

& "dnu" "build" "$PSScriptRoot\src\$projectName" "--configuration" "$buildConfiguration"

& "dnu" "publish" "$PSScriptRoot\src\$projectName" "--configuration" "$buildConfiguration" "--out" "$buildSourcesDirectory\$vsoProjectName\artifacts\bin\$buildConfiguration\Publish" "--runtime" "$dnxRuntimePath"

```

_Why am I including the `dnvm` stuff again? Apparently the environment variables
set by the `Prebuild.ps1` for `dnx` don't carry through the build steps
properly. Since this is a temporary solution, I wasn't too worried about it._

I then changed my build steps from this:

[![vsoazurebefore](http://assets.brandonmartinez.com/brandonmartinez/2015/09/vsoazurebefore.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/09/vsoazurebefore.png)

To this (I'm deploying multiple projects, so ignore the duplicate steps):

[![vsoazureafter](http://assets.brandonmartinez.com/brandonmartinez/2015/09/vsoazureafter.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/09/vsoazureafter.png)

In the new `LocalPublish.ps1` PowerShell script, you just need to specify
`LocalPublish.ps1` for the script filename, then in arguments something along
these lines:  
`--vsoProjectName "YourVsoProjectName" --projectName "YourCompany.YourApp.Web" --buildConfiguration $(BuildConfiguration) --buildSourcesDirectory $(Build.SourcesDirectory)`

Once that's set, you should be able to build again (assuming you have no hard
requirement on Visual Studio specifically)!

## Gotcha: Relative Pathing

One additional note, I did run into an issue with grunt and relative pathing. I
had a SASS task setup like this:

```javascript
{
    sass: {
      options: {
        includePaths: [
          './bower_components'
            ],
        importer: compass
        },
      dist: {
        files: [
                {
            expand: true,
            cwd: '<%= yeoman.app %>/styles',
            src: ['*.{scss,sass
                        }'
                    ],
            dest: '.tmp/styles',
            ext: '.css'
                }
            ]
        }
    }
}
```

I had to change the `'./bower_components'` line to just `'bower_components'`; my
guess is that the execution directory changes when running `dnu` directly.
