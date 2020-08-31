---
coverImageUri: ''
title: 'Resolve an HTTP Error 500.21 in IIS'
datetime: '2014-07-02T21:30:34.000Z'
categories: 'technology'
tags: 'asp.net,iis'
---

If you've setup a new IIS website and app pool and try hosing a .NET
application, you may run into this error: _HTTP Error 500.21 - Internal Server
Error Handler "ExtensionlessUrlHandler-Integrated-4.0" has a bad module
"ManagedPipelineHandler" in its module list_.

[![HTTP Error 500.21 - Internal Server Error Handler ExtensionlessUrlHandler-Integrated-4.0 has a bad module ManagedPipelineHandler in its module list](http://assets.brandonmartinez.com/brandonmartinez/2014/07/01-501_22-Error-1200x692.png)](http://assets.brandonmartinez.com/brandonmartinez/2014/07/01-501_22-Error.png)

Luckily, it's very easy to resolve. Run the follow command from an elevated
command prompt:

```bash
%windir%\\Microsoft.NET\\Framework64\\v4.0.30319\\aspnet\_regiis.exe -i
```

If you're on a 32-bit machine, you may have to use the following:

```bash
%windir%\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet\_regiis.exe -i
```

[![Reinstall ASP.NET in IIS](http://assets.brandonmartinez.com/brandonmartinez/2014/07/02-ASP_NET-Reinstall.png)](http://assets.brandonmartinez.com/brandonmartinez/2014/07/02-ASP_NET-Reinstall.png)

Try reloading your site; you should be set to go!
