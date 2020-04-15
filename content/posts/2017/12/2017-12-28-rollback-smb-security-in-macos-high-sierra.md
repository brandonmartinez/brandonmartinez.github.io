---
coverImageUri: ''
title: 'Rollback SMB Security in macOS High Sierra'
datetime: '2017-12-28T17:00:02.000Z'
categories: 'technology'
tags: 'file sharing,hp,mac os x,macos,printers,smb'
---

Just a quick tip if you're running into issues with SMB shares in macOS High
Sierra. I was running into issues with my HP All-in-One Printer/Scanner and
saving files to a network share on macOS. Apparently HP does not have SMB
up-to-date in their firmware, so if you have strict signing or SMB protocol v3
setup, you need to downgrade it.

You can do that with the following set of shell commands:

```bash
sudo scutil --prefs com.apple.smb.server.plist
```

The following is in an interactive shell:

```bash
get /

d.add ProtocolVersionMap 2

set /

commit

apply

quit
```

Then run the following to restart the service:

```bash
sudo /usr/libexec/configureLocalKDC
sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.smbd.plist
sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.smbd.plist
```

You may also need to have the File Sharing service restart on every boot if it
doesn't seem to take effect. You can do that by creating this Property List
file:

```bash
sudo nano /Library/LaunchDaemons/com.me.restart_smb.plist
```

With these contents:

```xml
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>Label</key>
        <string>com.me.restart_smb</string>
        <key>ProgramArguments</key>
        <array>
            <string>/bin/bash</string>
            <string>-c</string>
            <string>sleep 60;touch "/Library/Preferences/SystemConfiguration/com.apple.smb.server.plist"</string>
        </array>
        <key>RunAtLoad</key>
        <true />
    </dict>
</plist>
```

And then setting the permissions on that file:

```bash
sudo chown root:wheel com.me.restart_smb.plist
sudo chmod 644 com.me.restart_smb.plist
```

Hope that helps!

Sources:

- [If you can use AFP but not SMB to mount a file server | Apple](https://support.apple.com/en-us/HT204021 'If you can use AFP but not SMB to mount a file server | Apple')
- [Repair file sharing after Security Update 2017-001 for macOS High Sierra 10.13.1 | Apple](https://support.apple.com/en-us/HT208317 'Repair file sharing after Security Update 2017-001 for macOS High Sierra 10.13.1 | Apple')
- [Turn off packet signing for SMB 2 and SMB 3 connections | Apple](https://support.apple.com/en-us/HT205926 'Turn off packet signing for SMB 2 and SMB 3 connections | Apple')
- [WINS workgroup resets every time I startup my MAC](https://discussions.apple.com/thread/4512558 'WINS workgroup resets every time I startup my MAC')
