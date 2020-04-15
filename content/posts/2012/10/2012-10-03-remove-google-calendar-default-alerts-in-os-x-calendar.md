---
coverImageUri: ""
title: "Remove Google Calendar Default Alerts in OS X Calendar"
datetime: "2012-10-03T05:03:54.000Z"
categories: "technology"
tags: "google,google calendar,ical,mac os x"
---

If you use Google Calendar with OS X Lion or Mountain Lion's Calendar application, you may have noticed your default event alerts showing odd times. For example, when I create a new event, Calendar adds a default alert of 1150 minutes in addition to the Calendar standard default alert of 15 minutes.

[![](http://assets.brandonmartinez.com/brandonmartinez/2012/10/IncorrectDefaultAlert.jpg "An odd default alert time")](http://assets.brandonmartinez.com/brandonmartinez/2012/10/IncorrectDefaultAlert.jpg)

The fix to this issue is actually pretty simple:

1. Go to the [Google Calendar website](http://calendar.google.com/).
2. In the top right, select the gear icon and then choose settings:  
    [![](http://assets.brandonmartinez.com/brandonmartinez/2012/10/Settings.jpg "Settings")](http://assets.brandonmartinez.com/brandonmartinez/2012/10/Settings.jpg)
3. Choose "Calendars" from the tab menu:  
    [![](http://assets.brandonmartinez.com/brandonmartinez/2012/10/Calendars.jpg "Calendars")](http://assets.brandonmartinez.com/brandonmartinez/2012/10/Calendars.jpg)

For the next few steps, you will have to do this for **each** calendar in your account:

4. Click the "Notifications" link for the calendar you want to edit:  
    [![](http://assets.brandonmartinez.com/brandonmartinez/2012/10/Notifications-575x178.jpg "Notifications")](http://assets.brandonmartinez.com/brandonmartinez/2012/10/Notifications.jpg)
5. Remove any default event reminders that are there:  
    [![](http://assets.brandonmartinez.com/brandonmartinez/2012/10/RemoveEventReminder-575x72.jpg "RemoveEventReminder")](http://assets.brandonmartinez.com/brandonmartinez/2012/10/RemoveEventReminder.jpg)
6. Save:  
    [![](http://assets.brandonmartinez.com/brandonmartinez/2012/10/Save.jpg "Save")](http://assets.brandonmartinez.com/brandonmartinez/2012/10/Save.jpg)
7. Repeat for each calendar

Once you've completed those steps, try creating a new event in Calendar. It should only have the Calendar default alert:

[![](http://assets.brandonmartinez.com/brandonmartinez/2012/10/ProperAlert.jpg "ProperAlert")](http://assets.brandonmartinez.com/brandonmartinez/2012/10/ProperAlert.jpg)

_Note: I can only imagine this would work for Google Apps accounts, but I have not tested it._
