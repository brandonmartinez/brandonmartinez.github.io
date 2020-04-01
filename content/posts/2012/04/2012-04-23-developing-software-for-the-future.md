---
id: "3978"
coverImageUri: ""
title: "Developing Software for the Future"
date: "2012-04-23"
datetime: "2012-04-23T12:00:21.000Z"
categories: "technology"
tags: ".net,programming,software design"
---

_This is a response to [Jim Cloudman's recent post](http://jimcloudman.com/post/21557714512/windows-8-russian-roulette-edition " Windows 8: Russian Roulette Edition") regarding the new Windows user environment, Metro._

As software developers, we have one main purpose: to solve problems. To accomplish this, we have a vast array of technology, languages, tools, platforms, frameworks, and everything in-between. In this golden-age of development, we are extremely lucky to have so many resources available to us.

However, numerous technologies and tools come at a price: obsolescence and incompatibility. For example, in Jim's post, he mentions Microsoft's push for developers to use the new [Metro UI](http://en.wikipedia.org/wiki/Windows_8#Metro_UI "Windows 8 on Wikipedia: Metro UI"): it's a completely new way to develop Windows applications, based on Windows Phone 7's UI and relying heavily on web technology (HTML, JavaScript, CSS). Jim's fear, however, is how is a developer supposed to choose which route to go?

Microsoft is well known for starting a project, working at it for a few revisions, scrapping the project to start over, and then saying "alright, we finally have it this time" (e.g. [Windows Workflow Foundation](http://en.wikipedia.org/wiki/Windows_Workflow_Foundation "Windows Workflow Foundation on Wikipedia")), or developing one technology, that then spawns a few other technologies, and deprecating the original (e.g. [LINQ-to-SQL vs. the Entity Framework](http://www.infoq.com/news/2008/11/DLINQ-Future "Is LINQ to SQL Truly Dead? on InfoQ")). How are we to know when to put our faith into a new technology?

The answer is simple: you don't. Our best approach to avoiding the problem, or at least setting up a recovery plan, is by building modular software, or rather, [N-Tier applications](http://en.wikipedia.org/wiki/Multitier_architecture "Multitier Architecture on Wikipedia").

As you can see from the example below, we have an n-tier application that has one core element: the data processing component (or business logic). Almost everything else in this diagram _should_ be interchangeable. For example, data sources could be added or dropped, or different presentation mediums could be added or removed.

[![](http://assets.brandonmartinez.com/brandonmartinez/2012/04/ntier-521x900.png "A Simple Example of an N-Tier application")](http://assets.brandonmartinez.com/brandonmartinez/2012/04/ntier.png)

Building with n-tier in mind allows you to have a software system with swappable and upgradable components. So, for example, if you happen to choose the Metro UI path and a year or so down the road Microsoft says "sorry guys, but we messed up", in theory you only have one (piece of a) layer to worry about.

One of Jim's worries does still stand, however: making the wrong choice still means losing time and money by scrapping the "wrong" technology and replacing it with a different technology. This is true whether you have to replace a UI layer (e.g. Metro vs. Windows Forms) or you have to work with an entirely different datasource (e.g. SQL vs. a web API). However, by strategizing your application's architecture, you can at least save some time in the long run by not having to re-engineer the **entire application**.

Sometimes we get so wrapped-up in the world of changing technology that we forget to step back and take a look at some of the core principles and theories of software development. Once we take that step back and solve our own problems, we can get back to solving the world's.
