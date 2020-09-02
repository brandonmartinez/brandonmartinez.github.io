---
coverImageUri: http://assets.brandonmartinez.com/brandonmartinez/2020/09/20200901-serverrack.jpg
title: 'UDM-Pro and Apple Homekit mDNS Configuration'
datetime: '2020-09-01T05:00:00.000Z'
categories: 'technology'
tags:
  'ubiquiti,unifi,macos,homekit,apple,google,chromecast,mdns,mdns reflector,
  mdns redirector,avahi'
excerpt:
  "The UDM-Pro is an impressive piece of networking hardware. However, Ubiquiti
  has moved away from some of the internals present in their USG, and as such a
  few things aren't working quite as expected; one of those being the mDNS
  Reflector."
---

The UDM-Pro is an impressive piece of networking hardware. However, Ubiquiti has
moved away from some of the internals present in their USG, and as such a few
things aren't working quite as expected; one of those being the mDNS Reflector.

If you're using a
[separate network and VLAN for your IoT devices](https://vninja.net/2019/08/12/unifi-iot-networks/),
which you should be if you're not, you will need to setup an mDNS reflector to
allow for discovery and communication between those devices and those on your
primary network. This helps keep your primary network more secure, as well as
giving you opportunities to lock down your IoT VLAN and prevent rogue devices
from gaining more access than they need.

UniFi has a built-in mDNS Service that uses [Avahi](https://www.avahi.org)
behind the scenes. However, the functionality does not appear to work as
expected on the UDM-Pro (opposed to the USG, which seems to work as advertised).
To properly configure the UDM-Pro, some work is needed.

This guide assumes you already have your networks (primary, VLAN, etc) and WiFI
networks already configured, in addition to firewall rules between them for
standard access.
[vNinja.net has a great write-up on this already](https://vninja.net/2019/08/12/unifi-iot-networks/);
though, I will probably write up my own guide after I finalize my own personal
network.

## Configuring UniFi Services

Before we apply our custom configuration, we need to disable some of the
built-in UniFi services and configuration. To do that, login to your UDM-Pro and
make these changes (these are all using the new settings interface):

1. Disable the mDNS Service.
   ![Disable mDNS Services](http://assets.brandonmartinez.com/brandonmartinez/2020/09/2020-09-02-01-disable-multicast-dns.png)
2. Disable IGMP Snooping on all network that will utilize mDNS (your primary LAN
   and IoT LAN at a minimum).
   ![Disable IGMP Snooping](http://assets.brandonmartinez.com/brandonmartinez/2020/09/2020-09-02-02-disable-igmp-snooping.png)
3. Disable Multicast Enhancement on all wireless networks that will utilize mDNS
   (primary WLAN and IoT WLAN at a minimum).
   ![Disable Multicast Enhancement](http://assets.brandonmartinez.com/brandonmartinez/2020/09/2020-09-02-03-disable-multicast-enhancement.png)

Next, we'll login to the UDM-Pro using SSH and install a few custom services.

## Installing a Custom mDNS Reflector

If you haven't configured your UDM-Pro for SSH,
[do that first](https://help.ui.com/hc/en-us/articles/360049612874-UniFi-UDM-How-to-Login-to-the-Dream-Machine-using-SSH).

Now we can install our custom mDNS Reflector.

1. SSH into the UDM-Pro.

   ```bash
   ssh root@192.168.1.1 # or whatever your controller's IP address is
   ```

2. Log into the UniFi OS Shell.

   ```bash
   unifi-os shell
   ```

3. Install
   [on-boot-script](https://github.com/boostchicken/udm-utilities/tree/master/on-boot-script)
   from [udm-utilities](https://github.com/boostchicken/udm-utilities).

   ```bash
   curl -L https://raw.githubusercontent.com/boostchicken/udm-utilities/master/on-boot-script/packages/udm-boot_1.0.1-1_all.deb -o udm-boot_1.0.1-1_all.deb
   dpkg -i udm-boot_1.0.1-1_all.deb
   exit
   ```

4. Pull the `multicast-relay` docker image and create a container. Notice the
   usage of `podman` versus the standard `docker` CLI.

   ```bash
   podman run -it -d --restart=always --name="multicast-relay" --network=host -e OPTS=" --verbose" -e INTERFACES="br0 br2" docker.io/scyto/multicast-relay
   ```

   Note the `br0 br2` parameter; this should match your VLAN's network
   interfaces. Execute `ifconfig` from the SSH session to see available
   interfaces; add your VLANs as space-delimited entries to the command.

5. Add a startup script to re-execute the container on startup.

   ```bash
   touch 01-multicast-relay.sh
   chmod +x 01-multicast-relay.sh
   ```

   Then use `vim 01-multicast-relay.sh` to edit the file. Hit `i` to enter edit
   mode, paste the following contents, then hit `esc` and `:w` to save the file.
   Enter `:q` to quit.

   ```bash
   #!/bin/sh

   # kill all instances of avahi-daemon (UDM spins an instance up even with mDNS services disabled)
   killall avahi-daemon

   # start the multicast-relay container image
   podman start multicast-relay
   ```

6. Reboot the UDM and test your HomeKit devices.

## Conclusion

After following these steps, you should be able to use your HomeKit devices
segregated by a VLAN. In my personal setup, I have my hub (an AppleTV 4th
Generation) on the primary LAN, with all of my IoT devices in the VLAN. I'm able
to control them all directly with no issues now. Additionally, Chromecast
devices work a majority of the time, though they appear to be occasionally
limited due to
[UPnP being disabled](https://www.brandonmartinez.com/2020/08/31/unifi-and-macos-disable-upnp/).

Ideally, the built-in mDNS service should be good enough for what we need.
However, until Ubiquiti fixes their mDNS service, this custom workaround will be
required.

A huge thank you to
[u/CaoCamp](https://community.ui.com/user/CaoCamp/d5f7bbb1-c119-4c4d-b2c8-20ae4807e03b)
who wrote the initial solution, based on the work by
[u/boostchicken](https://www.reddit.com/user/boostchicken/) and
[u/scytob](https://www.reddit.com/user/scytob/). I simply filled in some blanks
based on my own experience.

## References

- [GitHub | UDM Utilities by boostchicken](https://github.com/boostchicken/udm-utilities)
- [Ubiquiti Community | [UDM][UDMP] IoT VLAN Speaker Group fix with mDNS and Google Nest Speakers/Chromecasts](https://community.ui.com/questions/UDMUDMP-IoT-VLAN-Speaker-Group-fix-with-mDNS-and-Google-Nest-Speakers-Chromecasts/37d6239f-303e-4f9f-8727-626acf07d33c)
- [Reddit | r/Ubiquiti | mDNS not working properly on UDM](https://www.reddit.com/r/Ubiquiti/comments/f1gt2j/mdns_not_working_properly_on_udm/fxbk5th/)
