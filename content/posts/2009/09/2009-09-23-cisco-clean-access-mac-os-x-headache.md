---
coverImageUri: ''
title: 'Cisco Clean Access + Mac OS X = Headache'
datetime: '2009-09-23T05:48:36.000Z'
categories: 'technology'
tags: 'bash,cisco,clean access,ferris state university,programming,proxy'
---

At Ferris State University, the network implements a system called
[Cisco Clean Access (CCA)](http://en.wikipedia.org/wiki/Cisco_NAC_Appliance).
This is a system designed to keep all Windows-based computers up-to-date,
secure, and authorized to use the network. On the Windows-side of things, it
works decently. All that is truly required is the installation of Clean Access
Manager, Norton Antivirus, and setting up your Windows Update settings to point
to FSU's Windows Update Server.

This is totally different if you use a Mac (or Linux, or any other OS). While
there is technically a Mac client for CCA, it does not work as well as the
Windows-based client. Luckily, there is still a backup plan for other operating
systems: CCA will redirect you to a web-based login page, you fill in your user
credentials, and bam! you're on the network. Only a few caveats:

- If you disconnect from the network for any reason (i.e. you're using a laptop
  and you close the lid) for more than 5 minutes, you will have to re-login
- Occasionally there are issues with computer identification and DHCP: I have
  run into issues where I was logged in, closed my laptop for 15 minutes, and
  was given an "IP in use" error. This has happened on more than one occasion,
  and not only to me, but a few of my classmates.
- It's just a hassle to have your web session interrupted by a Java app (and on
  that point, why is it a Java app? I'm pretty sure a **standards-compliant**
  web form would suffice) asking you to login

To get around most of these issues, I came up with a script to automatically
login with my iMac. Essentially, it's just a shell/bash script that is executed
by launchd (you could use Cron on \*NIX) every 5 minutes.

## Using the script

I set this up using launchd, which is Apple's recommended task scheduler. To do
this, I used
[Lingon (now discontinued)](http://sourceforge.net/projects/lingon/), but you
can manually set it up as well:

1. Copy the login script into `/Library/Scripts/Shell/` with the name
   `FSUNetworkLogin.sh` be sure to change your username and password:

   ```bash
       #!/bin/bash
       # STARTING AUTHORIZATION
       logger -i -s "FSUNETWORKLOGIN: Automatically Logging into FSU Network…"

       # GETTING THE ADDRESS FOR AUTHORIZATION
       AUTHREDURL=`curl -s http://www.google.com | grep -o URL=.\*\\&amp;lt;\/head##"`

       if \[ "$AUTHREDURL" != "" \]; then
           logger -i -s "FSUNETWORKLOGIN: AUTHREDURL=$AUTHREDURL"

           SUBDOMAIN=`echo $AUTHREDURL | sed -e 's#URL=https://##' -e 's#\.ferris.\*##' -e 's#https://##'`
           logger -i -s "FSUNETWORKLOGIN: SUBDOMAIN=$SUBDOMAIN"
           CM=`echo $AUTHREDURL | sed -e 's#https://##' -e 's#\[A-z0-9./\]\*?cm=##' -e 's#&amp;uri=\[A-z0-9./%\]\*##'`
           logger -i -s "FSUNETWORKLOGIN: CM=$CM"
           S3=`curl -s $AUTHREDURL | grep -o 'value="-\?\[0-9\]\+" /&amp;gt;' | sed -e 's#value="##' -e 's#" /&amp;gt;##'`
           logger -i -s "FSUNETWORKLOGIN: S3=$S3"

           # GETTING AUTHORIZATION VARIABLES

           # ACTUAL FORM VALUES
           USERNAME="username" # CHANGE TO YOUR USERNAME
           PASSWORD="password" # CHANGE TO YOUR PASSWORD
           PROVIDER="Authentication Cluster"

           # HIDDEN FORM VALUES
           GUESTUSERNAMELABEL="Guest ID"
           GUESTPASSWORDLABEL="Password"
           PASSWORDLABEL="Password"
           USERNAMELABEL="Computing ID"
           REGISTERGUEST="NO"
           COMPACT="false"
           PAGEID="-1"
           INDEX="7"
           PM=""
           SESSION=$S3
           USERIP=$IP
           URI="http://www.google.com/"
           REQFROM="perfigo\_login.jsp"
           CM=""

           FULLSTRING="username=$USERNAME&amp;password=$PASSWORD&amp;provider=$PROVIDER&amp;guestUserNameLabel=$GUESTUSERNAMELABEL&amp;guestPasswordLabel=$GUESTPASSWORDLABEL&amp;passwordLabel=$PASSWORDLABEL&amp;userNameLabel=$USERNAMELABEL&amp;registerGuest=$REGISTERGUEST&amp;compact=$COMPACT&amp;pageid=$PAGEID&amp;index=$INDEX&amp;pm=$PM&amp;session=$SESSION&amp;userip=$USERIP&amp;cm=$CM&amp;uri=$URI&amp;reqFrom=$REQFROM"

           logger -i -s "FSUNETWORKLOGIN: FULLSTRING=$FULLSTRING"

           # SENDING AUTHORIZATION

           STATUS=`curl --max-time 60 --connect-timeout 30 -A "Mozilla/4.0" -d "$FULLSTRING" https://$SUBDOMAIN.ferris.edu/auth/perfigo\_cm\_validate.jsp`

           logger -i -s "FSUNETWORKLOGIN: Status=$STATUS"
       else
           logger -i -s "FSUNETWORKLOGIN: Could not complete; you may already be logged in or the internet connection is not available."
       fi

       # Maybe this will fix the weird launchd things sleep 10 exit 0
   ```

2. Create a new file in `/Library/LaunchDaemons/` called
   `edu.ferris.network.automaticlogin.plist`, and paste this into it:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>

   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
       <dict>
           <key>Disabled</key>
           <false/>
           <key>Label</key>
           <string>edu.ferris.network.automaticlogin</string>
           <key>ProgramArguments</key>
           <array>
               <string>/Library/Scripts/Shell/FSUNetworkLogin.sh</string>
           </array>
           <key>StartInterval</key>
           <integer>300</integer>
       </dict>
   </plist>
   ```

3. Open a terminal and make sure that permission are correct:

   ```bash
   cd /Library/Scripts/Shell/ sudo chmod 755 FSUNetworkLogin.sh
   ```

4. Either logout and log back in, or open terminal and issue this command:

   ```bash
   launchctl load ~/Library/LaunchAgents launchctl list
   ```

5. Done! This should log you in every 5 minutes. On occasion, you may experience
   the login screen, but for the most part you should hardly ever see it.

## How the script works

1. A connection is attempted to google.com using curl
2. The result is parsed using grep and sed; it is looking for a piece of
   information common in the FSU CCA Login screen
3. If the script finds the relevant information, it precedes to send the
   standard login form data to the CCA Login server
4. If the script doesn't find the relevant information, then you are already
   logged in (most likely); the script is aborted
5. Done!

## When it's most beneficial…

For me, this has worked out great. My home setup is pretty elaborate (for just a
college residence):

- Each college residence has 1 network connection, and as such, 1 IP address
  (generally, this can be overridden with a router in bridge-mode); for me it's
  an ethernet drop, for others it's a modem
- From my drop, I plug it into an Airport Extreme (any router would work,
  though)
- Behind my router, I have an iMac, a MacBook, a MacMini, an HP Laptop, and my
  iPhone
- My router is setup to give out local network addresses on my side of the
  network (192.168.x.x)
- I have my iMac setup as the DMZ (this is where the script is installed)

So all I have to do is use my iMac to run the script every 5 minutes and all
other devices on my network can use the Internet without having to login.
Another awesome benefit is that I know my iMac will be connected and
authenticated to the network, so I can access it from anywhere on campus (i.e.
file server).

I hope this can help at least someone out. Good luck! Any suggestions or
questions, leave a comment.
