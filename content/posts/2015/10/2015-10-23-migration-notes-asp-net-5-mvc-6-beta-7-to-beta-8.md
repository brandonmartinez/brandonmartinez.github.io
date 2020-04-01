---
id: '23231'
coverImageUri: ''
title: 'Migration Notes: ASP.NET 5 MVC 6 - Beta 7 to Beta 8'
date: '2015-10-23'
datetime: '2015-10-23T12:00:16.000Z'
categories: 'technology'
tags: 'asp.net 5,asp.net dnx,asp.net mvc,git'
excerpt:
  'Time for the last beta of ASP.NET 5 MVC 6! Here are my release notes to my
  current team on migrating from Beta 7 to Beta 8.'
---

Time for the last beta of ASP.NET 5 MVC 6! Here are my release notes to my
current team on migrating from Beta 7 to Beta 8:

> Good Morning, Everyone: The upgrade to beta 8 has been completed. As with
> previous beta updates, Visual Studio requires updated tooling, so please grab
> these:
>
> - DotNetVersionManager-x64.msi
> - WebToolsExtensionsVS14
>
> From here:
> [http://www.microsoft.com/en-us/download/details.aspx?id=49442](http://www.microsoft.com/en-us/download/details.aspx?id=49442)
> And don’t forget to update your dnvm stuff (ORDER MATTERS):
>
> - dnvm upgrade -arch x64 -r clr
> - dnvm upgrade -arch x86 -r clr
>
> You may want to remove all other betas from your user folder:
> `C:\Users\{YOUR PROFILE}\.dnx\runtimes` The following announcements/issues
> were relevant to our codebase to some degree:
>
> - [UseErrorHandler & UseErrorPage extensions have been renamed](https://github.com/aspnet/Announcements/issues/63)
> - [Namespace Reorganization in MVC](https://github.com/aspnet/Announcements/issues/61)
>
> A few interesting code changes:
>
> **ConfigurationBuilder Changes:**
>
> ConfigurationBuilder no longer takes the ApplicationBasePath; it is now
> fluently added.
>
> ```csharp
> var configBuilder = new ConfigurationBuilder()
> .SetBasePath(appEnv.ApplicationBasePath)
> .AddJsonFile("config.json")
> .AddEnvironmentVariables();
> ```
>
> **Web.config Changes:**
>
> Relying only on the new HttpHandler.
>
> ```xml
> <handlers>
>    <add name="httpPlatformHandler" path="\*" verb="\*" modules="httpPlatformHandler" resourceType="Unspecified" />
> </handlers>
> ```
>
> I have not merged this to dev yet; I want to do some additional testing and
> will collaborate with you before I do. From forums and other posts, it looks
> like there may be some deployment and/or Azure issues from this release that
> need to be worked through. Some additional references:
>
> - [Upgrading from ASP.NET 5 Beta 7 to Beta 8 | Shawn Wildermuth](http://wildermuth.com/2015/10/20/Upgrading_from_ASP_NET_5_Beta_7_to_Beta_8)
> - [Running MVC6 Beta8 app on IIS Express | Stack Overflow](http://stackoverflow.com/questions/33158073/running-mvc6-beta8-app-on-iis-express)
