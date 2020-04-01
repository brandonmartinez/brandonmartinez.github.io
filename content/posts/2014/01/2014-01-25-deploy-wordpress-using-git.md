---
id: "13531"
coverImageUri: ""
title: "Deploy WordPress Using Git"
date: "2014-01-25"
datetime: "2014-01-25T23:00:52.000Z"
categories: "technology"
tags: "continuous integration,deployment,git,wordpress"
---

With this site's recent [migration to Windows Azure](https://www.brandonmartinez.com/2013/11/22/moved-to-the-cloud-with-windows-azure/ "Moved to the Cloud With Windows Azure"), the true power of Git-based deployments has become very apparent. Being able to source control an entire WordPress site, including plugins, themes, configuration, and of course, WordPress itself, makes it very convenient to manage. Adding automatic deployments just sweetens the deal.

If you're not running on Windows Azure, but still want to take advantage of Git-based deployments, it's a relatively easy process to setup. I've tested this setup on multiple sites and it's been working very well for me.

## Assumptions

A few assumptions are made for this tutorial:

- You are at least somewhat familiar with using Git from the terminal/command line.
- Your WordPress site is already stored in a Git repository (including WordPress, themes, plugins, etc).
- You have SSH access to your web server.
- You are allowed to run shell scripts on your web server.
- This tutorial is pretty Mac-oriented, but this could be done easily on Windows or \*nix.

## Step 1: Setup a Passwordless SSH Login

Technically, this step is optional, but it makes it a ton easier to deploy your code. I've [written on how to do this before](https://www.brandonmartinez.com/2010/12/05/passwordless-ssh/ "Passwordless SSH"), but I recently found a cool [homebrew](http://brew.sh/ "Homebrew") script that makes the process a lot easier: [ssh-copy-id](http://linux.die.net/man/1/ssh-copy-id "SSH Copy Id").

To install it, run this from the terminal:

```bash
$ brew install ssh-copy-id
```

You can then push your shared key to your server by running this command:

```bash
$ ssh-copy-id {USER NAME}@{DOMAIN NAME}.com
```

You should be prompted for your account's password; enter that and it'll complete the process.

## Step 2: Prepare the Server

Remote into your web server:

```bash
$ ssh {USER NAME}@{DOMAIN NAME}.com
```

Assuming you're in your home folder (i.e. _~/_), create a backup folder:

```bash
$ mkdir backup
```

We're going to use that to backup the WordPress _uploads_ folder, as well as automatically backup our database on each deployment.

Copy your WordPress uploads folder into the backup folder:

```bash
$ cp -R {DOMAIN NAME}.com/wp-content/uploads backup/uploads
```

If there are any additional folders that you'd like to backup, follow a similar pattern.

Optionally, if you'd like to backup your database before each new deployment, create a _database_ folder as well:

```bash
$ mkdir backup/database
```

Next, we'll prepare a new Git repository for deployment:

```bash
$ mkdir {DOMAIN NAME}.git $ cd {DOMAIN NAME}.git $ git init --bare $ touch hooks/post-receive $ nano hooks/post-receive
```

This should leave you with a text editor open. If you don't have nano on your webserver, use whichever text editor you'd like. Paste the following into your text editor, then edit to substitute your proper configuration. Keep in mind that the _mysqldump_ section is optional.

```bash
#!/bin/sh

\# Backup database first, just in case we need to roll back mysqldump -h mysql.{DOMAIN NAME}.com -u {DATABASE USER} -p{DATABASE PASSWORD} {DATABASE NAME} &gt; {HOME FOLDER PATH}/backup/database/{DATABASE NAME}\_$(date +&quot;%Y\_%m\_%d\_%H\_%M&quot;).sql

\# Checkout received push to deploy folder (overwrites everything) git --work-tree={HOME FOLDER PATH}/{DOMAIN NAME}.com --git-dir={HOME FOLDER PATH}/{DOMAIN NAME}.git checkout -f
```

You can then press _Ctrl+O_ to write the changes, followed by _Ctrl+X_ to exit the editor. You'll then have to add execute permissions to the newly created script:

```bash
$ chmod +x hooks/post-receive
```

Server configuration is completed. Type _exit_ followed by a return to exit the remote session.

## Step 3: Add the Remote Location to Your Repository

Navigate to your local Git repository, then run this command:

```bash
$ git remote add production ssh://{USER NAME}@{DOMAIN NAME}.com/{HOME FOLDER PATH}/{DOMAIN NAME}.git
```

You can then push your repository to your new remote location; this should trigger a deploy.

```bash
$ git push production master
```

## Done!

And that's it! Now you can just push to your production remote head anytime you want to deploy your repository to your live site. Additionally, you could add additional remote branches to create development, testing, or staging servers and add them in a similar fashion.

As a note, I've tested this process on multiple [Dreamhost](http://www.dreamhost.com/ "Dreamhost") websites and it works very well. You may have to make adjustments depending on your host. Good luck and happy deploying!

**Update 01/27/2014:** As asked in the comments below by [Prasad](https://www.brandonmartinez.com/2014/01/25/deploy-wordpress-using-git/#comment-1218310898), there is the concern of WordPress 2.7+ and the new auto-updating system. As per [this post on the Make WordPress Core blog](http://make.wordpress.org/core/2013/10/25/the-definitive-guide-to-disabling-auto-updates-in-wordpress-3-7/ "The definitive guide to disabling auto updates in WordPress 3.7"), WordPress tries very hard to detect how you've deployed your site. If you use any common version control system, it will disable the auto-update feature.
