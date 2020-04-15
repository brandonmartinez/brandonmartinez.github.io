---
coverImageUri: "1458"
title: "Spree Tip: Adjust Permissions for Extended Controllers"
datetime: "2010-03-24T04:00:07.000Z"
categories: "technology"
tags: "e-commerce,programming,ruby on rails,spree"
---

I've been working with [Spree](http://spreecommerce.com/) over the past few weeks for my senior project. So far, I've really enjoyed working with it. For being a below-1.0 software, it is very stable, and very full-featured. Even better, it's very easy to create extensions and integrate them into the e-commerce framework. However, I was running into a permissions issue with an extended controller method.

First, a little bit of background. One thing I've liked about Spree, especially compared to other offerings I was looking at, is how easy it is to modify or append to the existing e-commerce framework. For example, to extend the LineItemsController, all I have to include is this bit of code in my extension's startup file (_variable\_data\_products\_extension.rb_ in this case):

\[ruby\]LineItemsController.class\_eval do def render\_proof li = LineItem.find(params\[:id\]) fields = {}

\[…and so on…\] end end\[/ruby\]

This will extend Spree's LineItemsController to contain my new method (and will fit seamlessly once I add the proper routes).The only problem with this method is that it required a user to be logged in, and to be an administrator. Since this is used to render a proof of a print variable data line item, I don't want the user to be forced to create an account and login (since they aren't required to login while browsing and adding items to their cart).

To fix the problem, create a file in your extension dir, _/vender/extensions/{extension}/config/spree\_permissions.yml_, and put in something similar to this:

\[ruby\]'LineItemsController': permission1: # Users can only see their own orders roles : \[user\] options : except : \[new, create, render\_proof\] unless : can\_access? #orders\_controller may grant access based on presence of token, etc.\[/ruby\]

Restart your web server, make sure you're logged out of your site, and try visiting your method again. You should be able to access it without being logged in, or if you are logged in, without being an administrator.
