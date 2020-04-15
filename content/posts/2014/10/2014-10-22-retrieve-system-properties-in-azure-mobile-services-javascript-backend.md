---
coverImageUri: "17941"
title: "Retrieve System Properties in Azure Mobile Services (JavaScript Backend)"
datetime: "2014-10-22T21:30:17.000Z"
categories: "technology"
tags: "azure mobile services,javascript,windows azure"
---

A currently poorly documented feature in the Azure Mobile Services JavaScript backend is the ability to send along system properties, such as _\_\_createdAt_ and _\_\_updatedAt_, back to the client **by default**. After a few hours of digging through documentation, MSDN blog posts, and Stack Overflow, I've finally found a working solution.

## Custom APIs

In your read methods, supply a **systemProperties** property with an array of fields you want returned:

``` javascript
exports.get = function(request, response) { var myTable = request.service.tables.getTable('MyTable');

myTable.read({ systemProperties: \['\_\_createdAt', '\_\_updatedAt'\], success: function(tableEntries) { // So on and so forth } } }
```

You can also specify that you want all fields:

``` javascript
exports.get = function(request, response) { var myTable = request.service.tables.getTable('MyTable');

myTable.read({ systemProperties: \['\*'\], success: function(tableEntries) { // So on and so forth } } }
```

## Table Scripts

A similar technique can be applied to table scripts. Specify the **systemProperties** property in the _request_'s _execute_ function:

``` javascript
function insert(item, user, request) { request.execute({ systemProperties: \['\_\_createdAt', '\_\_updatedAt'\] }); }
```

Something to keep in mind with tables is that you can add a query parameter to show these properties without changing the JavaScript. For example, you could go to **http://my-ams-site.azure-mobile.net/tables/MyTable?\_\_systemProperties=\*** and it would display all system properties.

## A Helpful Reminder

If you're using the code editor in the Azure Management Portal, be sure to restart your service to see changes applied. I kept forgetting to restart and I wouldn't see the results right away.
