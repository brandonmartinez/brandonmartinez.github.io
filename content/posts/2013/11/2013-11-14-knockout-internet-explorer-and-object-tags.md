---
id: "11685"
coverImageUri: ""
title: "Knockout, Internet Explorer, and Object Tags"
date: "2013-11-14"
datetime: "2013-11-14T23:00:43.000Z"
categories: "technology"
tags: "html,html5,internet explorer,javascript,knockout.js"
---

Today I ran into an interesting problem. I was dynamically changing an object tag's source (the _data_ attribute) to load a different Flash file based on a user's selection. This was working beautifully in Chrome; however, in Internet Explorer it would load initially, but would never change with a user's new selection. Apparently, the _data_ attribute cannot be changed after it's been initially set.

Here is a sample of the code I had directly in the HTML:

\[html\]<div class="container"> <object type="application/x-shockwave-flash" data="" data-bind="attr: { data: DataUrl }" codebase="http://active.macromedia.com/flash4/cabs/swflash.cab#version=4,0,0,0"> <param name="movie" data-bind="attr: { value: DataUrl }" /> <param name="allowfullscreen" value="true" /> <param name="wmode" value="transparent" /> <embed data-bind="attr: { src: DataUrl }" type="application/x-shockwave-plugin" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1\_Prod\_Version=ShockwaveFlash"> </embed> </object> </div>\[/html\]

As I mentioned, in Chrome changing the value of **DataUrl** on my [Knockout.js](http://knockoutjs.com/ "Knockout.js") ViewModel worked perfectly. The plugin would render with the new URL and continue onward. In IE, however, it would switch to a blank, empty container.

After some investigation, it appeared that if you removed the _object_ tag from the DOM, and reinserted it, it would work fine. To get around this, I put the _object_ into a named template, then rendered it. Chrome, worked. Internet Explorer, fixed!

\[html\]<script type="text/html" id="my-plugin"> <object type="application/x-shockwave-flash" data="" data-bind="attr: { data: url }" codebase="http://active.macromedia.com/flash4/cabs/swflash.cab#version=4,0,0,0"> <param name="movie" data-bind="attr: { value: url }" /> <param name="allowfullscreen" value="true" /> <param name="wmode" value="transparent" /> <embed data-bind="attr: { src: url }" type="application/x-shockwave-plugin" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1\_Prod\_Version=ShockwaveFlash"> </embed> </object> </script>

<div class="container" data-bind="template: { name: 'my-plugin', data: DataUrl, as: 'url' }"></div>\[/html\]

That causes Knockout to regenerate the entire DOM block, fitting Internet Explorer's requirement of a new _object_.

The solution wasn't terrible to implement, it was just a major head-scratcher; it's also interesting because I can't find any documentation validating this "functionality" in IE. If you have a reference, please let me know.
