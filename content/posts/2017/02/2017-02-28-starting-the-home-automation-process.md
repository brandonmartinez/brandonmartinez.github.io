---
coverImageUri: 'http://assets.brandonmartinez.com/brandonmartinez/2017/02/IMG_2883-1000x563.png'
title: 'Starting the Home Automation Process'
datetime: '2017-02-28T04:33:42.000Z'
categories: 'technology'
tags: ''
excerpt:
  "When it comes to new and exciting technology, I'm often one of the first to
  jump on the bandwagon to see how the latest-and-greatest tech can improve my
  daily life. As a software engineer, I love the idea that with the right
  hardware and software combination, my day-to-day can improve and become easier
  more rapidly than ever before."
---

When it comes to new and exciting technology, I'm often one of the first to jump
on the bandwagon to see how the latest-and-greatest tech can improve my daily
life. As a software engineer, I love the idea that with the right hardware and
software combination, my day-to-day can improve and become easier more rapidly
than ever before.

But if that's the case, then why am I _just now_ looking into home automation?

[![](http://assets.brandonmartinez.com/brandonmartinez/2017/02/IMG_2883-1013x1800.png)](http://assets.brandonmartinez.com/brandonmartinez/2017/02/IMG_2883.png)
Honestly, I'm not sure. I can't really use the argument of not having any
hardware, as I've had a Nest thermostat since 2013. I can't even use the
argument of software-to-hardware incompatibility, as the amazing
[Homebridge](https://github.com/nfarina/homebridge) project has been around for
over a year. One thing I am certain of, though, is that I'm hooked!

My wife recently found a
[Chamberlain MyQ Garage Door Opener](http://www.chamberlain.com/smartphone-control-products/myq-garage/model-myq-g0201)
at Meijer for \$25 (that's nearly 80% of the list price). That purchase led me
to setting up a spare
[Raspberry Pi 2 as a Homebridge server](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi),
which then let me connect both the new garage door opener and the previously
purchased Nest into [HomeKit](http://www.apple.com/ios/home/) via one of the
many awesome
[Homebridge npm packages](https://www.npmjs.com/search?q=homebridge).

I was having so much fun configuring the few pieces of hardware I had available,
that I decided to integrate with a few of my IP cameras so that I can get a
dashboard view of my entire house. To do this, I wrote an npm package to
retrieve the latest snapshot from my [Sensr.net](https://sensr.net/) account, as
well as to channel the live MJPEG feed straight to my iPhone. You can find that
project here (I'll have a write-up soon that dives into more detail):
[homebridge-camera-sensr on Github](https://github.com/brandonmartinez/homebridge-camera-sensr).

[![](http://assets.brandonmartinez.com/brandonmartinez/2017/02/homekit-scene-editor-1200x1453.jpg)](http://assets.brandonmartinez.com/brandonmartinez/2017/02/homekit-scene-editor.jpg)And
just this past week, I picked up a
[Wemo Light Switch](http://www.belkin.com/us/p/P-F7C030/) to start the bigger
automation project: controlling lights and putting together "scenes" to automate
our home life. I started experimenting with a "Good Night" scene, where I can
utilize Siri with a quick "Hey Siri, Good Night" to start adjusting my home.
HomeKit will make sure my garage door is close, the entry way and front porch
lights are on, and set the thermostat to a comfortable nighttime temperature.

I have so many ideas for potential scenes, I can't wait to get more hardware.
This year at Christmas will be fun. A simple, "Hey Siri, Let It Snow" and the
Christmas lights turn on, the house lights dim, maybe an outdoor light display
kicks in, the possibilities are endless.

[![](http://assets.brandonmartinez.com/brandonmartinez/2017/02/homekit-control-center-1013x1800.png)](http://assets.brandonmartinez.com/brandonmartinez/2017/02/homekit-control-center.png)And
finally, I figured out how to configure my AppleTV 3rd Generation to allow me
remote access to control my devices. After reviewing
the [guide that Apple has](https://support.apple.com/en-us/HT207057), it was
just a matter of getting two-factor authentication enabled on my Apple ID and
ensuring that I was using the iCloud Keychain. Once those were enabled on both
my iPhone and AppleTV, they were able to communicate and expose my devices
remotely (note: this does not work with automations or IP cameras; that requires
an AppleTV 4th generation).

This is extremely useful, as there have been numerous times I've questioned
whether I closed the garage door or not. If I decide to get a HomeKit-enabled
lock for the front door, I'd be able to check on the status of that (we'll see;
I may do that this summer). And not only can I control all of this from just the
Home app, but a third panel gets added to the iOS control center showing my
favorite accessories and scenes. Instant, easy access to my home devices and
accessories.

Seriously, why didn't I do this sooner?
