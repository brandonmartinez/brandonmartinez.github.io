---
coverImageUri: http://assets.brandonmartinez.com/brandonmartinez/2020/08/20200831-serverrack.jpg
title: 'Resolving a Strange UniFi and macOS Incompatibility'
datetime: '2020-08-31T05:00:00.000Z'
categories: 'technology'
tags: 'ubiquiti,unifi,macos,upnp'
excerpt:
  I recently upgrade my network stack to a Ubiquiti UniFi-based setup. Overall,
  it's been an awesome upgrade and I've really enjoyed working with the
  hardware. However, I was getting bit by a pretty serious bug when it came to
  my primary desktop machine - a 2018 Mac Mini.
---

I recently upgrade my network stack to a Ubiquiti UniFi-based setup. Overall,
it's been an awesome upgrade and I've really enjoyed working with the hardware.
However, I was getting bit by a pretty serious bug when it came to my primary
desktop machine - a 2018 Mac Mini.

My current network rack setup is as follows (I'll get these on my gear page
sometime soon):

- [UniFi Dream Machine Pro (UDM-Pro)](https://store.ui.com/products/udm-pro)
- [UniFi Switch PRO 24 PoE](https://store.ui.com/collections/unifi-network-routing-switching/products/usw-pro-24-poe) -
  Connected to UDM-Pro via
  [Direct Attach Copper Cable, SFP+](https://store.ui.com/collections/unifi-accessories/products/unifi-sfp-dac-patch-cable)
- [(3) USW Flex Mini](https://store.ui.com/collections/unifi-network-routing-switching/products/usw-flex-mini)
- [(5) UniFi In-Wall HD Access Point](https://store.ui.com/collections/unifi-network-access-points/products/unifi-in-wall-hd)
- [UniFi Smart Power Plug](https://store.ui.com/collections/unifi-accessories/products/unifi-smart-power)

Currently, everything is connected to the 24-port switch, generally with power
coming from the PoE-functionality it offers. The network was simple at the time,
with just the primary LAN and two WLANs (one for regular use, the other for IoT
devices), and relatively standard-out-of-the-box configuration.

I was assigning static IP addresses for some of the primary devices on the
network, such as my NAS and primary workstations. Everything was working
beautifully, with one huge exception: my Mac Mini was constantly losing internet
access.

## Debugging the Mac Mini Connectivity

When working with the Mac Mini, I was able to assign a static IP, access all
network resources, and for a short period of time I was able to access the
internet (I would run speed tests and browse via Safari). However, after a few
minutes, I would lose connectivity to the internet, but not the network. A speed
test would not run, and browsing the internet only worked for domains I had
previously visited.

Knowing that final point, I assumed there was an issue with DNS. If I used
another browser, such as Chrome, that didn't use some of the baked-in macOS
functionality, the internet would mostly work, albeit very slowly.

I started all possible debugging steps I could think of:

- Flushing the local DNS cache and killing `mDNSResponder`. I even created an
  alias to make it easier in zsh:

  `alias flushdns='sudo ifconfig en0 down; sudo ifconfig en1 down; sudo killall -HUP mDNSResponder; sudo killall -HUP mDNSResponder; sudo killall -HUP mDNSResponder; sudo killall -HUP mDNSResponderHelper; sudo killall -HUP mDNSResponderHelper; sudo dscacheutil -flushcache; sudo ifconfig en1 up; sudo ifconfig en0 up'`

- Flushing locally cached routes to see if the gateway was interfering. Again,
  created an alias since I was running the command so frequently:

  `alias resetroutes='sudo ifconfig en0 down; sudo ifconfig en1 down; sudo route -n flush; sudo route -n flush; sudo route -n flush; sudo ifconfig en0 up; sudo ifconfig en1 up'`

- Logging into the UDM-Pro via `ssh` and monitoring the logs via
  `tail -f /var/log/message` to see if the firewall was blocking traffic
- Creating firewall rules to allow **all** traffic both in and out of the LAN
  and WAN
- Enabling and disabling any settings that looked at packets: Deep-Packet
  Inspection, IGMP Snooping, DHCP Snooping, DHCP Guarding, etc.
- Disabling static IP assignment and just utilizing DHCP.
- Clearing all macOS caches via
  [Onyx](https://www.titanium-software.fr/en/onyx.html) and
  [CleanMyMac X](https://macpaw.com/cleanmymac) - both excellent tools that I
  highly recommend.
- Reinstalling macOS to ensure local system files or configuration weren't
  corrupted.
- Comparing settings to my MacBook Pro, that has both ethernet and WiFI setup
  (just like the Mac Mini), but had absolutely no issues – no huge configuration
  differences.
- Ran [Wireshark](https://www.wireshark.org) to hunt down any traffic that
  looked worrisome to any degree.
- Resetting the UDM-Pro back to factory settings and reconfiguring it.

During this debug process, there were moments where the internet connectivity
seemed to come back. For example, when I switched static IP address assignment
off and renewed my IP address via DHCP, I would get access again for a few
minutes. From there, I tested manually changing my address to a different IP
address, with each time giving me access for a brief window yet again.

As my last step, when I decided to reset the UDM-Pro back to factory, I went
through every possible internet-bound setting with a fine-toothed comb, turn it
on and off to see when my connectivity would come back. And finally, I found the
culprit.

## UPnP

From [Wikipedia](https://en.wikipedia.org/wiki/Universal_Plug_and_Play):

> Universal Plug and Play (UPnP) is a set of networking protocols that permits
> networked devices, such as personal computers, printers, Internet gateways,
> Wi-Fi access points and mobile devices to seamlessly discover each other's
> presence on the network and establish functional network services for data
> sharing, communications, and entertainment. UPnP is intended primarily for
> residential networks without enterprise-class devices.

In the new UniFi settings pages, you can configure this via this page:

![UPnP Setting in the new UniFi settings page](http://assets.brandonmartinez.com/brandonmartinez/2020/08/20200831-upnp-setting.png)

However,
[some security researches consider UPnP to be a security risk](https://www.howtogeek.com/122487/htg-explains-is-upnp-a-security-risk/),
as it allows applications and services to open and close external ports on your
gateway. While this can be a very useful feature, especially for those of us
using Game Consoles where a large number of ports may be required to allow
access to online game networks, it does give a pause for concern.

Generally, I'm ok with leaving this setting on since I have a "small" network
that I manage well. It never crossed my mind that this could be the issue in my
Mac Mini woes. Once I disabled this setting in UniFi, everything worked
beautifully. I was able to set my static IP address, have both my ethernet and
WiFi adapters enabled, and use all internet services.

While this does fix my issue, it does give me some concern at the same time.
That means there are services on my Mac Mini asking for UPnP configuration
changes (probably excessively). I still need to find what those services are;
they would most likely be third-party as my MacBook Pro had no issues and that's
a relatively stock installation of macOS.

## Conclusion

I wish I would have thought to disable UPnP earlier on in the process. I spent
probably twenty or more hours debugging this issue, just to find it was a single
checkbox. Hopefully if you run into this issue, you found this post quickly.
There was one post in the
[Ubiquiti Community (Apple Mac Woes via Ethernet and WiFi)](https://community.ui.com/questions/Apple-Mac-Woes-via-Ethernet-and-WiFi/feecb355-e47e-4d8a-92b9-99dce164a4fa)
that looked very close to my problem, but that was a couple years old with no
answer – hopefully they found a similar solution.
