---
coverImageUri: "15191"
title: "GRDevDay Presentation Recap: From Callback Hell to the JavaScript \"Promise\" Land"
datetime: "2014-03-22T19:30:16.000Z"
categories: "technology"
tags: "javascript,javascript promises,presentations,promises/a+,q.js"
---

If you had the opportunity to attend my presentation at the [2014 GRDevDay](http://grdevday.org/), thank you for coming out to see me. You'll find the abstract, presentation, and additional resources in this post.

[![20140322-163904.jpg](http://assets.brandonmartinez.com/brandonmartinez/2014/03/20140322-163904.jpg)](http://assets.brandonmartinez.com/brandonmartinez/2014/03/20140322-163904.jpg)

Photo by [@MSFTW](http://www.twitter.com/MSFTW)

## Abstract

We’ve all been there: buried 15 layers deep in JavaScript functions wondering where in the Callback Hell we are. How did we get here? Handling asynchronous code forces us to build an unmanageable stack of function calls, often leaving us buried beneath them. Is there a better way to handle this? Luckily, there is; I promise.

JavaScript promises give us an elegant way to handle asynchronous code. Through the power of its “then” method, we’re able to chain, instead of stack, our logic together. We’ll dive into the core of promises, as well as how to break apart common Callback Hell scenarios into beautiful method chains that’d make the most experienced developer shed a tear.

## Presentation

<iframe src="http://martinezmediademos.azurewebsites.net/Presentations/From-Callback-Hell-to-the-JavaScript-Promise-Land/slides/#/" height="402" width="604"></iframe>

[Open presentation in a new window.](http://martinezmediademos.azurewebsites.net/Presentations/From-Callback-Hell-to-the-JavaScript-Promise-Land/slides/#/)

## Source Code

Source for the demo application as well as the presentation can be found on GitHub: [Martinez Media Demos on GitHub](https://github.com/brandonmartinez/MartinezMediaDemos).

The presentation is located under [MartinezMediaDemos / MartinezMediaDemos / Presentations / From-Callback-Hell-to-the-JavaScript-Promise-Land /](https://github.com/brandonmartinez/MartinezMediaDemos/tree/master/MartinezMediaDemos/Presentations/From-Callback-Hell-to-the-JavaScript-Promise-Land) .

## Additional Reading Material

- [JavaScript Promises on HTML5 Rocks (Highly Recommended)](http://www.html5rocks.com/en/tutorials/es6/promises/)
- [Promises/A+ Specification on GitHub](https://github.com/promises-aplus/promises-spec)
- [Upcoming Promises/B Specification](http://wiki.commonjs.org/wiki/Promises/B)
- [Q Documentation](http://documentup.com/kriskowal/q/)
- [http://callbackhell.com/](http://callbackhell.com/)

## Libraries

- [Q](https://github.com/kriskowal/q ""Q")
- [when](https://github.com/cujojs/when "when on GitHub")
- [RSVP.js](https://github.com/tildeio/rsvp.js "RSVP on GitHub")
- [WinJS.Promise](http://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx "WinJS.Promise object on MSDN")
- [ES6 Promises Polyfill](https://github.com/jakearchibald/es6-promise#readme "ES6 Promises Polyfill")
