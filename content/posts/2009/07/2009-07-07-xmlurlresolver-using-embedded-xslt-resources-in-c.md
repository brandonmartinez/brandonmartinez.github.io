---
coverImageUri: ""
title: "XMLUrlResolver: Using Embedded XSLT Resources in C#"
datetime: "2009-07-07T03:05:56.000Z"
categories: "technology"
tags: "c#,programming,xml,xsl"
---

Over the last week or so, I have been searching for a method to properly include XSL files via _xsl:include_ within a .NET embedded resource. Apparently, using _GetManifestResourceStream() (via an Assembly)_ wasn't good enough (it wouldn't follow the _xsl:includes_, simply ignoring them). Luckily, I came across a (semi-)working solution over at [Signs on the Sand](http://www.tkachenko.com/blog/archives/000653.html "Signs on the Sand: Loading XSLT stylesheets embedded into an assembly - the right way"). Now, the concepts behind this were right, it just wasn't working for my particular situation. Here's the scoop:

As I said before, using _GetManifestResourceStream()_ is fine if you want to load a self-contained XSLT, which is what I was doing in most cases. However, when I started building more complex XSLT files, I wanted to break the redundant code down into sub-files (keys, headers, styles, etc). I thought _xsl:include_ was going to save the day. Sadly, this didn't work. The way Microsoft implemented their XSLT parser is that it does not follow _xsl:include_ file path unless they are **absolute**. To get around this, they created the _XmlUrlResolver_ class. This class can be given to the _XslCompiledTransform_ object to override how it follows include paths (regardless of whether they are embedded or actual URIs). Here is the implementation from _Signs on the Sand_:

``` csharp
using System; using System.Xml; using System.Reflection; using System.IO;

namespace MyApp { public class EmbeddedResourceResolver : XmlUrlResolver { public override object GetEntity(Uri absoluteUri, string role, Type ofObjectToReturn) { Assembly assembly = Assembly.GetExecutingAssembly(); return assembly.GetManifestResourceStream(this.GetType(), Path.GetFileName(absoluteUri.AbsolutePath)); } } }
```

The problem with this implementation was that it was trying to find the files on the desktop. So, if I had a tag that was _&lt;xsl:include href="MyApp.XmlToHtml.xslt"&gt;_, where _MyApp.XmlToHtml.xslt_ is the assembly path to the embedded resource, then it would actually look for _C:\\Documents and Settings\\brandonmartinez\\Desktop\\MyApp.XmlToHtml.xslt_. So, to fix this problem, I changed how it grabbed the assembly resource stream:

``` csharp
using System; using System.Reflection; using System.Xml;

namespace MyApp { public class EmbeddedResourceResolver : XmlUrlResolver { private Assembly \_assembly;

public EmbeddedResourceResolver() { \_assembly = Assembly.GetExecutingAssembly(); }

public EmbeddedResourceResolver(Assembly assembly) {\_assembly = assembly;}

public override object GetEntity(Uri absoluteUri, string role, Type ofObjectToReturn) { return \_assembly.GetManifestResourceStream(absoluteUri.Segments\[absoluteUri.Segments.Length - 1\]); } } }
```

Basically, this changes two things. Firstly, it adds an additional constructor to accept a different assembly (in case it ever needs to be called from somewhere else). Secondly, it overrides the GetEntity method to extract the "filename" (which is actually my assembly path) from the absoluteUri, and loads that as a resource stream. After this small change, everything worked like a charm.

If you have any additional suggestions, please feel free to let me know. If you were like me, searching for hours on a solution, I hope this helps you! Good luck!
