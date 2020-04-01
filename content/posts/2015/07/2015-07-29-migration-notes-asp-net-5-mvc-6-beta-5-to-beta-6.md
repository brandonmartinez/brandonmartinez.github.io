---
id: '21901'
coverImageUri: ''
title: 'Migration Notes: ASP.NET 5 MVC 6 - Beta 5 to Beta 6'
date: '2015-07-29'
datetime: '2015-07-29T12:00:59.000Z'
categories: 'technology'
tags: 'asp.net 5,asp.net dnx,asp.net mvc,git'
excerpt:
  'Another beta is available for ASP.NET 5 MVC 6! Here are my upgrade notes to
  my team on the migration process from Beta 5 to Beta 6; hopefully some of them
  will help you in your migration, as well.'
---

Another beta is available for ASP.NET 5 MVC 6! Here are my upgrade notes to my
team on the migration process from Beta 5 to Beta 6; hopefully some of them will
help you in your migration, as well.

> Hello Team:
>
> We’ve been moved to beta 6! This requires a tooling update for VS, so please
> install the following:
>
> - DotNetVersionManager-x64.msi
> - WebToolsExtensionsVS14
>
> From:
> [http://www.microsoft.com/en-us/download/details.aspx?id=48222](http://www.microsoft.com/en-us/download/details.aspx?id=48222)
>
> And don’t forget to update your dnvm stuff (ORDER MATTERS):
>
> 1. dnvm upgrade -arch x64 -r clr
> 2. dnvm upgrade -arch x86 -r clr
>
> The following announcements effected or are at least somewhat relevant to the
> codebase to varying levels:
>
> - [EntityFramework.\* packages renamed to EntityFramework7.\* & meta-package removed](https://github.com/aspnet/Announcements/issues/42)
> - [project.lock.json Version set to 1](https://github.com/aspnet/Announcements/issues/37)
> - [Refactoring of MVC packages](https://github.com/aspnet/Announcements/issues/49)
> - [Known issues for ASP.NET 5 support in Visual Studio 2015](https://github.com/aspnet/Tooling/blob/master/known-issues.md)
> - [EntityFramework 7 Release Notes](https://github.com/aspnet/EntityFramework/releases)
>
> Something we should look into sometime in the future, maybe in combination
> with or as an alternative to Redis:
>
> - [New distributed cache implementation based on Microsoft SQL Server](https://github.com/aspnet/Announcements/issues/43)
>
> Thanks, -Brandon
