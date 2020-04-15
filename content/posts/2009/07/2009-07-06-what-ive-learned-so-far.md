---
coverImageUri: ""
title: "What I've Learned So Far"
datetime: "2009-07-06T21:20:34.000Z"
categories: "personal"
tags: "c#,programming,work,xml,xsl"
---

So far, my internship has been going great! I've had many opportunities to work in a new environment, and I've been able to tap into one of my more underused skills: programming. Since I've been working for Independent, I've been able to learn a lot of new concepts; not only in programming, but in some of the operations of a business. Here is a brief overview of some of the things I have learned, or am learning.

## The .NET Framework

My only experiences with the .NET framework were a few years ago, back when it was still in 1.0 and 1.1, and it was with Visual Basic .NET (I had been using VB6 at the time the .NET framework was introduced). I did take a VB.NET course in my second year of college, but it was mostly for the credit (it was an intro course), but even then .NET was at 2.0 (.NET is currently at version 3.5, with 4.0 on the horizon).

Not only do I get to learn how .NET has changed, but I get to learn a new language: [C#](http://en.wikipedia.org/wiki/C_Sharp_(programming_language) "C# (Wikipedia)"). C# is very similar to C++ in syntax, but takes some concepts from other languages (to me, it feels like a Ruby-ish version of C++). Along with learning the syntax, I have been able to learn a lot of the language features available:

- **LINQ (Language-Integrated Query):** allows for objects in C# to be databound to objects within a database. This was a very easy concept to grasp, thanks to my roots in Ruby on Rails and using Active Record.
- **Lambda Functions:** once again, something that I had known (partially) from Ruby. Lambda's are essentially anonymous, inline functions.
- **Automatic Properties:** this is ridiculously helpful. Instead of having to declare a private instance variable, then create a property based around that, C# allows you to declare the property with its _get_ and _set_, and then automatically setup the variable for you. For example: _public int Count { get; set; }_ generates a read/write property, where _int Subtotal {get;}_ create a read-only property.
- **Extension Methods:** this might be the coolest language feature that C# offers (in my opinion, of course). Basically, you can create a method that "extends" an existing class outside of its definition. For example: ``` csharp
public static class IntegerExtension { public static int Triple(this int i) { return i \* 3; } }
    
    int x = 12; x.Triple; // results in 36, the same as IntegerExtension.Triple(x)
```
    

Along with learning the language features, I've also picked up some new programming concepts. The biggest one I have learned is a _class factory_. Wikipedia's definition works best:

> A factory object is an object for creating other objects. It is an abstraction of a constructor, and can be used to implement various allocation schemes, such as the singleton pattern.

> A factory object typically has a method for every kind of object it is capable of creating. These methods optionally accept parameters defining how the object is created, and then return the created object.
> 
> Factory objects are used in situations where getting hold of an object of a particular kind is a more complex process than simply creating a new object. The factory object might decide to create the object's class (if applicable) dynamically, return it from an object pool, do complex configuration on the object, or other things.

## XML and XSL

I once thought to myself "why would I ever need to use XSL?" and as such, never really took the opportunity to learn it. Well, I found the application where I actually _need_ to use it. Firstly, I understood XML. XML is nothing more than a grouping of tags, normally derived from a schema or DTD, that allows you to markup data to fit a specific purpose (i.e. contact information, recipes, music, etc). XSL allows you to take that data, and transform it into another form. It may seem odd to do this: why would you ever want to take a contact file and transform it into a different type of XML? Here's a big reason: XHTML.

In my case, it was taking an XML serialized DataTable object from .NET, and turning it into an Excel XML spreadsheet. After quite a bit of extensive research, I managed to whip up an awesome solution (and learned a ton about XML and XSL). In short, it involves taking an XslCompiledTransformation and running it through a set of Shawn's IRenderer classes. Came out b-e-a-utifully (and not to mention, is totally reusable)!

## Billing

In the past month, I have learned more about the billing process than I ever thought I would. Billing is possibly one of the most confusing aspects of running a business that there is (probably only one-up'd by taxes). It is amazing how many alterations to a billing procedure there are. Special cases for special clients, different procedures for different reasons, it's so immense!
