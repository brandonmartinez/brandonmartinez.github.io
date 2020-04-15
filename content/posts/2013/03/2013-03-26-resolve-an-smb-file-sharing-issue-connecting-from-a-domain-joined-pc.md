---
coverImageUri: "11134"
title: "Resolve an SMB File Sharing Issue Connecting From a Domain-Joined PC"
datetime: "2013-03-26T16:30:12.000Z"
categories: "technology"
tags: "file sharing,mac os x,smb,windows"
---

If you're having trouble connecting to your Mac from a domain-joined PC, you may need to check your workgroup settings on your Mac.

1. On the Mac: open System Preferences and navigate to the Sharing section:
    
    [![01-SystemPreferencesSharing](http://assets.brandonmartinez.com/brandonmartinez/2013/03/01-SystemPreferencesSharing-575x485.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/01-SystemPreferencesSharing.png)
2. Enable the SMB (Windows) sharing options: [![02-EnableSmbSharing](http://assets.brandonmartinez.com/brandonmartinez/2013/03/02-EnableSmbSharing-575x472.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/02-EnableSmbSharing.png)
3. Go back to the main System Preferences panel, then select Network: [![03-SystemPreferencesNetwork](http://assets.brandonmartinez.com/brandonmartinez/2013/03/03-SystemPreferencesNetwork-575x486.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/03-SystemPreferencesNetwork.png)
4. Choose your primary network adapter (the one that's connected to the same network as your PC) and select Advanced:
    
    [![04-Advanced](http://assets.brandonmartinez.com/brandonmartinez/2013/03/04-Advanced-575x498.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/04-Advanced.png)
5. On the WINS tab, enter the name of the workgroup _or domain_ that your PC is a part of. This is the most important step:
    
    [![05-WORKGROUP-1](http://assets.brandonmartinez.com/brandonmartinez/2013/03/05-WORKGROUP-1-575x501.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/05-WORKGROUP-1.png)
6. From your PC: connect to your Mac (e.g. Start, Run, \\\\Valid\\Unc\\Path\\Or\\IP\\Address). You'll be prompted for a username and password. Notice that by default it wants to login with a domain account:
    
    [![06-ConnectFromWindows](http://assets.brandonmartinez.com/brandonmartinez/2013/03/06-ConnectFromWindows.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/06-ConnectFromWindows.png)
7. To login with a **non-domain user account**, prefix your Mac's username with a **\\**, then enter your password and connect: [![07-ChangeToNoDomain](http://assets.brandonmartinez.com/brandonmartinez/2013/03/07-ChangeToNoDomain.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/07-ChangeToNoDomain.png)
8. Success! [![08-Success!](http://assets.brandonmartinez.com/brandonmartinez/2013/03/08-Success-575x270.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/08-Success.png)
