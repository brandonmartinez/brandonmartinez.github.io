---
coverImageUri: ''
title: 'Resolve "Access is Denied" using PSExec with a Local Admin Account'
datetime: '2013-04-24T16:02:56.000Z'
categories: 'technology'
tags: 'windows,windows server'
---

Upon trying to enable remote command execution using
[PSExec](http://technet.microsoft.com/en-US/sysinternals 'Windows Sysinternals'),
I ran into an issue trying to login with a local administrator account on my
remote server: **Access is denied**.

[![Access is denied. Not what I wanted to see...](http://assets.brandonmartinez.com/brandonmartinez/2013/04/AccessIsDenied-575x292.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/04/AccessIsDenied.png)

Apparently, if you have an account that's a local Administrator, Remote UAC will
block them from being able to do things like remote execution.

A quick way to test if this might be your issue:

1. Access the server via filesharing (**\\\\YOURSERVER\\C\$**); you should be
   able to login with your credentials.
2. Access the server via filesharing, but this time go to the admin share
   (**\\\\YOURSERVERNAME\\ADMIN\$**); this should **fail**. This is what we need
   to fix.

To get around this, you can make a registry change:

1. Open RegEdit on your remote server
2. Navigate to
   **HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System**
3. Add a new DWORD value called **LocalAccountTokenFilterPolicy**
4. Set its value to **1**
5. Reboot your remove server
6. Try running PSExec again from your local server

You should be able to execute remote commands.

Solution found via
[Admin Arsenal Support: Can't access the ADMIN\$ using a local user account](http://support.adminarsenal.com/entries/20828513-Can-t-access-the-ADMIN-using-a-local-user-account "Admin Arsenal Support | Can't access the ADMIN$ using a local user account").
