---
coverImageUri: ""
title: "Use Subdirectories Within the ASP.NET bin Folder"
datetime: "2011-07-15T21:00:38.000Z"
categories: "technology"
tags: "asp.net,c#"
---

I ran into a minor issue today: I wanted to create a subdirectory under my ASP.NET web application's _bin_ directory, but none of my ASPX pages could access anything within it.

The fix for this is very easy; update your _web.config_ from this:

``` xml
<runtime> <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"> <probing privatePath="bin;" /> </assemblyBinding> </runtime> 
```

To this (or if you don't have this section at all, add it):

``` xml
<runtime> <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"> <probing privatePath="bin;bin/YOURDIRECTORYNAME" /> </assemblyBinding> </runtime> 
```

You should now be able to access the DLLs in that directory.

_Note: Why did I have to do this? I am developing a third-party extension for an online storefront; I want to keep all of my DLLs and other required assemblies contained to help make updating and shared dependencies easy to deal with. Also, keeping the bin directory tidy is nice, too._
