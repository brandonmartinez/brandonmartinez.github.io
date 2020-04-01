---
id: '21811'
coverImageUri: ''
title: 'Migration Notes: ASP.NET 5 MVC 6 - Beta 6 to Beta 7'
date: '2015-09-08'
datetime: '2015-09-08T14:48:35.000Z'
categories: 'technology'
tags: 'asp.net 5,asp.net dnx,asp.net mvc'
excerpt:
  'Another month, another beta! Here are my release notes to my current team on
  migrating from Beta6 to Beta7 of ASP.NET MVC 6. There was only one major snag
  that I ran into, otherwise a smooth transition!'
---

Another month, another beta! Here are my release notes to my current team on
migrating from Beta6 to Beta7 of ASP.NET MVC 6. There was only one major snag
that I ran into, otherwise a smooth transition!

> The upgrade to beta 7 has been completed. As with previous beta updates,
> Visual Studio requires updated tooling, so please grab these:
>
> - DotNetVersionManager-x64.msi
> - WebToolsExtensionsVS14
>
> From here:
> [http://www.microsoft.com/en-us/download/details.aspx?id=48738](http://www.microsoft.com/en-us/download/details.aspx?id=48738)
>
> And don’t forget to update your dnvm stuff (ORDER MATTERS):
>
> 1. dnvm upgrade -arch x64 -r clr
> 2. dnvm upgrade -arch x86 -r clr
>
> And a new step, remove all other betas from your user folder:
>
> `C:\Users\{YOUR PROFILE}\.dnx\runtimes`
>
> The following announcements/issues were relevant to our codebase to some
> degree:
>
> - [Startup Code changes in MVC](https://github.com/aspnet/Announcements/issues/62)
> - [The Kestrel package/namespace has been renamed to Microsoft.AspNet.Server.Kestrel](https://github.com/aspnet/Announcements/issues/53)
> - [IConfiguration API changes and added interfaces](https://github.com/aspnet/Announcements/issues/55)
>   (biggest change is you can no longer use
>   `Configuration.Get("Your:Key:Name")`, instead use the indexer
>   `Configuration["Your:Key:Name"]`
> - [Breaking DNX renames](https://github.com/aspnet/Announcements/issues/51)
>
> And these are just mindful to be aware of:
>
> - [Falling through to IIS now requires opt-in](https://github.com/aspnet/Announcements/issues/54)
> - [dnx now implicitly uses current folder as the appbase](https://github.com/aspnet/Announcements/issues/52)
> - [HTML5 defined elements with URL accepting attributes are now TagHelpers](https://github.com/aspnet/Announcements/issues/57)
>
> There was only one issue during the upgrade process; after doing the usual
> find/replace of `-beta6` to `-beta7`, I ran into this issue:
>
> ```bash
> error CS1703: Multiple assemblies with equivalent identity have been
> imported: '<in-memory assembly>' and '<in-memory assembly>'. Remove one of the
> duplicate references.
> ```
>
> As generic of an issue as that appears to be, I had the idea that it had to do
> with some of our packages and dependencies. Since we're currently focusing on
> `DNX451`, I removed all NuGet package references to the `System.*` namespace
> and put them under `frameworkAssemblies`. So, this:
>
> ```json
> {
>  "dependencies": {
>     "AutoMapper": "4.0.4",
>     "MaxMind.GeoIP2": "2.3.1",
>     "Microsoft.Framework.Caching.Memory": "1.0.0-beta7",
>     "Microsoft.Framework.Configuration": "1.0.0-beta7",
>     "Microsoft.Framework.Configuration.EnvironmentVariables": "1.0.0-beta7",
>     "Microsoft.Framework.Configuration.Json": "1.0.0-beta7",
>     "Microsoft.Framework.Configuration.UserSecrets": "1.0.0-beta7",
>     "Microsoft.Framework.Logging": "1.0.0-beta7",
>     "System.Data.SqlClient": "4.0.0-beta-22816",
>     "System.Diagnostics.TraceSource": "4.0.0-beta-22816",
>     "System.Text.RegularExpressions": "4.0.10-beta-22816",
>     "System.Threading.Tasks": "4.0.10-beta-22816",
>     "WindowsAzure.Storage": "5.0.2",
>     "Microsoft.Framework.Caching.Memory": "1.0.0-beta7"
>   },
>   "frameworks": {
>     "dnx451": {
>     }
> }
> ```
>
> Became this:
>
> ```json
> {
>  "dependencies": {
>     "AutoMapper": "4.0.4",
>     "MaxMind.GeoIP2": "2.3.1",
>     "Microsoft.Framework.Caching.Memory": "1.0.0-beta7",
>     "Microsoft.Framework.Configuration": "1.0.0-beta7",
>     "Microsoft.Framework.Configuration.EnvironmentVariables": "1.0.0-beta7",
>     "Microsoft.Framework.Configuration.Json": "1.0.0-beta7",
>     "Microsoft.Framework.Configuration.UserSecrets": "1.0.0-beta7",
>     "Microsoft.Framework.Logging": "1.0.0-beta7",
>     "WindowsAzure.Storage": "5.0.2"
>  },
>  "frameworks": {
>     "dnx451": {
>     "frameworkAssemblies": {
>     "System": "4.0.0.0",
>     "System.Data": "4.0.0.0",
>     "System.Data.Linq": "4.0.0.0",
>     "System.Collections": "4.0.0.0"
>     }
>  }
> }
> ```
>
> So from here forward, be mindful of where your package references get
> auto-added.
>
> Thank you,
>
> \-Brandon
