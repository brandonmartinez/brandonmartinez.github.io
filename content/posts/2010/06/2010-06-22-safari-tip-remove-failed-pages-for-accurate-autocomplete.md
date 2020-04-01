---
id: "1783"
coverImageUri: ""
title: "Safari Tip: Remove Failed Pages for Accurate Autocomplete"
date: "2010-06-22"
datetime: "2010-06-22T23:00:26.000Z"
categories: "technology"
tags: "browsers,safari,tips"
---

When I'm going to check my email or Facebook, I tend to type a little too fast in the address bar. Often I'll type http://gma or http://faceb and hit return too fast. This can cause a lot of issues in Safari (or any other browser, I would assume), because it keeps these incorrect (and non-existant) pages in its history (my ISP is a [DNS-hijacker](http://en.wikipedia.org/wiki/DNS_hijacking)). Now if I go to type the first part of the domain (e.g. http://gma) to have the browser autocomplete the address, the browser won't because of that mistyped entry.

Thankfully, it's a very easy fix. View all of your history in Safari (History -> Show All History, or CMD + OPTION + 2), and do a search for "Failed to Open Page" (or whatever your ISP provides for the title of hijacked pages). Scan over the found items (in the event that something else slipped through), select all, then delete. Now start typing that address again, and the correct autocomplete should appear. Done!

_This really isn't the fault of Safari, but more of the fault of my ISP (Charter). DNS Hijacking is just bad practice, as the browser can't determine if a page actually exists or not (since the ISP returns an actual site). My recommendation is to use a better DNS service, such as [OpenDNS](http://www.opendns.com/) or [Google's DNS](http://code.google.com/speed/public-dns/) servers. Your mileage may vary, however._
