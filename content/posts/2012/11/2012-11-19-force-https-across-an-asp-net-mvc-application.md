---
coverImageUri: ""
title: "Force HTTPS Across an ASP.NET MVC Application"
datetime: "2012-11-19T23:00:35.000Z"
categories: "technology"
tags: ".net,c#,mvc"
---

A quick tip if you want to force HTTPS across all of your MVC actions: register the _RequireHttpsAttribute_ in your global filters.

Global.asax: ``` csharp
public static void RegisterGlobalFilters(GlobalFilterCollection filters) { filters.Add(new RequireHttpsAttribute()); }
```

If you don't want the redirect to occur in debug mode, you can surround that with an _#if !DEBUG_ block.

Global.asax: ``` csharp
public static void RegisterGlobalFilters(GlobalFilterCollection filters) { #if !DEBUG filters.Add(new RequireHttpsAttribute()); #endif }
```
