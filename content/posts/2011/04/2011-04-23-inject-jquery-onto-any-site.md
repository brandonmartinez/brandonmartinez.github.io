---
coverImageUri: ""
title: "Inject jQuery Onto Any Site"
datetime: "2011-04-23T06:23:25.000Z"
categories: "technology"
tags: "bookmarklet,chrome,javascript,jquery,web development"
---

Not too long ago, one of my co-workers and I had quite an interesting problem: we needed to check every checkbox on a web form that had **hundreds** of checkboxes\[footnote\]1\[/footnote\]. If there had only been a few, we'd just go through and manually check each one; however, because of the sheer quantity and the time needed to actually check each box, we needed to find a faster way to get the job done.

We decided to use jQuery's excellent selecting capabilities to check all of the boxes on the current page; however, there was one major problem with this solution: jQuery was not available on the page.

After some creative thinking (and quite a bit of Googling), we came up with a solution to get jQuery on the page. We would attempt to add the library onto the page ourselves, then use it from there.

Using Chrome\[footnote\]2\[/footnote\], we opened up a console session via the web inspector and typed this:

\[jscript\]var element1 = document.createElement("script"); element1.src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"; element1.type="text/javascript"; document.getElementsByTagName("head")\[0\].appendChild(element1);\[/jscript\]

I would recommend typing it in as one line (seems to work better that way):

\[jscript\]var element1 = document.createElement("script");element1.src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";element1.type="text/javascript";document.getElementsByTagName("head")\[0\].appendChild(element1);\[/jscript\]

What's happening here? Basically, we're creating a new script element via the DOM and injecting a reference to Google's hosted jQuery library into the _head_ tag. Once that line is executed, you can access jQuery via the standard _$_ symbol. So, for our given situation, we just had to do this in the console:

\[jscript\]$(':checkbox').attr('checked', true);\[/jscript\]

After that, all of our checkboxes were checked! Easy enough.

\[update\]Per [Obishawn's](#dsq-comment-body-191022060) suggested, I've created a bookmarklet for this.\[/update\]

Drag this link to your bookmark bar to use on any page: [Inject jQuery Onto This Page](javascript:var element1=document.createElement("script");element1.src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js";element1.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(element1);)

Inspiration via: [Load JavaScript after pageload](http://www.tutkiun.com/2010/07/load-javascript-after-pageload.html).

\[footnote name="1"\]Why **hundreds** of checkboxes, you may ask. We had to mass update several products in one of our legacy systems. A large array of checkboxes was the only and easiest way to do the update.\[/footnote\] \[footnote name="2"\]Any browser that supports the WebKit Web Inspector or something similar, such as Firebug for Firefox, can do this.\[/footnote\]
