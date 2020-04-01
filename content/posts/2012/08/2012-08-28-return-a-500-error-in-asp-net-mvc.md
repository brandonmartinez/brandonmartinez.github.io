---
id: "4072"
coverImageUri: ""
title: "Return a 500 Error in ASP.NET MVC"
date: "2012-08-28"
datetime: "2012-08-28T22:00:43.000Z"
categories: "technology"
tags: ".net,asp.net,c#,mvc,tips"
---

A good question came up today that I couldn't answer immediately: how do you return a 500 Server Error (or any other [HTTP Status Code](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes "List of HTTP status codes on Wikipedia")) from ASP.NET MVC?

Thankfully, it's extremely simple; all you have to do is return a new [HttpStatusCodeResult](http://msdn.microsoft.com/en-us/library/system.web.mvc.httpstatuscoderesult(v=vs.98) "HttpStatusCodeResult Class on MSDN") with whatever code you'd like:

``` csharp
return new HttpStatusCodeResult(500);
```

"500" can be replaced with whatever [HTTP Status Code](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes "List of HTTP status codes on Wikipedia") you'd like.

Reference: [HttpStatusCodeResult Class on MSDN](http://msdn.microsoft.com/en-us/library/system.web.mvc.httpstatuscoderesult(v=vs.98) "HttpStatusCodeResult Class on MSDN")
