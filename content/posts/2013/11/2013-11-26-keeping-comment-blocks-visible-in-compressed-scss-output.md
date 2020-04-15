---
coverImageUri: ""
title: "Keeping Comment Blocks Visible in Compressed SCSS Output"
datetime: "2013-11-26T14:00:03.000Z"
categories: "technology"
tags: "css,sass,scss"
---

A real quick Tuesday tip: SCSS gives you the ability to keep a comment even with _style_ set to _compressed_. Great for including a file header, important information, or legalese in a minified file.

To test it out, start watching a file with the _style_ flag set to _compressed_:

```bash
scss --watch style.scss:style.css --style compressed
```

That will give you minified CSS output. Now, following this special comment syntax, add a "loud comment" to your file and watch as the input includes it:

\[css\]/\*! A loud comment \*/\[/css\]

Enjoy!

Tip via [Stack Overflow](http://stackoverflow.com/questions/4893215/using-sass-compressed-output-while-leaving-theme-comment-header-for-wordpress "Stack Overflow | Using Sass compressed output while leaving theme comment header for Wordpress").
