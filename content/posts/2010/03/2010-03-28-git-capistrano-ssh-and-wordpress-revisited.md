---
coverImageUri: ""
title: "Git, Capistrano, SSH, and WordPress: Revisited"
datetime: "2010-03-28T14:31:15.000Z"
categories: "technology"
tags: "capistrano,deployment,php,programming,ruby,ssh"
---

In my last [Git, Capistrano, SSH, and WordPress tutorial](https://www.brandonmartinez.com/2009/08/17/git-capistrano-ssh-and-wordpress-an-awesome-combination/), I showed you how to setup your WordPress theme to be easily deployable. Now, I've simplified the process even more by eliminating a large amount of duplicate code.

I recently published my first Ruby Gem, [capistrano-wordpress](http://rubygems.org/gems/capistrano-wordpress) ([source](http://github.com/brandonmartinez/capistrano-wordpress)). This gem adds a new "recipe" that is available to any Capistrano deploy script. So now, our deploy script from the last tutorial becomes this:

\[ruby\]set :user, 'yourusername' set :domain, 'yourdomain.com' set :application, domain # in the off chance that this doesn't match your domain, just specify it set :theme\_name, 'yourthemename' # your theme name here

role :web, domain role :app, domain role :db, domain

require 'capistrano\_wordpress'\[/ruby\]

This Gem takes a few assumptions into consideration. Firstly, these are your deploy paths:

\[ruby\]set :appdir, "/home/#{user}/deployments/#{application}" set :deploy\_to, "/home/#{user}/#{domain}/wp-content/themes/" set :releases\_path, "/home/#{user}/cap/#{domain}/releases/" set :shared\_path, "/home/#{user}/cap/#{domain}/shared/"\[/ruby\]

And these are your repository paths:

\[ruby\]set :local\_repository, "ssh://#{user}@#{domain}/~/git/#{application}.git" set :repository, "/home/#{user}/git/#{application}.git"\[/ruby\]

I do plan on upgraded the gem to allow you to properly override these variables (using _\_cset_), but I was having a lot of issues while doing so (it may take some time). I will announce when I make the update, and I will also revise this post.

Another thing to keep in mind: make sure that you include the _require 'capistrano\_wordpress'_ line and that it is **at the bottom** of your deploy script.

This gem works wonders when you are consistently deploying to similar server setups (in my case, Dreamhost shared-hosting).

## To-Do

There are a lot of other things that I would like to see from this gem, and I will try to add them when I can. If you would like to help, you can visit the gem's [source code](http://github.com/brandonmartinez/capistrano-wordpress) and create a branch. Features I would like to see:

- Automate generation of SSH keys if none are present.
- Automate setup of Git repository.
- Allow overriding of all variables in the deploy script
- Add the ability to do a _deploy:commit\_and\_deploy -m "Commit message"_ all from the capistrano script (simplifies the one-click deploy scripts in the last tutorial, and it also makes it easier to commit and deploy from the terminal).
