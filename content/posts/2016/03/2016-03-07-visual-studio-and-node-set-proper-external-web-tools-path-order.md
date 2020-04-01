---
id: '23571'
coverImageUri: ''
title: 'Visual Studio and Node - Set Proper External Web Tools Path Order'
date: '2016-03-07'
datetime: '2016-03-07T14:49:47.000Z'
categories: 'technology'
tags: 'asp.net 5,asp.net core,libsass,node,visual studio'
excerpt:
  "A problem that my team has been running into on-and-off since working with
  ASP.NET Core is having a local install of our node toolchain fighting with
  Visual Studio's built-in version of node. Luckily, my coworker discovered the
  source of the issue (thanks, Pete!)."
---

A problem that my team has been running into on-and-off since working with
ASP.NET Core is having a local install of our node toolchain fighting with
Visual Studio's built-in version of node. Luckily, my coworker discovered the
source of the issue (thanks, Pete!).

In Visual Studio, there is an option for external web tool lookup paths. By
default, they look like this:

[![Visual Studio External Web Tool Paths: Default](http://assets.brandonmartinez.com/brandonmartinez/2016/03/vs-external-web-tools-order-old.png)](http://assets.brandonmartinez.com/brandonmartinez/2016/03/vs-external-web-tools-order-old.png)

By changing the order and giving our `$(PATH)` precedence over Visual Studio's
built-in tools, we can ensure that our standard node toolchain gets used before
the built-in Visual Studio toolchain (which has a much older version of node and
other utilities). Our recommendation is to have the `$(PATH)` second in order:

[![Visual Studio External Web Tool Paths: Revised](http://assets.brandonmartinez.com/brandonmartinez/2016/03/vs-external-web-tools-order-new.png)](http://assets.brandonmartinez.com/brandonmartinez/2016/03/vs-external-web-tools-order-new.png)

This appears to have resolved our issue (ours was specifically around `libsass`
bindings, since Visual Studio used a different architecture).
