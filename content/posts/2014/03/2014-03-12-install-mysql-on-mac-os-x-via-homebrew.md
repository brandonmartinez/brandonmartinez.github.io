---
coverImageUri: ""
title: "Install MySQL on Mac OS X via Homebrew"
datetime: "2014-03-12T03:32:04.000Z"
categories: "technology"
tags: "homebrew,mac os x,mysql,tips"
---

A quick tip for those of you doing MAMP development: how to easily install and run MySQL via Homebrew.

From a terminal:

```bash
$ brew install mysql
```

Seems too easy, right? If you want it to start automatically on boot, you'll also need to run the following:

```bash
$ ln -sfv /usr/local/opt/mysql/\*.plist ~/Library/LaunchAgents $ launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist $ mysql.server start
```

Tip via [benjsicam.me](http://benjsicam.me/blog/how-to-install-mysql-on-mac-os-x-using-homebrew-tutorial/).
