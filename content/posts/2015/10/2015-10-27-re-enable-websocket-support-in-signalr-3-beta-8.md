---
id: '23031'
coverImageUri: ''
title: 'Re-enable WebSocket Support in SignalR 3 Beta 8'
date: '2015-10-27'
datetime: '2015-10-27T14:48:55.000Z'
categories: 'technology'
tags: 'asp.net 5,asp.net dnx,signalr'
excerpt:
  "If you've recently upgraded to the latest ASP.NET 5 Beta 8 Packages, you may
  have noticed SignalR will no longer use WebSockets and default back to long
  polling."
---

If you've recently upgraded to the latest ASP.NET 5 Beta 8 Packages, you may
have noticed SignalR will no longer use WebSockets and default back to long
polling. Due to some changes in how the web server stack is handled,
[mainly through IIS or IIS Express](https://github.com/aspnet/Announcements/issues/69 'aspnet/Announcements | Change to IIS hosting model #69'),
you now have to adjust your middleware pipeline to add websocket support.

First, add the following package to your `project.json` file:
`"Microsoft.AspNet.WebSockets.Server": "1.0.0-beta8"`

Then, in your `Startup.cs` file, add the following to your `Configure` block:
`app.UseWebSockets();`. I put it before my `app.UseMvc()` line.

You should then be able to connect again using WebSockets through SignalR.
