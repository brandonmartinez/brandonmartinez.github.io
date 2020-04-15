---
coverImageUri: ''
title:
  'Resolve a "Requested value VS2015 was not found" Get-AzureWebsite Error in
  PowerShell'
datetime: '2015-07-14T18:25:39.000Z'
categories: 'technology'
tags: 'asp.net,asp.net 5,azure web apps,powershell'
excerpt:
  "A very annoying error that my team has been troubleshooting since yesterday:
  we're making use of the new Visual Studio Online Build.Preview features,
  including the ability to build and deploy an ASP.NET 5 app to an Azure Web
  App. Everything was working fine until yesterday, when we started seeing this
  exception in the build logs:"
---

A very annoying error that my team has been troubleshooting since yesterday:
we're making use of the new Visual Studio Online Build.Preview features,
including the ability to
[build and deploy an ASP.NET 5 app to an Azure Web App](https://msdn.microsoft.com/Library/vs/alm/Build/azure/deploy-aspnet5 'Build and Deploy your ASP.NET 5 Application to an Azure Web App').
Everything was working fine until yesterday, when we started seeing this
exception in the build logs:

```log
2015-07-14T17:50:49.0525634Z Published requested of the following website(s): [REDACTED]

2015-07-14T17:50:49.0533103Z Starting publish of [REDACTED]

2015-07-14T17:52:05.1786996Z ##[error]Requested value VS2015 was not found.

2015-07-14T17:52:05.3696874Z ##[error]Cannot index into a null array
```

At first, we thought the **Requested value VS2015 was not found** was actually
an issue with our build script, but that didn't make sense because were actually
deploying two websites with the **same PowerShell script**; one worked, one
didn't. Digging down to the line that was actually causing an error, I ran this
right in a PowerShell session:

```powershell
Get-AzureWebsite -Name [REDACTED]
```

Guess what? Same error. There was something going on with the actual Azure
Website. After some digging and research, I found that one of our developers
enabled remote debugging:

[![Remote Debugging Enabled with VS2015](http://assets.brandonmartinez.com/brandonmartinez/2015/07/remotedebugging.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/07/remotedebugging.png)

The obvious thing to do was to turn this off and try again. And guess what? Same
error.

As a final attempt, I re-enabled remote debugging, switched it to an older
version of Visual Studio, then turned it off again:

[![Disabled Remote Debugging After Setting it to VS 2013](http://assets.brandonmartinez.com/brandonmartinez/2015/07/remotedebuggingoff2013.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/07/remotedebuggingoff2013.png)

After that, it finally worked! This not only fixed the `Get-AzureWebsite`, but
the publish script in Visual Studio Online.

Here's hoping that this was only a temporary issue; by the time ASP.NET 5 is
RTM, and VSO Preview.Build is no longer preview, this should be gone.
