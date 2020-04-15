---
coverImageUri: ""
title: "Install .NET 3.5 on Windows 8"
datetime: "2012-10-01T12:59:47.000Z"
categories: "technology"
tags: ".net,tips,windows,windows 8"
---

If you're having troubles installing .NET 3.5 on to Windows 8, here's a quick tip that may solve your problem.

Make sure your Windows 8 installer disc is in your drive (or mounted/copied somewhere), then from an elevated command prompt run this command:

```bash
dism.exe /online /enable-feature /featurename:NetFX3 /Source:d:\\sources\\sxs /LimitAccess
```

Replace _d:\\_ with the drive/path to your local sources.

Solution via: ["I am unable to install .net 3.5 on windows 8" on Technet Social](http://social.technet.microsoft.com/Forums/en-US/W8ITProPreRel/thread/f4217b5c-4341-4c6a-99be-46a178b34132/#1f4263a3-c528-42c7-b916-bb671db42845)

_As a sidenote, I needed .NET 3.5 for SQL Server 2012._
