---
coverImageUri: ''
title: 'Git Tip: Remove All Local Branches Except Master'
datetime: '2018-10-15T15:26:36.000Z'
categories: 'technology'
tags: 'git'
excerpt:
  Just a quick git tip I found that has been really useful in my git-management
  workflow.
---

Just a quick `git` tip I found that has been really useful in my git-management
workflow. If you want to remove all local branches except master (useful when
following gitflow-like conventions and you have a lot of feature branches), run
this command:

```bash
git branch | grep -v "master" | xargs git branch -D
```

You can make this even easier by adding it as a git alias:

```bash
git config --global alias.gbr '!git branch | grep -v "master" | xargs git branch -D'
```

To run the command, just run this:

```bash
git gbr
```

Awesome when you're finishing up a sprint and don't need your local copies
anymore!
