---
id: "349"
coverImageUri: ""
title: "Make Google Notifier More “Push”-Like"
date: "2009-07-10"
datetime: "2009-07-10T20:02:52.000Z"
categories: "technology"
tags: "gmail,iphone,mac os x,mobile,push notifications"
---

I recently installed Prowl on my iPhone to receive push notification from, well, just about everything. One of the things that was excited was that I could setup a [faux-Gmail Push System](http://lifehacker.com/5309573/set-up-push-gmail-on-your-iphone "Set Up "Push" Gmail on Your iPhone"). After setting everything up, I noticed that the Google Notifier was only checking every 15 minutes (sometimes longer it seemed). After doing a little digging, I came across a [forum post over at macosxhints](http://forums.macosxhints.com/showthread.php?t=95333 "Make Google Notifier Check More Often?"). Luckily, it was quite easy to fix:

1. While holding Command and Option down on the keyboard, select the Google Notifier Gmail icon and select preferences. This will generate a pop-up dialog.
2. In the dialog box, enter _AutocheckInterval_ as the key, and for the value enter _1_ (for number of minutes to check).
3. Hit set and you're done!

After applying this fix, it's just like having push Gmail (as long as my computer is on)! Thank you [jonnygozy](http://forums.macosxhints.com/showpost.php?p=500638&postcount=4)!
