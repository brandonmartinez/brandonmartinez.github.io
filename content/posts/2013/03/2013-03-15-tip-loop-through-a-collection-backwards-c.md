---
id: "11054"
coverImageUri: ""
title: "Tip: Loop Through a Collection Backwards [C#]"
date: "2013-03-15"
datetime: "2013-03-15T16:30:50.000Z"
categories: "technology"
tags: "c#"
---

There are times where it's beneficial to iterate through a collection backwards; e.g. processing and removing records from a set. While this technique is nothing groundbreaking, I thought I'd share this cool shorthand for the backwards iteration:

``` csharp
var records = getMyRecords();

for(var i = records.Length; i-- > 0;) { var record = records\[i\];

// Additional processing processMyRecord(record);

records.RemoveAt(i); }
```

This is the part that's most interesting:

``` csharp
for(var i = records.Length; i-- > 0;)
```

At first glance it looks like you might be subject to an [off-by-one error](http://en.wikipedia.org/wiki/Off-by-one_error), but due to how the **for** is actually evaluated, this works perfectly.

Found via [Stack Overflow](http://stackoverflow.com/questions/275994/whats-the-best-way-to-do-a-backwards-loop-in-c-c-c "Stack Overflow | What's the best way to do a backwards loop in C/C#/C++?").
