---
id: "3411"
coverImageUri: "3429"
title: "OS X Lion, NAS, and Time Machine"
date: "2011-07-23"
datetime: "2011-07-23T09:00:35.000Z"
categories: "technology"
tags: "hardware,mac os x"
---

A few months ago, I purchased a [Western Digital My Book Live](http://www.amazon.com/gp/product/B00439GMJ2 "Western Digital My Book Live 2 TB Home Network Attached Storage Drive on Amazon.com") to use solely for backup purposes. Since receiving it, it has worked great keeping my iMac backed up, and I even planned on switching Joy's MacBook Pro to using it, too. Well, it doesn't look like that switch will be happening soon.

After the release of [OS X Lion](http://www.apple.com/macosx/ "OS X Lion at Apple.com") earlier this week, it broke support for older NAS drives. Apparently, Lion requires that a NAS uses the latest version of AFP; specifically, the drive needs to support DHX2. Here is the error that you get:

> **Time Machine could not complete the backup**
> 
> The network backup disk does not support the required AFP features.

Thankfully, after some searching at the Western Digital Forums, it looks like they are going to try and update the My Book Live firmware as soon as possible (looking like sometime in August):

> We are working on a solution for My Book Live. As I stated earlier in this thread, we will likely not have it out before OSX Lion is released but we will have a solution. We have a firmware update coming out in the next few weeks, but it WILL NOT contain the Time Machine fix. It is likely that the firmware update for this will be sometime in August (depending on how fast we get it tested). We have verified that the released code works , but as I said, it is not tested (Yes we are talking to the Netatalk team).
> 
> – [WDTony](http://community.wdc.com/t5/My-Book-Live/OSX-Lion-DP4-amp-Time-Machine-Error/m-p/219382/message-uid/219382/highlight/true#U219382)

If you own a My Book Live, sit tight and an update will hopefully be around soon.

\[update\]Western Digital now has a notification page for this issue; if you'd like to be notified when a patch is available for your My Book Live, My Book World, or WD ShareSpace, you can signup [here](http://wdc.custhelp.com/app/answers/detail/a_id/7081/session/L3RpbWUvMTMxMTI4MjMxNi9zaWQvc0ExQWx6ems= "Error: 'The network backup disk does not support the required AFP features' is displayed using Time Machine on Mac OSX 10.7.x (Lion) to backup to a WD NAS drive").\[/update\]

\[update\]It looks like they have the issue fixed for My Book Live. Their latest support document for firmware [version 02.01.06 - 026](http://support.wdc.com/nas/rel/eng/MBLRelease_Notes_FW02_01_06_Final_080211.pdf) shows that they've added in the fix. Their [status page](http://wdc.custhelp.com/app/answers/detail/a_id/7081/session/L3RpbWUvMTMxMTI4MjMxNi9zaWQvc0ExQWx6ems= "Error: 'The network backup disk does not support the required AFP features' is displayed using Time Machine on Mac OSX 10.7.x (Lion) to backup to a WD NAS drive") has also been updated:

> **Solution:**
> 
> A firmware update (02.01.06 - 026) for the My Book Live was released on August 2nd, 2011 that addressed this issue. You can download this update either using the automatic update function of your My Book Live, or by following the manual update instructions in Answer ID 5735: How to update the firmware on a My Book Live.
> 
> A firmware update is in development for the the My Book World (White Light), the My Book World II (White Light), and the WD ShareSpace to update the version of Netatalk (to 2.2). At the current time, there is no workaround available for these drives.

Start your updaters! (Originally found via [9to5mac.com](http://9to5mac.com/2011/08/03/western-digital-fixes-time-machine-incompatibilities-with-my-book-live-series/))\[/update\]

[OSX Lion DP4 & Time Machine Error @ Western Digital Community](http://community.wdc.com/t5/My-Book-Live/OSX-Lion-DP4-amp-Time-Machine-Error/td-p/204182/page/2 "OSX Lion DP4 & Time Machine Error @ Western Digital Community").
