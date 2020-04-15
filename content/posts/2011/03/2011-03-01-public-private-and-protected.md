---
coverImageUri: ""
title: "Public, Private, and Protected"
datetime: "2011-03-01T15:32:25.000Z"
categories: "technology"
tags: ".net,c#,programming"
---

I was asked a really good question today (and I had to Google for the answer): what are public, private, and protected keywords called in C# (or other programming language)?

Access Modifiers!\[fn\]1\[/fn\]

In C#, that includes the following keywords (via [Access Modifiers on MSDN](http://msdn.microsoft.com/en-us/library/ms173121.aspx)):

> [public](http://msdn.microsoft.com/en-us/library/yzh058ae.aspx): The type or member can be accessed by any other code in the same assembly or another assembly that references it.
> 
> [private](http://msdn.microsoft.com/en-us/library/st6sy9xe.aspx): The type or member can be accessed only by code in the same class or struct.
> 
> [protected](http://msdn.microsoft.com/en-us/library/bcd5672a.aspx): The type or member can be accessed only by code in the same class or struct, or in a class that is derived from that class.
> 
> [internal](http://msdn.microsoft.com/en-us/library/7c5ka91b.aspx): The type or member can be accessed by any code in the same assembly, but not from another assembly.
> 
> [protected internal](http://social.msdn.microsoft.com/forums/en-US/csharplanguage/thread/135f6582-7144-496d-a35b-be9ec90f8332): The type or member can be accessed by any code in the assembly in which it is declared, or from within a derived class in another assembly. Access from another assembly must take place within a class declaration that derives from the class in which the protected internal element is declared, and it must take place through an instance of the derived class type.

Sometimes it's the simplest things you can't remember.

\[footnote name="1"\]Access modifiers could also be considered a subset of [encapsulation](http://en.wikipedia.org/wiki/Encapsulation_(object-oriented_programming)).\[/footnote\]
