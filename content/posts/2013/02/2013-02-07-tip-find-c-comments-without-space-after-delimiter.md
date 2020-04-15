---
coverImageUri: ""
title: "Tip: Find C# Comments Without Space After Delimiter"
datetime: "2013-02-07T22:30:38.000Z"
categories: "technology"
tags: ".net,c#,regex,tips"
---

After conducting a [Twitter mini-poll](https://twitter.com/brandonmartinez/status/299512194192793601 "Twitter / brandonmartinez"), I found that most of my followers agree with me on at least one point: code comments should have a space between the delimiter and the text.

You can perform a RegEx search in Visual Studio to find all instances of comments without the trailing space:

[![TrailingSpaceRegEx](http://assets.brandonmartinez.com/brandonmartinez/2013/02/TrailingSpaceRegEx.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/02/TrailingSpaceRegEx.png)

The RegEx is as follows:

```bash
\\s\*(?<!\["':\])//(?!\[\\s/\\-\\\*\])
```

Performing the replace with "**$0 **" (notice the trailing space), appends the trailing space while leaving any other formatting (e.g. indents) in place.

Anything with these formats **will** be replaced:

``` csharp
//Give Me Some Space! //More Space Please var shouldGiveSpace = true; //I'll Back Off ///////////////Break It Up, Man
```

Anything with these formats **will not** be replaced:

``` csharp
// Already got some space, thanks // Spaced Out, I'm Good var shouldGiveSpace = false; // I'm all set, thank you var webAddress = @"http://dontaddspacesimawebaddress.com/"; var literalText = "//Literally, no need for spaces.";
```

\[html\]<a href="//coolhttporhttpsurlformat"></a> <a href='//coolhttporhttpsurlformat'></a>\[/html\]

There are still issues, however. The following example doesn't work as expected:

``` csharp
var literalText = "This gets matched //but it shouldn't.";
```

Also, this RegEx is designed to work mainly with C# files; no other languages were considered.

If anyone would like to offer critiques or suggestions, feel free!
