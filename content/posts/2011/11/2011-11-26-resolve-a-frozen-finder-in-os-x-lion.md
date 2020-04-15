---
coverImageUri: ""
title: "Resolve a Frozen Finder in OS X Lion"
datetime: "2011-11-26T05:34:44.000Z"
categories: "technology"
tags: "mac os x"
---

Ever since I upgraded to Lion, I've found that on occasion the Finder becomes unresponsive. When the Finder freezes, the entire system becomes unstable (anything that accesses the filesystem). Luckily, I came across a possible workaround and solution to this problem.

Before I found a solution, I was using a quick fix to get things working: manually relaunching the Finder.

[![](http://assets.brandonmartinez.com/brandonmartinez/2011/11/FinderRelaunch.png "Force Relaunch the Finder by holding alt/option, then right-clicking the finder icon.")](http://assets.brandonmartinez.com/brandonmartinez/2011/11/FinderRelaunch.png)

This, however, becomes very tiresome. iTunes, Logic, the Adobe Suite, and other applications all freeze, rendering my computer almost useless. After searching through [Apple support forums](https://discussions.apple.com/thread/3196067?start=0&tstart=0 "Finder Crash on Lion: Apple Support Communities"), one user suggested booting into "safe mode," opening the Finder, poking around, and restarting. It's very simple to do:

1. Restart your Mac.
2. As soon as the gray boot screen appears (or slightly before), press and hold _shift_ on your keyboard.
3. Once you see a progress indicator, let go of _shift_.
4. Once your Mac boots, you'll have to login to your account (auto-login is disabled).
5. Open the Finder. Navigate through a few folders.
6. Restart normally

Once you've done this, use your computer normally. Hopefully it resolves your Finder issue; I've used it for a few days, and I have not noticed a Finder freeze since.

_FYI: from what I've seen, this bug seems to be caused by upgrading OS X 10.6 to 10.7 via the Mac App Store. Apparently, a preference or other system file becomes corrupted, causing this issue. Doing the "safe boot" cleans up the corrupted file, and gets everything back to normal._

## Alternatives

This may not work for you, and if that's your case, there are a few other alternative methods suggested in the Apple support thread: [Finder Crash on Lion: Apple Support Communities](https://discussions.apple.com/thread/3196067?start=0&tstart=0 "Finder Crash on Lion: Apple Support Communities").

### Remove Corrupted .DS\_Store Files

One user reported that corrupted .DS\_Store files caused his issues. To remove them, run this from a terminal window:

```bash
$ rm ~/.DS\_Store; rm ~/Desktop/.DS\_Store
```

### Perform a Clean/Recovery Installation of OS X Lion

This is probably the most difficult method, due to the sheer amount of time that it takes. For a complete set of instructions, I would check out [this post](http://macbookpromoments.wordpress.com/2011/08/05/osx-lion-finder-crash-fixed/ "OSX LION Finder Crash: FIXED").
