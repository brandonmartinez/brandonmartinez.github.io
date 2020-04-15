---
coverImageUri: ""
title: "Repair a Broken iWorks '09 Install"
datetime: "2012-11-23T21:06:23.000Z"
categories: "technology"
tags: "apple,iwork"
---

If you're running into an issue with any of your iWorks '09 applications, Pages, Numbers, or Keynote, crashing on startup, this might help.

I was working on a friends computer to resolve an issue with this error:

[![](http://assets.brandonmartinez.com/brandonmartinez/2012/11/iworkscrash-575x280.png "iWorks Crash")](http://assets.brandonmartinez.com/brandonmartinez/2012/11/iworkscrash.png)

Looking in the Console, these errors were common:

```bash
11/19/12 9:50:43 PM \[0x0-0x137137\].com.apple.iWork.Pages\[6440\] dyld: Library not loaded: @rpath/Inventor.framework/Versions/C/Inventor
```

It appeared some of the library references were corrupted, and a reinstall over the top didn't fix them. After a bit of investigation, it looks like the recommended action was to do a full uninstall, followed by a clean install.

To do a full uninstall and reinstall:

1. [Download and unzip this script: Remove-iWorks-09.sh](http://assets.brandonmartinez.com/brandonmartinez/2012/11/Remove-iWorks-09.sh_.zip).
2. Open terminal, navigate to your unzip directory, and run these two commands:
    
    ```bash
sudo chmod 777 Remove-iWorks-09.sh sudo ./Remove-iWorks-09.sh
```
3. Rerun the iWorks '09 installer.

From there, your installation should be repaired. You will have to re-enter your license key, and probably reset your preferences.

This works with iWorks installed from Apple's installer package; I have **not** tested this with any of the iWorks apps downloaded from the App Store.

### References

Basis of uninstall script from [thepullen.net](http://thepullen.net/wp/2012/08/remove-iwork-09-via-script/).
