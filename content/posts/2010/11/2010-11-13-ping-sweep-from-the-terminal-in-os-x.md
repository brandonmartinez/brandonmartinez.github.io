---
coverImageUri: ''
title: 'Ping-Sweep from the Terminal in OS X'
datetime: '2010-11-13T20:46:26.000Z'
categories: 'technology'
tags: 'mac os x,networking,terminal'
---

I did something stupid: I lost one of the routers on my network. I currently
have a dual-router network setup, mainly for the purpose of running a wireless
b/g network and a wireless-N network (5 Ghz). Regardless, I couldn't remember
what I set the IP address to for the b/g router. After doing a quick
Google-search, I found an easy way to do a ping-sweep in the OS X terminal.

```bash
$ for i in {1..254}; do ping -c 1 -W 1 10.1.1.$i | grep 'from'; done
```

Where the **10.1.1.** is, put your network address. For example, for a standard
class C range, you could do:

```bash
$ for i in {1..254}; do ping -c 1 -W 1 192.168.1.$i | grep 'from'; done
```

The output will look similar to this:

```bash
64 bytes from 192.168.1.1: icmp\_seq=0 ttl=255 time=0.291 ms 64 bytes from 192.168.1.101: icmp\_seq=0 ttl=64 time=0.060 ms 64 bytes from 192.168.1.102: icmp\_seq=0 ttl=64 time=0.193 ms
```

via
[commandlinefu.com](http://www.commandlinefu.com/commands/view/3144/ping-sweep-without-nmap).
