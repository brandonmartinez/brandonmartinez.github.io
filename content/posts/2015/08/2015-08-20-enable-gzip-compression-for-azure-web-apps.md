---
id: '21681'
coverImageUri: ''
title: 'Enable GZIP Compression for Azure Web Apps'
date: '2015-08-20'
datetime: '2015-08-20T13:46:39.000Z'
categories: 'technology'
tags: 'azure web apps,azure websites,gzip,iis,microsoft azure'
excerpt:
  'A recent addition to Azure Web Apps is the ability to customize the GZIP
  compression process.'
---

A recent addition to Azure Web Apps is the ability to customize the GZIP
compression process. To enable compression for both static and dynamic content,
add the following your your **system.webServer** section in your web.config:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <urlCompression doStaticCompression="true" doDynamicCompression="true" />
    <httpCompression>
      <dynamicTypes>
        <clear />
        <add enabled="true" mimeType="text/*"/>
        <add enabled="true" mimeType="message/*"/>
        <add enabled="true" mimeType="application/x-javascript"/>
        <add enabled="true" mimeType="application/javascript"/>
        <add enabled="true" mimeType="application/json"/>
        <add enabled="false" mimeType="*/*"/>
        <add enabled="true" mimeType="application/atom+xml"/>
        <add enabled="true" mimeType="application/atom+xml;charset=utf-8"/>
      </dynamicTypes>
      <staticTypes>
        <clear />
        <add enabled="true" mimeType="text/*"/>
        <add enabled="true" mimeType="message/*"/>
        <add enabled="true" mimeType="application/javascript"/>
        <add enabled="true" mimeType="application/atom+xml"/>
        <add enabled="true" mimeType="application/xaml+xml"/>
        <add enabled="true" mimeType="application/json"/>
        <add enabled="false" mimeType="*/*"/>
      </staticTypes>
    </httpCompression>
  </system.webServer>
</configuration>
```

This does work for ASP.NET 5 and MVC 6, as well, since this is configuring IIS,
not the application stack.

References:

- [httpCompression settings on a simple Azure Website | Microsoft Azure Support](https://social.msdn.microsoft.com/Forums/azure/en-US/890b6d25-f7dd-4272-8970-da7798bcf25d/httpcompression-settings-on-a-simple-azure-website?forum=windowsazurewebsitespreview 'httpCompression settings on a simple Azure Website | Microsoft Azure Support')
- [Enabling GZIP compression for your Azure website (IIS) | ThinkScopes](http://www.thinkscopes.com/2015/03/enabling-gzip-compression-for-your-azure-website-iis/ 'Enabling GZIP compression for your Azure website (IIS) | ThinkScopes')
