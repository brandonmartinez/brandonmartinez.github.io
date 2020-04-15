---
coverImageUri: 'http://assets.martinezmedia.net/brandonmartinez/2015/03/small-blog-big-cloud-featured.jpg'
title: 'Taking a Small Blog to the Big Cloud: WordPress on Azure'
datetime: '2015-03-21T19:30:33.000Z'
categories: 'technology'
tags: 'brandon on tech,microsoft azure,presentations,wordpress'
excerpt:
  "Microsoft Azure isn't just an amazing platform for ASP.NET, it's also an
  excellent platform for hosting the world's most popular blogging engine:
  WordPress. With WordPress powering 19% of the web and Microsoft Azure adding
  more services at amazing price points, it's a no-brainer to combine the two.
  Leave your traditional shared webhost behind and look to the cloud."
---

Microsoft Azure isn't just an amazing platform for ASP.NET, it's also an
excellent platform for hosting the world's most popular blogging engine:
WordPress. With WordPress powering 19% of the web and Microsoft Azure adding
more services at amazing price points, it's a no-brainer to combine the two.
Leave your traditional shared webhost behind and look to the cloud.

In this video, we'll walk through creating a new, git-driven WordPress
installation running as a Microsoft Azure Website. We'll also tie into other
cloud services, such as Azure Block Blob Storage for storing media, SendGrid for
sending emails, and ClearDB for our database. You'll be ready to launch to the
cloud in no time!

<iframe width="560" height="315" src="https://www.youtube.com/embed/H_cjx-aT5iI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Update: With
[this week's Azure announcements](https://weblogs.asp.net/scottgu/announcing-the-new-azure-app-service),
some things are slightly different from what's presented in the video. Main
examples: _websites_ are now _web apps_, WordPress is now a template you have to
search for, _Web Hosting Plans_ are now called _App Service Plans_.

## Resources from the Video

### WordPress Plugins

- [Windows Azure Storage](https://wordpress.org/plugins/windows-azure-storage/)
- [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/)
- [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/) _(not featured,
  but recommended)_

### wp-config.php snippets

```php
define('WP_DEBUG', false);

// Caching Configuration
define('WP_CACHE', true);
define('WPCACHEHOME', dirname(__FILE__) . '/wp-content/plugins/wp-super-cache/' );

// Memory Config
define('WP_MEMORY_LIMIT', '1024M');
```

### web.config

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="Proxy" stopProcessing="true">
                    <match url="^proxy/?(.*)" />
                    <action type="Rewrite" url="http://az736103.vo.msecnd.net/{R:1}" />
                </rule>
                <rule name="WP Super Cache" stopProcessing="true">
                    <match url="^(\d{4})/(\d{2})/(.+?)/?$" ignoreCase="false" />
                    <conditions>
                        <add input="{REQUEST_METHOD}" negate="true" pattern="POST" ignoreCase="false" />
                        <add input="{QUERY_STRING}" negate="true" pattern=".*=.*" ignoreCase="false" />
                        <add input="{QUERY_STRING}" negate="true" pattern=".*attachment_id=.*" ignoreCase="false" />
                        <add input="{HTTP_COOKIE}" negate="true" pattern="^.*(comment_author_|wordpress|wp-postpass_).*$" ignoreCase="false" />
                        <add input="{DOCUMENT_ROOT}\wp-content\cache\supercache\{HTTP_HOST}\{R:1}\{R:2}\{R:3}\index.html" matchType="IsFile" />
                    </conditions>
                    <!-- Normal SuperCache Behavior -->
                    <!-- <action type="Rewrite" url="wp-content/cache/supercache/{HTTP_HOST}/{R:1}/{R:2}/{R:3}/index.html" /> -->
                    <!-- Use Azure CDN in combination -->
                    <action type="Rewrite" url="http://az736103.vo.msecnd.net/site/wwwroot/wp-content/cache/supercache/{HTTP_HOST}/{R:1}/{R:2}/{R:3}/index.html" />
                </rule>
                <rule name="WordPress Rule 1" stopProcessing="true">
                    <match url="^index\.php$" ignoreCase="false" />
                    <action type="None" />
                </rule>
                <rule name="WordPress Rule 2" stopProcessing="true">
                    <match url="^([_0-9a-zA-Z-]+/)?files/(.+)" ignoreCase="false" />
                    <action type="Rewrite" url="wp-includes/ms-files.php?file={R:2}" appendQueryString="false" />
                </rule>
                <rule name="WordPress Rule 3" stopProcessing="true">
                    <match url="^([_0-9a-zA-Z-]+/)?wp-admin$" ignoreCase="false" />
                    <action type="Redirect" url="{R:1}wp-admin/" redirectType="Permanent" />
                </rule>
                <rule name="WordPress Rule 4" stopProcessing="true">
                    <match url="^" ignoreCase="false" />
                    <conditions logicalGrouping="MatchAny">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" ignoreCase="false" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" ignoreCase="false" />
                    </conditions>
                    <action type="None" />
                </rule>
                <rule name="WordPress Rule 5" stopProcessing="true">
                    <match url="(^[_0-9a-zA-Z-]+/)?(wp-(content|admin|includes).*)" ignoreCase="false" />
                    <action type="Rewrite" url="{R:2}" />
                </rule>
                <rule name="WordPress Rule 6" stopProcessing="true">
                    <match url="^([_0-9a-zA-Z-]+/)?(.*\.php)$" ignoreCase="false" />
                    <action type="Rewrite" url="{R:2}" />
                </rule>
                <rule name="WordPress Rule 7" stopProcessing="true">
                    <match url="." ignoreCase="false" />
                    <action type="Rewrite" url="index.php" />
                </rule>
            </rules>
        </rewrite>
        <staticContent>
            <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />
            <mimeMap fileExtension=".otf" mimeType="application/font-otf" />
            <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
        </staticContent>
    </system.webServer>
</configuration>
```

### applicationHost.xdt

```xml
<?xml version="1.0"?>  
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">  
    <system.webServer>  
        <proxy xdt:Transform="InsertIfMissing" enabled="true" preserveHostHeader="false" reverseRewriteHostInResponseHeaders="false" />  
    </system.webServer>  
</configuration>
```

### .user.ini

```bash
; http://www.windowsazure.com/en-us/develop/php/common-tasks/configure-php-web-site/
 
; Changing the default upload size
memory_limit = 1024M
upload_max_filesize = 32M
post_max_size = 64M
max_execution_time = 1200
default_socket_timeout = 600
```

_Featured photo credit:
[clouds by Pattys-photos](http://www.flickr.com/photos/34121831@N00/6027569462/in/photolist-dmjSdA-p7JuMr-9hYBcr-4PVqwm-9zbjDz-5dCJiB-5p9nh3-6EkSKG-j4zTM-abCSpq-6EgGEF-mcWW3-4nXfwv-4o2qJ5-58Tkmt-9RqBfq-abA2T4-6EkzCQ-4nXkbg-6fTmk7)_
