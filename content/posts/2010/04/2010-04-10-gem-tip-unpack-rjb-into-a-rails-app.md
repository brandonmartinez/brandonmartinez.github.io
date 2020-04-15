---
coverImageUri: ""
title: "Gem Tip: Unpack RJB into a Rails App"
datetime: "2010-04-10T16:02:41.000Z"
categories: "technology"
tags: "rjb,ruby gems,ruby on rails"
---

The RJB gem has been insanely useful to me over the past few weeks. I've been developing with it on my local machine and things have been going well (that is, after finally figuring out how to get it [properly installed](http://wp.me/pxRqw-nh)). However, I've run into an issue when packaging the gem for remote deployment.

To prevent missing gems, I will normally run _rake rails:freeze:gems_ and _rake gem:unpack:dependencies_ (and in this case, _rake spree:freeze:gems_ as well). This will copy the gems from my local installation into the _vendor/rails_ and _vendor/gems_ directories (respectively). However, when I ran this command on an app that uses RJB, I was getting an _RJBCore_ missing error. After some investigation, the fix was easy.

Apparently, when you install the RJB gem, it natively compiles a bundle file (this is why you have to specify Java's location in my [previous tutorial](http://wp.me/pxRqw-nh)). When you unpack the gem, this new bundle doesn't come along because it was not an original part of the gem (and it is environment specific for the most part). To avoid this problem, there is one solution: copy your local gem directory into your Rails app:

```bash
$ cp /Library/Ruby/Gems/1.8/gems/rjb-1.2.0/ ~/Sites/your\_rails\_app/vendor/gems/
```

This should copy over the rjb.bundle file that is necessary to properly use RJB.

## Notice

There is something to keep in mind with this method, as it will not always work. From what I can tell, this is going to be environment specific. For example, I develop on Mac OS X; the server I am deploying to is a Mac OS X server. Since RJB is compiled to the location of my Java libraries, it should carry over to the server. If I were going to deploy to a Ubuntu server, the Java locations are going to be different.

There may be ways around this problem. One idea is to find out where your deployment server's Java libraries are installed, then recreate that structure on your computer using symlinks. For example, if you are deploying to a server where Java is stored in /bin/java, but you have Java installed at /Library/Java, then just do this:

```bash
$ ln -s /Library/Java /bin/java
```

After that, recompile/reinstall the RJB gem, using that new symlinked path. Then unpack the gem as before. This, of course, is just an idea and _may_ not work. If you have any experience doing this, please leave a comment with your success/fail story.
