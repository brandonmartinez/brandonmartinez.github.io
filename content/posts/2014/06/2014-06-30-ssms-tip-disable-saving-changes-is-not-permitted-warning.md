---
coverImageUri: ""
title: "SSMS Tip: Disable \"Saving Changes is Not Permitted\" Warning"
datetime: "2014-06-30T16:00:50.000Z"
categories: "technology"
tags: "sql server,ssms"
---

If you've ever experienced the dreaded _Saving changes is not permitted_ dialog in SQL Management Studio, this tip is for you.

[![01-SaveNotPermitted](http://assets.brandonmartinez.com/brandonmartinez/2014/06/01-SaveNotPermitted.png)](http://assets.brandonmartinez.com/brandonmartinez/2014/06/01-SaveNotPermitted.png)

To disable the message, open the _Tools -> Options_ menu and navigate to _Designers -> Table and Database Designers_:

[![02-UncheckPreventSaving](http://assets.brandonmartinez.com/brandonmartinez/2014/06/02-UncheckPreventSaving.png)](http://assets.brandonmartinez.com/brandonmartinez/2014/06/02-UncheckPreventSaving.png)

From there **uncheck** the _Prevent saving changes that require table re-creation_ checkbox. Hit the _OK_ button and you'll be all set.

While this change might not be recommended if you're in a production environment, it's great to get rid of this block when you're developing and designing your databases.
