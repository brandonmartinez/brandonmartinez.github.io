---
coverImageUri: "763"
title: "Shouldn't Commonly Used Services Be Enabled By Default?"
datetime: "2009-11-14T15:58:47.000Z"
categories: "technology"
tags: "asp.net,iis7,windows server 2008"
---

After trying to setup a web service with Internet Information Services 7 on Windows Server 2008, I was running into a wall. I kept receiving the following error message: _HTTP Error 500.21 - Internal Server Error. Handler "ScriptHandlerFactory" has a bad module "ManagedPipelineHandler" in its module list._ [![IIS7: HTTP Error 500.21](http://assets.brandonmartinez.com/brandonmartinez/2009/11/IIS7-Sucks-575x291.png "IIS7: HTTP Error 500.21")](http://assets.brandonmartinez.com/brandonmartinez/2009/11/IIS7-Sucks.png)

At first, this made absolutely no sense. I was using the default _web.config_, and it was a relatively simple web service (one method). After tons of frustration, and even more Googling, I finally came up with a solution: IIS7 on Windows Server 2008 does **not** have ASP.NET installed by default, so it needs to be installed. This totally blows my mind; why would IIS not have one of the most popular and needed features enabled by default?

There is a funny part of this situation: the server did tell me to check if ASP.NET was installed, which I thought I did; under _Things you can try_ section on the error page it mentions _Install ASP.NET_. I had checked to see if the .NET Framework was installed, but I didn't realize that these were two separate installations; why isn't ASP.NET included in the .NET Framework installation?

Regardless, it was an easy fix. Open up your Server Manager, go to the Web Server Role section, select _Add Role Services_, and enable ASP.NET. After that installs, you're web service _should_ boot right up (assuming you have the rest configured properly).

[![IIS7 and ASP.NET: Make sure these features are installed](http://assets.brandonmartinez.com/brandonmartinez/2009/11/IIS7-and-ASP.NET-575x415.png "IIS7 and ASP.NET: Make sure these features are installed")](http://assets.brandonmartinez.com/brandonmartinez/2009/11/IIS7-and-ASP.NET.png)
