---
coverImageUri: "1427"
title: "Terminal Tip: Symbolically Linking Wildcard Filenames"
datetime: "2010-03-02T14:41:04.000Z"
categories: "technology"
tags: "bash,ln -s,shell,terminal,tips"
---

I am currently researching a Dropbox-based preference syncing solution for Mac OS X. In my research, I came across a really handy terminal tip. If you want to symbolically link (_ln -s source target_) a file or folder to another location that follows a named pattern, such as _com.adobe.\*_, you can supply the pattern for the link source parameter.

For example, running this command:

```bash
iMac:DropBoxPreferenceSync brandon$ ln -s ~/Library/Preferences/com.adobe.\* .
```

And then calling a file listing, will result in this:

```bash
iMac:DropBoxPreferenceSync brandon$ ls -l total 288 lrwxr-xr-x 1 brandon wheel 62 Mar 2 09:21 com.adobe.Acrobat.Pro.plist -> /Users/brandon/Library/Preferences/com.adobe.Acrobat.Pro.plist lrwxr-xr-x 1 brandon wheel 70 Mar 2 09:21 com.adobe.Acrobat.Pro\_x86\_8.0.plist -> /Users/brandon/Library/Preferences/com.adobe.Acrobat.Pro\_x86\_8.0.plist lrwxr-xr-x 1 brandon wheel 70 Mar 2 09:21 com.adobe.Acrobat.Pro\_x86\_9.0.plist -> /Users/brandon/Library/Preferences/com.adobe.Acrobat.Pro\_x86\_9.0.plist lrwxr-xr-x 1 brandon wheel 66 Mar 2 09:21 com.adobe.AdobeOnlineHelp.plist -> /Users/brandon/Library/Preferences/com.adobe.AdobeOnlineHelp.plist lrwxr-xr-x 1 brandon wheel 66 Mar 2 09:21 com.adobe.CSXSPreferences.plist -> /Users/brandon/Library/Preferences/com.adobe.CSXSPreferences.plist lrwxr-xr-x 1 brandon wheel 63 Mar 2 09:21 com.adobe.DNGConverter.plist -> /Users/brandon/Library/Preferences/com.adobe.DNGConverter.plist lrwxr-xr-x 1 brandon wheel 59 Mar 2 09:21 com.adobe.InDesign.plist -> /Users/brandon/Library/Preferences/com.adobe.InDesign.plist

etc…
```

One note, if you are linking the files to your current folder, remember to add the final period (com.adobe.\* **.**), otherwise it will generate a weird linking situation where the OS will report "too many symbolic links". I hope this comes in handy for you!
