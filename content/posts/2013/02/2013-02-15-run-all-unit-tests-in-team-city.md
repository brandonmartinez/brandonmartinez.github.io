---
id: "11017"
coverImageUri: ""
title: "Run All Unit Tests in Team City"
date: "2013-02-15"
datetime: "2013-02-15T17:30:43.000Z"
categories: "technology"
tags: ".net,teamcity,unit testing"
---

It's the simple things in life that make it enjoyable. One of them being able to configure your build server to automatically include all unit tests when it builds a release.

Until recently, we were manually adding each unit test library that we wanted to run to TeamCity's configuration. Apparently, though, it does support wild cards:

[![Creating a Build Step to Run All Unit Tests](http://assets.brandonmartinez.com/brandonmartinez/2013/02/RunAllUnitTests-575x383.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/02/RunAllUnitTests.png)

Since we follow a standard naming convention for our unit (and integration) tests, it's easy to include **all** of them by putting a wild card filter: **\*\*\\bin\\Release\\\*UnitTest\*.dll**.

Found via [Stack Overflow](http://stackoverflow.com/questions/5646598/how-can-i-run-all-unit-tests-in-team-city-nunit "Stack Overflow: How can I run all Unit Tests in Team City (NUnit)").
