---
coverImageUri: ''
title: 'Simultaneously Build Multiple VCS Branches In TeamCity'
datetime: '2013-03-29T16:30:45.000Z'
categories: 'technology'
tags: 'agile,continuous integration,scrum,teamcity,tips'
---

Another quick TeamCity tip: how to configure your VCS build settings to trigger
on multiple branches.

We use a branching system in Mercurial based on something similar to this:

- Default Branch
  - Sprint-YYYMMDD Branch
    - Story Branch
    - Story Branch
    - Story Branch

So, at a normal given time, we'll have two stable branches: Default, and
Sprint-\*. We can configure TeamCity to build the default branch, as well as any
Sprint-\* branch:

[![01_vcssetup](http://assets.brandonmartinez.com/brandonmartinez/2013/03/01_vcssetup-575x493.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/01_vcssetup.png)

Then, anytime we check-in to one of those branches, it triggers a build and
labels the branches appropriately:

[![02_branchesonbuild](http://assets.brandonmartinez.com/brandonmartinez/2013/03/02_branchesonbuild-575x105.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/02_branchesonbuild.png)

It even adds an "Active Branches" drop down for filtering:

[![03_activebranches](http://assets.brandonmartinez.com/brandonmartinez/2013/03/03_activebranches.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/03_activebranches.png)

This has proven to be very useful in making sure our default and sprint branches
stay stable, as we can build, run unit tests, and other tasks to check the
integrity of our code.
