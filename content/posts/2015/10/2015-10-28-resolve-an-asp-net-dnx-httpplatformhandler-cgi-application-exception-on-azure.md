---
id: '23111'
coverImageUri: ''
title:
  'Resolve an ASP.NET DNX HttpPlatformHandler CGI Application Exception on Azure'
date: '2015-10-28'
datetime: '2015-10-28T18:28:15.000Z'
categories: 'technology'
tags: 'asp.net 5,asp.net dnx,azure web apps'
excerpt:
  'After deploying one of our ASP.NET DNX web applications to Azure, we were
  running into an exception.'
---

After deploying one of our ASP.NET DNX web applications to Azure, we were
running into this exception:

`The specified CGI application encountered an error and the server terminated the process.`

Knowing that the HTTP pipeline changed in beta 8, I looked into the
`HttpPlatformHandler`'s configuration (summarized web.config):

``` xml
<configuration>
    <system.webServer>
        <handlers>
            <add name="httpplatformhandler" path="\*" verb="\*" modules="httpPlatformHandler" resourceType="Unspecified" />
        </handlers>
        <httpPlatform processPath="..\\approot\\web.cmd" arguments="" stdoutLogEnabled="true" stdoutLogFile="..\\logs\\stdout.log" forwardWindowsAuthToken="false" startupTimeLimit="3600"></httpPlatform>
    </system.webServer>
</configuration>
```

Nothing looked out of place. Following the suggestions of others, I attempt to
set the `processPath` to an absolute path (i.e. `%home%\site\approot\web.cmd`),
but that didn't resolve it.

After
[reading through the various issues others had](https://github.com/aspnet/Hosting/issues/364 'aspnet/host | [Announcement] Change to IIS hosting model #364'),
I found that removing the `forwardWindowsAuthToken="false"` attribute completely
resolved the issue.

Apparently this should go away as they roll out changes to the platform handler,
but for now this fixed my issues.
