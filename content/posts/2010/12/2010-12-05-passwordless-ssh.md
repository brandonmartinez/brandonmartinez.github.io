---
coverImageUri: ""
title: "Passwordless SSH"
datetime: "2010-12-05T14:00:56.000Z"
categories: "technology"
tags: "ssh,terminal"
---

I use my site for a lot of reasons: sharing information with the world, posting projects, and sharing my photography. Another use, however, is a reminder for myself on how to do something. This is one of those cases: how to connect to an SSH server without the need of a password.

This is a very simple process, and I've actually [written about it before](/2009/08/17/git-capistrano-ssh-and-wordpress-an-awesome-combination/ "Git, Capistrano, SSH, and WordPress") (I just wanted a dedicated tutorial).

## Step One: Create a Public Key

You'll need to do this on every machine that you want to SSH into (local and remote). Locally, open up a terminal session, or login into your remote server via SSH, and run this command:

```bash
$ ssh-keygen -t rsa
```

You'll be prompted a few times:

```bash
Generating public/private rsa key pair. Enter file in which to save the key (~/.ssh/id\_rsa): \[hit enter\] Enter passphrase (empty for no passphrase): \[hit enter\] Enter same passphrase again: \[hit enter\] Your identification has been saved in ~/.ssh/id\_rsa. Your public key has been saved in ~/.ssh/id\_rsa.pub. The key fingerprint is: \[Your Key\] The key's randomart image is: +--\[ RSA 2048\]----+ \[A Crazy Image\] +-----------------+
```

If you've already done this on a machine, there is **no need to do it again**.

## Step Two: Copy Your Key To the Remote Machine

Now that you have a public key available, you can append it to the authorized\_keys file of the remote host. Run the following command locally:

```bash
$ cat ~/.ssh/id\_rsa.pub | ssh username@domain.com "mkdir ~/.ssh; cat >> ~/.ssh/authorized\_keys" 
```

You'll be prompted for your password; assuming that everything has been completed properly, this should be the last time you need to enter it to connect to the remote host.

## Step Three: Attempt to Connect

You should now be able to connect to your server without the need of a password:

```bash
$ ssh username@domain.com
```
