---
coverImageUri: ''
title: 'Migration Notes: ASP.NET 5 MVC 6 - Beta 8 to RC 1'
datetime: '2015-12-02T22:02:17.000Z'
categories: 'technology'
tags: 'asp.net 5,asp.net dnx,asp.net mvc'
excerpt:
  'I finally had a chance to get our codebase to the release candidate of
  ASP.NET 5. Excited to have a supported release available and more-or-less
  production-ready! As usual, here are my personal release notes to my team on
  the upgrade process.'
---

I finally had a chance to get our codebase to the release candidate of
ASP.NET 5. Excited to have a supported release available and more-or-less
production-ready! As usual, here are my personal release notes to my team on the
upgrade process.

> Good Afternoon, Everyone:
>
> The upgrade to release candidate 1 (update 1) has been completed. As with
> previous beta updates, Visual Studio requires updated tooling; this time it's
> in the form of
> [Visual Studio 2015 Update 1 (download)](http://go.microsoft.com/fwlink/?LinkId=691129)
> [(release notes)](https://www.visualstudio.com/en-us/news/vs2015-update1-vs.aspx 'Visual Studio 2015 Update 1 Release Notes').
>
> And don’t forget to update your dnvm stuff from the command line:
> `dnvm upgrade`
>
> You may want to remove all other betas from your user folder:
> `C:\Users\{YOUR PROFILE}\.dnx\runtimes`
>
> The following announcements/issues were relevant to our codebase to some
> degree:
>
> - [Moving towards unification of entry point semantics with desktop CLR](https://github.com/aspnet/Announcements/issues/113)
> - [Switching to new 'dotnet' target framework monikers](https://github.com/aspnet/Announcements/issues/98)
> - [webroot definition moved from project.json to hosting.json](https://github.com/aspnet/Announcements/issues/94)
> - [ConfigurationBuilder SetBasePath is now optional](https://github.com/aspnet/Announcements/issues/88)
> - [EntityFramework.SqlServer package renamed to EntityFramework.MicrosoftSqlServer](https://github.com/aspnet/Announcements/issues/85)
> - [Authentication: AutomaticAuthentication has been split](https://github.com/aspnet/Announcements/issues/83)
> - [Microsoft.Framework.\* has been renamed to Microsoft.Extensions.\*](https://github.com/aspnet/Announcements/issues/77)
>
> And just a couple to take note of:
>
> - [SecretManager package has been renamed to Microsoft.Extensions.SecretManager](https://github.com/aspnet/Announcements/issues/116)
> - [New versioning for major releases](https://github.com/aspnet/Announcements/issues/97)
> - [Templates repo is now public](https://github.com/aspnet/Announcements/issues/79)
> - [Changes to \`dnvm\` parameters](https://github.com/aspnet/Announcements/issues/76)
>
> Some additional references:
>
> - [Announcing ASP.NET 5 Release Candidate 1 | .NET Web Development and Tools Blog](http://blogs.msdn.com/b/webdev/archive/2015/11/18/announcing-asp-net-5-release-candidate-1.aspx 'Announcing ASP.NET 5 Release Candidate 1 | .NET Web Development and Tools Blog')
> - [Upgrading ASP.NET 5 Beta 8 to RC1 | Shawn Wildermuth](http://wildermuth.com/2015/11/18/Upgrading_ASP_NET_5_Beta_8_to_RC1 'Upgrading ASP.NET 5 Beta 8 to RC1 | Shawn Wildermuth')
> - [ASP.NET Beta 8 to RC 1 Annotated Diff | .NET Liberty](http://dotnetliberty.com/index.php/2015/11/23/asp-net-5-beta-8-to-rc1-annotated-diff/ 'ASP.NET Beta 8 to RC 1 Annotated Diff | .NET Liberty')
