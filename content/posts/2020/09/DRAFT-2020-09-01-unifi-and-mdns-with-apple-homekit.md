---
coverImageUri: http://assets.brandonmartinez.com/brandonmartinez/2020/09/20200901-serverrack.jpg
title:
  'Unifi Dream Machine Pro and mDNS for Apple Homekit and Google Chromecast'
datetime: '2020-09-01T05:00:00.000Z'
categories: 'technology'
tags: 'ubiquiti,unifi,macos,homekit,apple,google,chromecast'
excerpt:
---

Steps

1. Disable `mDNS` services in the Unifi Controller
2. Disable `IGMP Snooping` on all networks
3. Disable `Multicast Enhancement` in all Wireless Networks
4. SSH into the UDM, start a `unifi-os shell` session, and install
   `on-boot-scripts` from `udm-utilities`

```bash
curl -L https://raw.githubusercontent.com/boostchicken/udm-utilities/master/on-boot-script/packages/udm-boot_1.0.1-1_all.deb -o udm-boot_1.0.1-1_all.deb
dpkg -i udm-boot_1.0.1-1_all.deb
exit
```

5. Pull the `multicast-relay` docker image and create a container:

```bash
podman run -it -d --restart=always --name="multicast-relay" --network=host -e OPTS=" --verbose" -e INTERFACES="br0 br2" docker.io/scyto/multicast-relay
```

Note the `br0 br2` parameter; this should match your VLAN's network interfaces.
Execute `ifconfig` from the SSH session to see available interfaces; add your
VLANs as space-delimited entries to the command.

6. Add a startup script to re-execute the container on startup.

```bash
touch 01-multicast-relay.sh
```

Then use `vim 01-multicast-relay.sh` to edit the file. Hit `i` to enter edit
mode, paste the following contents, then hit `esc` and `:w` to save the file.
Enter `:q` to quit:

```bash
#!/bin/sh

# kill all instances of avahi-daemon (UDM spins an instance up even with mDNS services disabled)
killall avahi-daemon

# start the multicast-relay container image
podman start multicast-relay
```

7. Reboot the UDM and test your HomeKit devices.

## References

- https://github.com/boostchicken/udm-utilities
- https://community.ui.com/questions/UDMUDMP-IoT-VLAN-Speaker-Group-fix-with-mDNS-and-Google-Nest-Speakers-Chromecasts/37d6239f-303e-4f9f-8727-626acf07d33c
- https://www.reddit.com/r/Ubiquiti/comments/f1gt2j/mdns_not_working_properly_on_udm/fxbk5th/
