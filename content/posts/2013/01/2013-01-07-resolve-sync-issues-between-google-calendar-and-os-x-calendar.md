---
id: "10883"
coverImageUri: ""
title: "Resolve Sync Issues Between Google Calendar and OS X Calendar"
date: "2013-01-07"
datetime: "2013-01-07T02:36:25.000Z"
categories: "technology"
tags: "caldav,google calendar,mac os x,tips"
---

While I enjoy using Apple's products, I'm still very much a Google-user when it comes to web services. Generally, Apple and Google's software plays very well together thanks to both of their (partial) support of open web standards. However, sometimes things don't always work as you'd expect.

Ever since I upgraded my iMac to OS X 10.8 (Mountain Lion), I was continuously having sync and refresh errors on my Google calendars:

[![](http://assets.brandonmartinez.com/brandonmartinez/2012/11/ServerRespondedWithError.png "The server responded with an error. The URL encountered HTTP error 404. Make sure the URL is correct.")](http://assets.brandonmartinez.com/brandonmartinez/2012/11/ServerRespondedWithError.png)

Additionally, I would have duplicate calendars and events showing up:

[![](http://assets.brandonmartinez.com/brandonmartinez/2012/11/DuplicateCalendars.png "DuplicateCalendars")](http://assets.brandonmartinez.com/brandonmartinez/2012/11/DuplicateCalendars.png)

[![](http://assets.brandonmartinez.com/brandonmartinez/2012/11/DuplicateCalendarEvents.png "DuplicateCalendarEvents")](http://assets.brandonmartinez.com/brandonmartinez/2012/11/DuplicateCalendarEvents.png)

I would even receive errors when trying to create new events:

[![](http://assets.brandonmartinez.com/brandonmartinez/2012/11/ErrorSavingCalendarData.png "ErrorSavingCalendarData")](http://assets.brandonmartinez.com/brandonmartinez/2012/11/ErrorSavingCalendarData.png)

Half-tempted to just give up an switch to [BusyCal](http://www.busycal.com "BusyCal") (which is pretty awesome, by the way), I figured going through and doing a proper troubleshoot would be the right thing to do.

Based on some advice from the [Apple Support Communities](https://discussions.apple.com/thread/4154209?start=15&tstart=0 "Apple Support Communities: CalendarAgent process is out of control - delegation may be causing problems?"), as well as a support article from [Google](http://support.google.com/calendar/bin/answer.py?hl=en&answer=99358 "Get Started with CalDAV "), I decided to try the following process:

1. Remove **all** calendar accounts from Calendar and OS X: [![](http://assets.brandonmartinez.com/brandonmartinez/2012/11/RemoveAllAccounts.png "Remove all accounts, not just Google CalDAV")](http://assets.brandonmartinez.com/brandonmartinez/2012/11/RemoveAllAccounts.png)
2. Quit Calendar
3. Open a terminal and delete all calendars and Calendar preferences: ```bash
$ sudo rm -Rf ~/Library/Calendars/\* $ sudo rm ~/Library/Preferences/com.apple.iCal.plist $ sudo rm -Rf ~/Library/Caches/com.apple.iCal
```
4. Open Calendar
5. Re-add your accounts back to Calendar
6. Uncheck all additional calendars from the "Delegation" tab (see section below for adding/remove calendars) [![Delegation](http://assets.brandonmartinez.com/brandonmartinez/2013/01/Delegation.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/01/Delegation.png)
7. Wait for the download and sync to finish
8. Done

That process _should_ resolve any sync issues you were experiencing. My guess is that with Google's change in multi-calendar support and CalDAV, iCal/OS X Calendar didn't fully know how to play along.

### Add and Removing Additional Calendars

If you have multiple calendars setup in your Google Calendar account, you can visit this page to adjust which calendars come across in the CalDAV sync: [Google Calendar Sync Settings](https://www.google.com/calendar/syncselect "Google Calendar Sync Settings").

[![iPhone Sync Settings](http://assets.brandonmartinez.com/brandonmartinez/2013/01/iPhone-Sync-Settings.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/01/iPhone-Sync-Settings.png)

Using "delegation" is no longer officially supported, so you'll have to use that page to have your calendars show up properly.

### Resources and References

- [Apple Support Communities: CalendarAgent process is out of control - delegation may be causing problems?](https://discussions.apple.com/thread/4154209?start=15&tstart=0 "Apple Support Communities: CalendarAgent process is out of control - delegation may be causing problems?")
- [Google: Getting Started with CalDAV](http://support.google.com/calendar/bin/answer.py?hl=en&answer=99358 "Getting Started with CalDAV")
- [How To Stop CalendarAgent From Eating CPU](http://robert.accettura.com/blog/2012/08/19/how-to-stop-calendaragent-from-eating-cpu/ "How To Stop CalendarAgent From Eating CPU")
- [MIT KB: How do I clear the iCal cache?](http://kb.mit.edu/confluence/pages/viewpage.action?pageId=12386508 "MIT KB: How do I clear the iCal cache?")
