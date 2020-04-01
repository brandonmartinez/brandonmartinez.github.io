---
id: "11208"
coverImageUri: ""
title: "Resolve NetworkService Account Not GZIPing IIS Responses"
date: "2013-06-17"
datetime: "2013-06-17T16:30:15.000Z"
categories: "technology"
tags: "asp.net,compression,gzip,iis"
---

After following [many](http://bmtn.us/12DAG6k "Enabling dynamic compression (gzip, deflate) for WCF Data Feeds, OData and other custom services in IIS7") [posts](http://bmtn.us/12DAPGU "How do I compress a Json result from ASP.NET MVC with IIS 7.5") and [tutorials](http://bmtn.us/12DB194 "Configuring IIS 7.5 to send JSON responses gzipped, NO_MATCHING_CONTENT_TYPE") on properly setting up IIS dynamic compression for JSON responses, I was still reaching a dead end. For whatever reason, my responses were still uncompressed. Apparently, using the _NetworkService_ account doesn't always play nicely with static or dynamic content compression.

The _NetworkService_ account doesn't have permission to the _IIS Temporary Compressed Files_ folder, preventing it from writing and reading out compressed streams. The easiest way to get around this is by adding the _NetworkService_ account to the _IIS\_IUSRS_ group (which already has permissions to the IIS temporary folder).

1. Open the _Local Users and Groups_ management console  
    [![01-LocalUsersAndGroups](http://assets.brandonmartinez.com/brandonmartinez/2013/06/01-LocalUsersAndGroups-575x345.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/06/01-LocalUsersAndGroups.png)
2. Choose _Groups_ from the sidebar  
    [![02-Groups](http://assets.brandonmartinez.com/brandonmartinez/2013/06/02-Groups-575x344.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/06/02-Groups.png)
3. Open the _IIS\_IUSRS_ property window  
    [![03-IIS_IUSRS](http://assets.brandonmartinez.com/brandonmartinez/2013/06/03-IIS_IUSRS-575x347.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/06/03-IIS_IUSRS.png)
4. Click Add, then enter _Network Service_ as the user. Be sure to have your local workstation as the location, then check _Check Names_ to be sure you entered everything correctly. Click OK.  
    [![04-NetworkService](http://assets.brandonmartinez.com/brandonmartinez/2013/06/04-NetworkService-575x344.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/06/04-NetworkService.png)
5. Click OK on the _IIS\_IUSRS_ property window.  
    [![05-UserAdded](http://assets.brandonmartinez.com/brandonmartinez/2013/06/05-UserAdded-575x345.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/06/05-UserAdded.png)
6. Close the _Local Users and Groups_ management console
7. Restart IIS
8. Dynamic compression should be working.
