---
coverImageUri: ''
title: 'How to Copy Large Amounts of Data in OS X'
datetime: '2015-06-20T12:55:25.000Z'
categories: 'technology'
tags: 'backup,hardware,mac os x,rsync'
excerpt:
  "One of my primary external hard drives is starting to fail. It's the drive I
  use for almost all of my media, including my iTunes library and probably most
  importantly, my Lightroom photo library. I decided to upgrade my 3TB drive to
  a MyBook Duo 8TB to get a high-capacity, mirrored-drive setup."
---

One of my primary external hard drives is starting to fail. It's the drive I use
for almost all of my media, including my iTunes library and probably most
importantly, my Lightroom photo library. I decided to upgrade my 3TB drive to a
[MyBook Duo 8TB](http://www.amazon.com/Book-dual-drive-high-speed-premium-storage/dp/B00LEF28CI 'WD My Book Duo 12TB dual-drive, high-speed premium RAID storage | Amazon.com')
to get a high-capacity, mirrored-drive setup.

In doing so, I had a small problem: I needed to copy over 2TB of data to this
new drive. If I used the Finder, any hiccup along the way would require me to
restart the process. For smaller amounts of data, I would just copy individual
subfolders, so if one failed there'd be less to copy. That. Is. Tedious.

After some research, I came across this brilliant, safe, and most importantly,
**fast** method: use rsync! When in doubt, turn to the terminal, right?

I ran this command on my top-level folders to copy from the old drive to the
new:

```bash
sudo rsync -vaE --progress /Volumes/SourceDrive/TopLevelFolder _
/Volumes/DestinationDrive
```

A few notes to point out, since I made a few mistakes that weren't readily
apparent in the
[StackExchange answer](http://apple.stackexchange.com/questions/117465/fastest-and-safest-way-to-copy-massive-data-from-one-external-drive-to-another 'Fastest and safest way to copy massive data from one external drive to another| AskDifferent on StackExchange'):

- Your destination path should be the folder that you want to copy _into_. In my
  first copies, I included the destination folder name I expected, so my path
  ended up being
  `/Volumes/DestinationDrive/DestinationFolder/DestinationFolder`.
- No trailing slashes!
- This is a long process. The beauty of rsync, though, is that if it fails you
  can resume it! This actually happened to me, since OS X decided to disconnect
  the drives in the middle of the night. All you have to do is run the exact
  same command again and it'll pickup where it left off after doing a quick
  scan.
- You can run multiple jobs at a time. Just open multiple terminal windows/tabs
  and run the command again.
- For a more in-depth explanation on each of the rsync flags, refer to the
  [AskDifferent StackExchange answer](http://apple.stackexchange.com/a/117469/4793 'Fastest and safest way to copy massive data from one external drive to another| AskDifferent on StackExchange').

I hope this helps you as much as it helps me. Happy copying!
