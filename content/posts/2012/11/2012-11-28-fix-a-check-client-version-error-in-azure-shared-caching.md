---
coverImageUri: ""
title: "Fix a \"Check Client Version\" Error in Azure Shared Caching"
datetime: "2012-11-28T00:00:31.000Z"
categories: "technology"
tags: ".net,c#,cloud computing,windows azure"
---

If you're using Windows Server AppFabric caching and have recently updated to version 1.8 of the Windows Azure SDK, you might be running into some difficulty in connecting to the caching instance.

I started receiving this error when trying to access the cache:

> **ErrorCode<ERRCA0019>:SubStatus<ES0001>:Check the client version. It should be within the allowed version range on the server. If necessary, upgrade the client to the allowed version.**

After a **ton** of investigation, the fix was really easy: remove all caching SDK assembly references (_Microsoft.ApplicationServices.\*_) and replace it with the **Windows Azure Shared Caching** NuGet package:

[![](http://assets.brandonmartinez.com/brandonmartinez/2012/11/nugetpackage-575x383.png "Windowz Azure Shared Caching NuGet Package was the Solution")](http://assets.brandonmartinez.com/brandonmartinez/2012/11/nugetpackage.png)

That should clear that error right up.

### Resources and References

While these all didn't pertain to my end solution, these are the various sources that helped shed some light on the issue:

- [StackOverflow: Client Version Error after installing Azure 1.8](http://stackoverflow.com/questions/13592807/client-version-error-after-installing-azure-1-8 "StackOverflow: Client Version Error after installing Azure 1.8")
- [MSDN: Migrate from AppFabric Caching to Windows Azure Caching](http://msdn.microsoft.com/en-us/library/windowsazure/jj835079.aspx "MSDN: Migrate from AppFabric Caching to Windows Azure Caching")
- [MSDN: Migrate from Windows Azure Caching 1.7 (Preview) to Caching (Released) 1.8](http://msdn.microsoft.com/en-us/library/windowsazure/jj651665.aspx "MSDN: Migrate from Windows Azure Caching 1.7 (Preview) to Caching (Released) 1.8")
- [Scott Hanselman's Computer Zen: Installing, Configuring and Using Windows Server AppFabric and the "Velocity" Memory Cache in 10 minutes](http://www.hanselman.com/blog/InstallingConfiguringAndUsingWindowsServerAppFabricAndTheVelocityMemoryCacheIn10Minutes.aspx "Scott Hanselman's Computer Zen: Installing, Configuring and Using Windows Server AppFabric and the Velocity Memory Cache in 10 minutes")
- [Visual Studio Developer Center: AppFabric Cache: getting ErrorCode<ERRCA0016>:SubStatus<ES0001> continuously](http://social.msdn.microsoft.com/Forums/en-US/velocity/thread/975bb18e-3402-4251-bd10-dd084e5f308f "Visual Studio Developer Center: AppFabric Cache: getting ErrorCode<ERRCA0016>:SubStatus<ES0001> continuously")
- [Visual Studio Developer Center: Troubleshooting AppFabric Scaling Issues (Intermittent ErrorCode<ERRCA0017>:SubStatus<ES0006> Errors)](http://social.msdn.microsoft.com/Forums/en-US/velocity/thread/c893dcdb-385c-4856-9a82-9420ea5ff8b9/ "Visual Studio Developer Center: Troubleshooting AppFabric Scaling Issues (Intermittent ErrorCode<ERRCA0017>:SubStatus<ES0006> Errors)")
- [MSDN: How to: Configure a Cache Client Programmatically (Windows Azure Shared Caching)](http://msdn.microsoft.com/en-us/library/windowsazure/gg618003.aspx "MSDN: How to: Configure a Cache Client Programmatically (Windows Azure Shared Caching)")
