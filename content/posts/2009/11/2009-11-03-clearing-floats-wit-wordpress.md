---
id: "554"
coverImageUri: ""
title: "Clearing Floats With WordPress"
date: "2009-11-03"
datetime: "2009-11-03T13:34:11.000Z"
categories: "technology"
tags: "css,functions,html,php,programming,wordpress"
---

Using a "float" in a web design is fairly common these days; it is used to float images for wrapping text, as well as being one of the easier, standard-compliant methods to achieve columns. For example, if you want to have a _content_ column, with a _sidebar_ column floating to the right, you would probably have something similar to this (example after the jump):

### HTML

\[html\]<div id="container"> <div id="content"> Some content </div> <div id="sidebar"> Some navigation </div> </div>\[/html\]

### CSS

\[css\]#container { margin: 0 auto; width: 960px; }

#content { width: 615px; margin-right: 15px; float: left; }

#sidebar { width: 330px; float: left; }\[/css\]

However, there is a common problem with using floats across almost any browser: if the containing _<div>_ tag does not have an element inside with a _clear: both;_ attribute set, _<div>s_ later in the page will run into that container. To avoid this, you create a special "clearing" _<div>_.

### HTML

\[html\]<div class="clearboth">&nbsp;</div>\[/html\]

### CSS

\[css\].clearboth { height: 0; clear: both; margin: 0; padding: 0; }\[/css\]

Just insert the  _<div>_  at the bottom of the _container_, just before its closing tag (line 8):

**HTML**

\[html\]<div id="container"> <div id="content"> Some content </div> <div id="sidebar"> Some navigation </div> <div class="clearboth">&nbsp;</div> </div>\[/html\]

This works perfectly, as the surrounding _container <div> properly encapsulates the two children <div>s._

There is still one problem, though. That can be a lot to type, and often hard to remember (I can never remember whether I use a "clear" class or "clearboth"). To avoid this problem, I created a WordPress function that I can use in any template. To use it, insert the following code at the bottom of your functions.php file in your theme:

### PHP

```php
<?php function clearboth() { ?> <div class="clearboth"> </div> <?php } ?>
```

After that, just insert the following tag into your templates whenever you need to clear a div:

### HTML

\[html\]<div id="container"> <div id="content"> Some content </div> <div id="sidebar"> Some navigation </div> <?php clearboth(); ?> </div>\[/html\]

It's a little less to type, but it also keeps you consistent in the formatting of your _clear_ . If you wanted to, you could even make the function name shorter, _e.g. cb_.
