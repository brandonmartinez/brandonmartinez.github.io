---
id: '18821'
coverImageUri: 'http://assets.martinezmedia.net/brandonmartinez/2015/03/small-blog-big-cloud-featured.jpg'
title: "Serve WordPress Cache files from Azure's CDN Service"
date: '2015-03-31'
datetime: '2015-03-31T16:00:24.000Z'
categories: 'technology'
tags: 'azure cdn,azure web apps,azure websites,windows azure'
excerpt:
  "If you're running your WordPress site on Microsoft Azure, you may want to
  consider utilizing the CDN service that is available. By using the CDN
  service, you can host your static content such as images, scripts, and other
  theme components from the 31 different point of presence locations provided."
---

If you're running your WordPress site on Microsoft Azure, you may want to
consider utilizing the CDN service that is available. By using the CDN service,
you can host your static content such as images, scripts, and other theme
components from the
[31 different point of presence](https://msdn.microsoft.com/en-us/library/azure/gg680302.aspx)
locations provided.

[![Azure CDN POP locations](http://assets.brandonmartinez.com/brandonmartinez/2015/02/IC767886.png)](https://msdn.microsoft.com/en-us/library/azure/gg680302.aspx)

When you're trying to scale and provide content around the globe, the CDN
provides a cost effective way to send static content to more users.

Before configuring WordPress, a few assumptions are made:

- You're running the latest version of WordPress
- The site is hosted as an Azure Website/web app (shared tier or higher)
- [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/) is installed
  and configured (including a functioning web.config)

## Create an Azure CDN Service

From the old Azure Management Portal:

1. Choose _CDN_ from the left navigation menu.
2. _Create a CDN Endpoint_  
   [![createcdn01](http://assets.brandonmartinez.com/brandonmartinez/2015/02/createcdn01.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/02/createcdn01.png)
3. Choose the web app you want the CDN to mirror:  
   [![createcdn002](http://assets.brandonmartinez.com/brandonmartinez/2015/03/createcdn002.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/03/createcdn002.png)
4. Click into the newly-created CDN service to view more information.  
   [![createcdn003](http://assets.brandonmartinez.com/brandonmartinez/2015/03/createcdn003.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/03/createcdn003.png)
5. Make note of the CDN Endpoint address; we'll be using this to configure our
   proxy service.  
   [![createcdn004](http://assets.brandonmartinez.com/brandonmartinez/2015/03/createcdn004.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/03/createcdn004.png)

[![preloadcache](http://assets.brandonmartinez.com/brandonmartinez/2015/03/preloadcache.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/03/preloadcache.png)

Something to keep in mind: it may take some a few hours for all of your files to
be propagated to the CDN service.

_Note: if you want to optionally map a CNAME to this service so that you could
have an address like **cdn.mydomain.com**, you can do that through this
management portal area. When you set a CNAME, this also can take a few hours to
propagate._

## Configure WP Super Cache

### CDN Rewriting

This is probably the most important part of this tutorial: this is what actually
ties your statically-rendered, cached files to referencing the new Azure CDN for
static content.

1. Open WP Super Cache Settings: Settings -> WP Super Cache
2. Go to the CDN tab
3. Check _Enable CDN Support_
4. _Off-site URL:_ put in your Azure CDN URL that you saved from above
5. _Include directories:_ you can leave this as the default
   ("wp-content,wp-includes"), or as you learn of specific caching areas you can
   expand this
6. _Exclude if substring:_ defaults to just ".php", but feel free to add any
   other extensions that you don't want to serve off the CDN
7. _Additional CNAMES:_ if you'd like to include additional CDN endpoints, or
   just wrap multiple CNAMEs around a single CDN, you can put that configuration
   here
8. Select _Save Changes_

_Note: if you're running a multi-site, especially one that utilizes multiple
domains, you'll need to go to **each** domain's dashboard and configure these
settings._

### Preloading

WP Super Cache needs to be configured for _preload mode_. Preload mode will
cache every published post and page on the site, creating statically-rendered
pages for non-authenticated users. This will give us content to serve through
the CDN.

Doing this is easy; from the WordPress admin dashboard:

1. Open WP Super Cache Settings: Settings -> WP Super Cache
2. Go to the preload tab
3. Check the _Preload mode (garbage collection only on legacy cache files.
   Recommended.)_ option.
4. Optionally check any other settings you wish to include.
5. Choose a preload cache time; anything 30 minutes or longer
6. Click _Update Settings_
7. Click _Preload Cache Now_

### Clear Current Cache

In the event that some cache was generated, you may want to _Delete Cache on All
Blogs_ under the _Contents_ panel.

## Test!

You should be all set; be sure to test your site to verify everything is hitting
your proxy properly. Keep in mind it may take a few hours for all of your site
content to propagate to your proxy; so you may have to flip back to the normal
super cache behavior until the process is completed.

### Additional References

- [Azure Site Extensions](https://github.com/projectkudu/kudu/wiki/Azure-Site-Extensions)
- [Using Azure Web Site as a reverse proxy](http://ruslany.net/2014/05/using-azure-web-site-as-a-reverse-proxy/)
- [10 URL Rewriting Tips and Tricks](http://ruslany.net/2009/04/10-url-rewriting-tips-and-tricks/)
- [Use Azure CDN in Azure App Service](http://azure.microsoft.com/en-us/documentation/articles/cdn-websites-with-cdn/)
