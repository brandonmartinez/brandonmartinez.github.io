---
id: '22471'
coverImageUri: ''
title: 'Using SignalR Past ASP.NET 5 Beta 5'
date: '2015-09-16'
datetime: '2015-09-16T12:00:44.000Z'
categories: 'technology'
tags: 'asp.net 5,asp.net dnx,signalr'
excerpt:
  "If you've been using SignalR in the ASP.NET 5 betas, you may have noticed
  that after beta 5 you no longer can pull the NuGet package from the main
  repository. This is because SignalR has been put on hold until more of the
  ASP.NET 5 stack is complete. And while the ASP.NET team has said they'll keep
  it up-to-date enough to bring in to the later betas, there's a trick to
  actually getting that working."
---

If you've been using SignalR in the ASP.NET 5 betas, you may have noticed that
after beta 5 you no longer can pull the NuGet package from the main repository.
This is because
[SignalR has been put on hold until more of the ASP.NET 5 stack is complete](https://github.com/aspnet/Home/wiki/Roadmap#future-work 'ASP.NET 5 Roadmap | Github').
And while the ASP.NET team has said
[they'll keep it up-to-date enough to bring in to the later betas](https://github.com/aspnet/SignalR-Server/issues/109 'Tweaking SignalR for beta releases? | Github Issues'),
there's a trick to actually getting that working.

## Visual Studio

To pull the NuGet package, you'll have to pull from the
[unstable myget dev feed](https://www.myget.org/gallery/aspnetvnext). To set
this up in Visual Studio, you'll just have to add a new package source in your
package manager configuration:

[![nugetpackagemanagermenu](http://assets.brandonmartinez.com/brandonmartinez/2015/09/nugetpackagemanagermenu.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/09/nugetpackagemanagermenu.png)

[![nugetpackagemanagermygetfeed](http://assets.brandonmartinez.com/brandonmartinez/2015/09/nugetpackagemanagermygetfeed.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/09/nugetpackagemanagermygetfeed.png)

The settings I used:

- **Feed Name:** ASP.NET DNX MyGet Dev Feed
- **Feed URL:** https://www.myget.org/F/aspnetmaster/api/v2

After you've added that package source, you should be able to upgrade SignalR to
the latest beta in your `package.json` files. Keep in mind, this **only** works
for your local environment. If you want to deploy this, you need to add a flag
to your DNU process.

## DNU and Deployment

If you're using the
[handy script provided by Microsoft](https://msdn.microsoft.com/en-us/Library/vs/alm/Build/azure/deploy-aspnet5 'Build and Deploy your ASP.NET 5 Application to an Azure Web App')
to publish your web app, you just need to make a minor modification to your
`Prebuild.ps1` file to pull from the new package source:

```powershell
# run DNU restore on all project.json files in the src folder including 2>1 to redirect stderr to stdout for badly behaved tools
Get-ChildItem -Path $PSScriptRoot\src -Filter project.json -Recurse | ForEach-Object { & "dnu" "restore" "$_.FullName" "--fallbacksource" "https://www.myget.org/F/aspnetmaster/api/v2" "2>1" }
```

If you're not using their script, you just need to modify your DNU command to
include the `--fallbacksource https://www.myget.org/F/aspnetmaster/api/v2`
portion.

## Future

Once SignalR gets promoted to the main feed again, you can just reverse these
steps and you should be back to normal.

Hope that helps someone! We were scratching our heads for a while.
