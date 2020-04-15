---
coverImageUri: "1475"
title: "<WBR>: A Useful, but Little-Known, HTML Tag"
datetime: "2010-03-25T04:00:26.000Z"
categories: "technology"
tags: "html,tags,tips,wbr"
---

A little-known HTML tag can save a lot of headache when it comes to displaying file-paths, lines of code, or other long lines of text: <WBR>.

As I was working on my [last post](https://www.brandonmartinez.com/2010/03/24/spree-tip-adjust-permissions-for-extended-controllers/), I was running into a problem with the word wrap:

[![](http://assets.brandonmartinez.com/brandonmartinez/2010/03/wordwrap-problem-575x191.png "Word Wrap Problem: The filename was causing a problem with the wrap")](http://assets.brandonmartinez.com/brandonmartinez/2010/03/wordwrap-problem.png)

The problem was stemming from this line:

\[html\]<em>/vender/extensions/{extension}/config/spree\_permissions.yml</em>\[/html\]

To fix this, it was a matter of inserting the _<wbr>_ tag into a few spots:

\[html\]<em>/vender/extensions<wbr />/{extension}/<wbr />config/spree\_permissions.yml</em>\[/html\]

After that, the word wrap was fixed:

[![](http://assets.brandonmartinez.com/brandonmartinez/2010/03/wordwrap-fix-575x191.png "Word Wrap Problem: Fixed!")](http://assets.brandonmartinez.com/brandonmartinez/2010/03/wordwrap-fix.png)

What does the _<wbr>_ tag actually do? Basically, it lets the browser know that a line break _can_ be inserted there if needed. In my example, I put the _<wbr>_ tag in two spots, but the browser only used one of them. This is very useful for long lines of code, where punctuation is part of the word and no spaces are used to break up the text. It is also very useful for file paths, as in my example.
