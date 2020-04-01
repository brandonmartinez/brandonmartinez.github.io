---
id: "1443"
coverImageUri: "1450"
title: "Tutorial: Setting up iText and RJB in Mac OS X"
date: "2010-03-13"
datetime: "2010-03-13T14:32:36.000Z"
categories: "technology"
tags: "itext,pdf,ruby on rails,tutorial"
---

I've been looking for a solid PDF library to use with [Ruby on Rails](http://www.rubyonrails.org). After researching various possibilities, including [prawn](http://wiki.github.com/sandal/prawn/) and [Ruby Ghostscript](http://rghost.rubyforge.org/), I finally decided on [iText](http://itextpdf.com/).

iText is a Java library that allows you to generate PDFs on the fly. From the iText website:

> iText is an ideal library for developers looking to enhance web- and other applications with dynamic PDF document generation and/or manipulation. iText is not an end-user tool. Typically you won't use it on your Desktop as you would use Acrobat or any other PDF application. Rather, you'll build iText into your own applications so that you can automate the PDF creation and manipulation process. For instance in one or more of the following situations:
> 
> - Due to time or size, the PDF documents can't be produced manually.
> - The content of the document must be calculated or based on user input.
> - The content needs to be customized or personalized.
> - The PDF content needs to be served in a web environment.
> - Documents are to be created in "batch process" mode.

That was exactly what I needed.

There was a major hurdle to overcome: iText is a **Java** library, it is meant to be used in **Java**\-based applications. I needed it to work with Ruby. Luckily, there is decent support in combining the powers of Ruby and Java, mainly through [JRuby](http://jruby.org/), or the [Ruby Java Bridge](http://rjb.rubyforge.org/). After some research and experimentation, I got a working solution put together.

## Before Setup

A few assumptions:

- You're running Mac OS X 10.5 or later
- You have Ruby (>1.8.6, preferably 1.8.7) installed
- You have Ruby Gems setup properly
- You have some variety of Java setup

If you don't meet those requirements, get those going first and then come back. Remember, Google is your friend.

## Setup RJB

I decided to go with RJB. It seemed to be the easiest to setup since it was just a Ruby Gem, which is great since I'll have a development, staging, and production server to work with; rake freeze:gems is, well, a gem. To get installation going, run this from a terminal (you will at least need _sudo_ rights):

```bash
$ sudo gem install rjb
```

If you're like me, which you probably are in this scenario, you're going to run into this error:

```bash
$ sudo gem install rjb Building native extensions. This could take a while... ERROR: Error installing rjb: ERROR: Failed to build gem native extension.

/System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/ruby extconf.rb \*\*\* extconf.rb failed \*\*\* Could not create Makefile due to some reason, probably lack of necessary libraries and/or headers. Check the mkmf.log file for more details. You may need configuration options.

Provided configuration options: --with-opt-dir --without-opt-dir --with-opt-include --without-opt-include=${opt-dir}/include --with-opt-lib --without-opt-lib=${opt-dir}/lib --with-make-prog --without-make-prog --srcdir=. --curdir --ruby=/System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/ruby extconf.rb:48: JAVA\_HOME is not set. (RuntimeError)

Gem files will remain installed in /Library/Ruby/Gems/1.8/gems/rjb-1.2.0 for inspection. Results logged to /Library/Ruby/Gems/1.8/gems/rjb-1.2.0/ext/gem\_make.out
```

This is actually an easy fix. You need to adjust your _bash_ environment to export the _JAVA\_HOME_ and _LD\_LIBRARY\_PATH_ variables:

```bash
$ nano ~/.bash\_login # you can use the editor of your choice, vi, vim, joe, etc #append the following to your current file export JAVA\_HOME=/Library/Java/Home export LD\_LIBRARY\_PATH=/Library/Java/Extensions
```

Now, run the following command to install rjb:

```bash
$ sudo env JAVA\_HOME=$JAVA\_HOME gem install rjb
```

If all goes well, you should see the following output:

```bash
Building native extensions. This could take a while... Successfully installed rjb-1.2.0 1 gem installed Installing ri documentation for rjb-1.2.0... Installing RDoc documentation for rjb-1.2.0...
```

RJB is now properly installed!

This setup is very specific to Mac OS X, so there are some things to keep in mind if you're in a different environment:

- _/Library/Java/Home_ is an Apple nicety. They've setup up this convenient directory path so that you have a consistent, and safe, Java path to access; this goes for _/Library/Java/Extensions_ as well.
- The reason for having to re-export the _JAVA\_HOME_ variable in the final _gem install_ command is because _sudo_ creates a different environment than running it from your usual user account. Re-exporting the variables makes sure that your environment variables are properly passed along

## Setup and Use iText

Setting up iText is very easy once RJB is installed. First, download the latest JAR file from the [iText SourceForge](http://sourceforge.net/projects/itext/files/). As of this writing, version _5.0.1_ is the most recent. Then, place that file in whatever folder you'll be using it in. I find that in Ruby on Rails projects, the lib folder works the best. Next, open a terminal and navigate to the root of your project. Then, we'll open an instance of IRB (Ruby's console).

```bash
$ irb >> require 'rjb' => true >> Rjb::load('lib/iText.jar') # Replace this file name with whatever you're using >> PdfReader = Rjb::import('com.itextpdf.text.pdf.PdfReader') => #<Rjb::Com\_itextpdf\_text\_pdf\_PdfReader:0x101fa83e8>
```

That's it! To reference any class in iText, just load them with _Rjb::import('com.itextpdf.text.pdf.**class**')_. You can add this to a Ruby script, or use it from the IRB console. In my case, I'm going to build a Rails controller to generate PDF proofs.

## References

A lot of this was based on the work of others. I used a combination of the following tutorials to get this setup and running properly on Mac OS X:

- [Josh's Blog: Using iText to generate PDFs in Rails; JRuby vs Ruby Java Bridge](http://blogs.thewehners.net/josh/posts/406-using-itext-to-generate-pdfs-in-rails-jruby-vs-ruby-java-bridge)
- [PDF Templates via Rails &lchev; Just a Techie Blog](http://jaywhy.wordpress.com/2007/03/05/pdf-templates-via-rails/)
- [Nuby on British Rails: more on iText](http://nubyonbritishrails.blogspot.com/2010/01/more-on-itext.html)
