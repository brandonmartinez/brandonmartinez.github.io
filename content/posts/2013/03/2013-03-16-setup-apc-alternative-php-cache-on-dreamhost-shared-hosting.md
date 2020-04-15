---
coverImageUri: "11074"
title: "Setup APC (Alternative PHP Cache) on Dreamhost Shared Hosting"
datetime: "2013-03-16T15:00:23.000Z"
categories: "technology"
tags: "dreamhost,php,web hosting,wordpress"
---

If you use Dreamhost as your hosting provider, and more specifically, use their shared hosting service, you may notice that PHP performance is less than ideal. Luckily, Dreamhost gives one possible option to increase performance: installing and configuring [APC (Alternative PHP Cache)](http://php.net/manual/en/book.apc.php).

Before we begin, please note this is for **advanced users only**. You must meet these requirements to complete the install:

- An active Dreamhost account
- A user setup for shell access
- A domain running PHP 5.3 on FastCGI
- A terminal/shell application to connect to your account via SSH

These are the steps to install and configure APC:

1. Login through your terminal application
2. Run the following script: ```bash
# Navigate to your home directory (should already be there, but just in case) cd ~/ # Create a folder to download the latest stable version of APC mkdir download cd download # Download the latest version of APC (3.19 as of this post) http://pecl.php.net/package/APC wget http://pecl.php.net/get/APC-3.1.9.tgz # Unpack the downloaded tarball and navigate into it: tar xvf APC-3.1.9.tgz cd APC-3.1.9 # phpize the source /usr/local/php53/bin/phpize # configure and make the source ./configure --with-php-config=/usr/local/php53/bin/php-config; make # create a directory to copy the finished module into mkdir -p ~/.php/modules # copy the compiled module cp modules/apc.so ~/.php/modules/apc.so # Create a directory for a custom php config mkdir -p ~/.php/5.3 # Add the module to the custom PHP config echo extension = ~/.php/modules/apc.so >> ~/.php/5.3/phprc # Open phprc for editing (be sure to hit enter if the following command doesn't run) nano ~/.php/5.3/phprc
```
3. Paste the following **after** the _extension_ line (be sure to edit apc.filters with the path to your webroot): ```bash
\[APC\] extension = apc.so apc.enabled = 1 apc.shm\_segments = 1 apc.shm\_size = 32M apc.optimization = 0 apc.num\_files\_hint = 512 apc.user\_entries\_hint = 1024 apc.ttl = 0 apc.user\_ttl = 0 apc.gc\_ttl = 600 apc.cache\_by\_default = 0 apc.filters = "-/home/yourusername/yourwebsite.com/apc\\.php$" apc.slam\_defense = 0 apc.use\_request\_time = 1 apc.mmap\_file\_mask = /tmp/apc-accountname.XXXXXX ;OR apc.mmap\_file\_mask = /dev/zero apc.file\_update\_protection = 2 apc.enable\_cli = 0 apc.max\_file\_size = 2M apc.stat = 1 apc.write\_lock = 1 apc.report\_autofilter = 0 apc.include\_once\_override = 0 apc.rfc1867 = 0 apc.rfc1867\_prefix = "upload\_" apc.rfc1867\_name = "APC\_UPLOAD\_PROGRESS" apc.rfc1867\_freq = 0 apc.localcache = 1 apc.localcache.size = 512 apc.coredump\_unmap = 0 apc.stat\_ctime = 0
```
4. Hit Ctrl+O then enter to save your file, followed by Ctrl+X to exit nano
5. Copy apc.php into your webroot so you can see the status of your install: ```bash
cp ~/download/APC-3.1.9/apc.php ~/yourwebsite.com/apc.php
```
6. Open top: ```bash
top
```
7. Once top is open, check to see if php53.cgi (or similar) process is running; if it is, you'll have to kill them. Hit "q" to exit top, then run the following command: [![sshphp53cgi-1](http://assets.brandonmartinez.com/brandonmartinez/2013/03/sshphp53cgi-1.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/sshphp53cgi-1.png) ```bash
killall php53.cgi
```
    
    Run that command a few times until you receive a "php53.cgi: no process found" message.
8. Navigate to yourwebsite.com/apc.php to see the status of APC: [![apc](http://assets.brandonmartinez.com/brandonmartinez/2013/03/apc-575x352.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/apc.png) Ideally, your fragmentation should be under 50%.
9. If all looks well, remove the apc.php file from your site: ```bash
rm ~/yourwebsite.com/apc.php
```
10. Done!

There are many benefits to using APC, especially when you use it in conjunction with applications like WordPress. In my next post, I'll show you how to configure WordPress and [W3 Total Cache](http://wordpress.org/extend/plugins/w3-total-cache/ "WordPress Plugin Directory | W3 Total Cache") to get the best performance from your WordPress application on Dreamhost shared hosting.

### References

- [Hacking the Valley: WordPress Tuneup for Shared Hosting: PHP APC and WP Super Cache](http://blog.hackingthevalley.com/tag/php-apc/ "Hacking the Valley | WordPress Tuneup for Shared Hosting: PHP APC and WP Super Cache")
- [Chris Gilligan: How to Configure APC Cache on Virtual Servers with PHP running under FCGId](http://chrisgilligan.com/wordpress/how-to-configure-apc-cache-on-virtual-servers-with-php-running-under-fcgid/ "Chris Gilligan | How to Configure APC Cache on Virtual Servers with PHP running under FCGId")
- [Greg Rickaby: The Perfect APC Configuration](http://gregrickaby.com/2012/01/the-perfect-apc-configuration.html "Greg Rickaby | The Perfect APC Configuration")
