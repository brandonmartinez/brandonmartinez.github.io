---
coverImageUri: ""
title: "Unhide Library Folder in OS X 10.7 Lion"
datetime: "2011-07-23T16:00:46.000Z"
categories: "technology"
tags: "mac os x,tips"
---

For some reason, Apple decided to hide the user's Library folder in the Finder. Here's a quick tip to keep it visible.

Run this command in the terminal to show the Library folder once-again:

```bash
$ chflags nohidden ~/Library
```

(to revert back to the default, change _nohidden_ to _hidden_)

Tip via [Unhide Library Folder in Mac OS X 10.7 Lion - Se7enSins Forums](http://www.se7ensins.com/forums/topic/428277-unhide-library-folder-in-mac-os-x-107-lion/).
