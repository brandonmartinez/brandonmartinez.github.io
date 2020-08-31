---
coverImageUri: ''
title: 'Git, Capistrano, SSH, and WordPress'
datetime: '2009-08-18T01:00:36.000Z'
categories: 'technology'
tags: 'capistrano,deployment,php,programming,ruby,ssh,web,wordpress'
---

**UPDATE:** This tutorial has been updated! Several bugs have been fixed, please
be sure to read all of the updates (especially if you've referenced this
tutorial before).

Also, there is now a gem to help with the deployment script. Please visit the
[new tutorial](https://www.brandonmartinez.com/2010/03/28/git-capistrano-ssh-and-wordpress-revisited/)
after reading this one for more information.\[/update\]

I'm not going to lie: lately I've been on quite the WordPress-kick. I love being
able to create a design, cut it up into HTML-ready chunks, and then use a
standard WordPress template to get it into production and on the web ASAP!
Generally, my workflow looks like this:

1. Create the design
2. Cut it up for a web layout
3. Create a sample web layout and test across browsers
4. Cut the HTML up into a standard WordPress template
5. FTP the design to a WordPress install (into the _wp-content/themes_
   directory)

That doesn't seem too difficult, and it really isn't for the _first run_.
However, once I need to make changes to a design, it becomes a real hassle. Even
with the smallest change I would have to think about all of these variables:

- Which files changed that I will need to upload again
- If I forget a file, do I just re-upload the entire theme? That seems
  drastically inefficient!
- What if I need to rollback to an older version?
- Do I really need to open an FTP client every time I make a change?
- Why can't I automate all of this!?!?!

After finally putting up with enough, as well as having to manage four or five
WordPress blogs with the potential of more coming, I decided to do something
about it.

At heart, I am a Ruby on Rails developer. I love the framework, I love the
language, I love the people that work with the framework and the language. It's
one of the best ecosystems a programmer can become a part of. Now, being the
group of savvy programmers that the Rails community is, they developed an
awesome deployment tool:
[Capistrano](http://www.capify.org/ 'Capistrano: Capify!').

In short, Capistrano is a tool meant to deploy Ruby on Rails applications into
different environments (development, staging, test, production, you name it).
The tool is super-simple to use, and a breeze to setup, for a _Rails_ app. But I
wanted to take this into the PHP/WordPress world. After doing some research for
people with similar goals, I have put together this new, and definitely
improved, workflow.

## Step 1: Versioning

The first step is having your project versioned. Versioning allows you to work
on a project, save milestones and have the ability to rollback in the event of a
problem; you also get the added benefit of sharing source code amongst multiple
people and ensuring you're working with the latest version. My versioning system
of choice is _git_ (you can could use Subversion, as well). Installing git is
beyond the scope of this post, but you can checkout
[this article](http://book.git-scm.com/2_installing_git.html 'Installing Git on different OSs')
for more information.

Setting up your WordPress git repository is a two step process. First, you'll
want to setup a web server to store the master repository. This will be the main
repository that you will push the latest version to. Open up a terminal session
and use the following code to setup your remote repository, feel free to change
where you actually make your repository:

```bash
ssh username@domain.com $ Password: \*\*\*\*\*\*\*\*\*\*\*\* $ mkdir -p ~/git/domain.com.git $ cd ~/git/domain.com.git $ git --bare init $ exit
```

Also note: your web site will also need to have git installed. If you're note
sure how to do this, please contact your web host.

The next step is to setup your local repository; this is called your _working_
copy. Assuming that you already have a project ready, open up a terminal session
and do the following:

```bash
$ cd your/project/directory $ git init $ touch .gitignore $ git remote add origin ssh://username@domain.com/~/git/domain.com.git $ git add . $ git commit -m "First Commit into the Repository" $ git push origin master
```

There! You are now officially versioned!

## Step 2: Prepare Capistrano

A few requirements are needed for Capistrano to run properly: Ruby, Gems, and
obviously, Capistrano. Once again, this is far beyond the scope of this post,
but the people over at Ruby on Rails have a great
[getting started guide](http://rubyonrails.org/download 'Getting Started with Ruby (on Rails)')
(you only _need_ to follow it up until the Ruby Gems section, but feel free to
go on). Once you have Ruby and Gems installed, installing Capistrano is simply a
matter of running this in a terminal:

```bash
sudo gem install capistrano
```

Now that you have Capistrano installed, we can finally setup our WordPress
design for deployment. The first step is to reorganize our folder structure a
bit. Currently, this is how I have my folder setup for each WordPress site:

- Site Name/
  - config/
  - public/
    - index.php
    - page.php
    - stylesheet.css
    - images/
    - and so on

You will have to reorganize your folder structure to match this, as Capistrano
relies on this type of setup by default.

Next, start another terminal session, navigate to your projects folder, and run
the following command:

```bash
capify .
```

This command initializes all of the needed files within your _Site Name/_
directory. Next, you will need to edit your deploy.rb file under the config
directory. This is my current script:

```ruby
# WordPress Capistrano Setup default_run_options\[:pty\] = true

# The only options you'll probably have to modify set :user, 'yourusername' set
:domain, 'domainname.com' set :application, 'domainname.com' # feel free to
change this set :current_dir, "your_theme_name" ssh_options\[:keys\] =
%w(/Users/username/.ssh/id_dsa) # this is relative to your system

# These options should stay the same; only change based on your host set
:local_repository, "ssh://#{user}@#{domain}:git/#{application}.git" set
:repository, "/home/#{user}/git/#{application}.git" set :deploy_to,
"/home/#{user}/#{domain}/wp-content/themes/" set :releases_path,
"/home/#{user}/cap/#{domain}/releases/" set :shared_path,
"/home/#{user}/cap/#{domain}/shared/" set :scm, 'git' set :branch, 'master' set
:git_shallow_clone, 1 set :scm_verbose, true set :use_sudo, false set
:keep_releases, 100 ssh_options\[:forward_agent\] = true # use the keys for the
person running the cap command to check out the app

role :web, "#{domain}" role :app, "#{domain}" role :db, "#{domain}"

namespace :deploy do desc <<-DESC A macro-task that updates the code and fixes
the symlink. DESC task :default do transaction do update_code symlink end end

task :update_code, :except => { :no_release => true } do on_rollback { run "rm
-rf #{release_path}; true" } strategy.deploy! end

task :after_deploy do cleanup end

end
```

**UPDATE:** Changed some of the deploy script to match what is being done in the
new
[Ruby Gem](https://www.brandonmartinez.com/2010/03/28/git-capistrano-ssh-and-wordpress-revisited/)\[/update\]

As stated in the comment, you should really only have to change the first few
options.

## Step 3: Deployment

Finally, we've come to the part we've been waiting for: deploying our WordPress
theme. One of the first things we'll want to do is setup an SSH shared key. An
SSH shared key allows us to connect to a server through SSH without the need to
enter a password every time (which is very handy when deploying an app). To
setup an SSH key, enter the following terminal command:

```bash
ssh-keygen -t rsa
```

Then, to upload our newly generated SSH key, enter the following terminal
command:

```bash
cat ~/.ssh/id\_rsa.pub | ssh username@domain.com 'cat >> .ssh/authorized\_keys'
```

You'll be asked to enter your password, and then you're all set. To make sure
this worked, try to login to your server. If you're not asked to enter a
password, then success!

```bash
ssh username@domain.com
```

\[update\]I've found that if this continually does not work for you, try logging
into your host and using ssh from it first. For example:

```bash
 ssh username@domain.com
 # The server should greet you and give you a prompt
 # clear out any ssh steps you've done:
 rm -Rf ~/.ssh

 # use the ssh client to connect to yourself
 ssh username@domain.com
 # and you're done
 exit
 exit
```

After you've done that, retry the steps above; it should hopefully work now.

The last step is to setup the web server for Capistrano and to make our first
deployment. Once again, another terminal command is in order:

```bash
cap deploy:setup
cap deploy
```

As long as everything succeeds here, you've made your first deployment! Login to
your WordPress installation to see if your theme shows up.

## Step 4: Subsequent Updates

Once you have all of this setup, there are a few things to keep in mind. If you
want to commit a new change to the repository (if you'd like to share your
current progress with other users, or if you would like to "save" your work),
it's as simple as navigating to your public/ folder and issuing this command:

```bash
git add .
git commit -a -m "an update message"
# This next step is optional; you only need to do
# this if you want to push it to the actual web server
git push origin master
```

When you are ready to make another deployment, navigate to the top director
(Site Name/) and run your cap command again:

```bash
cap deploy
```

## Bonus! Automate Updates and Deployment

After working with this setup, I decided to automate it even more. It's not
uncommon to run this quite often on a newly developed site (especially when
you're working with a client and need to make minor adjustments), and as such,
even this process can get very time consuming. To combat this, I put all of
these update steps into a shell script (save this as DeploymentFunctions.sh or
something similar):

```bash
#!/bin/bash

# These are common functions used in deployment

# Parameters: $1: Site Name, $2: Site Base Dir commit\_and\_push() { if \[ -z "$1" \] then exit 0 fi

if \[ -z "$2" \] then exit 0 fi

echo "Committing and Pushing "$1"" cd ""$2""$1"/public/" git add . git commit -a -m "Auto-commit" git push origin master }

# Parameters: $1: Site Name, $2: Site Base Dir deploy() { if \[ -z "$1" \] then exit 0 fi

if \[ -z "$2" \] then exit 0 fi

cd ""$2""$1"" cap deploy open "http://"$1"/" }

# Parameters: $1: Site Name, $2: Site Base Dir commit\_push\_and\_deploy() { if \[ -z "$1" \] then exit 0 fi

if \[ -z "$2" \] then exit 0 fi

commit\_and\_push $1 $2 deploy $1 $2 }
```

**UPDATE:** Changed the line `git commit -m "Auto-commit"` to
`git commit -a -m "Auto-commit"`. Fixes an issue with adding new files into the
repo.

From here, I create a deploy script for all of my WordPress managed blogs,
similar to this:

```bash
#!/bin/bash

# As of now, I just have this as an absolute path
. /Library/Scripts/Web\\ Site\\ Deployment/DeploymentFunctions.sh commit\_push\_and\_deploy "domainname.com" "/Users/username/Sites/"
```

![One-Click Web Deployment Stack](http://assets.brandonmartinez.com/brandonmartinez/2009/08/DeploymentStackSS.jpg 'One-Click Web Deployment Stack')Since
I'm on a Mac, I just put all of these commit and deploy scripts into a single
directory, and make a stack in my dock. This basically gives me the option to
create a 1-Click-Deployment setup for my WordPress blogs.

## Acknowledgments

This tutorial and deployment script were heavily influenced by
[two](http://railstips.org/2008/11/24/gitn-your-shared-host-on "Git'n Your Shared Host On")
[railstips.org](http://railstips.org/2008/12/14/deploying-rails-on-dreamhost-with-passenger 'Deploying Rails on Dreamhost with Passenger')
articles.
