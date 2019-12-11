---
layout: post
title: 'Secret sauces of Git'
date: 2016-06-10 07:00:00
categories: articles
tags: [Git, Github, version control]
excerpt: 'Here I go through some advance use of Git as part of my daily workflow'
permalink:
thumbnail:
comment: true
private: false
---

<p class="lead">Git is an essential part of my daily workflow. There are certain awkward situations that require use of certain Git commands that are normally not part of regular workflows.</p>

As part of agile workflow at [Rated People](http://ratedpeople.com) we use [Atlassian JIRA](http://atlassian.com/jira) – tightly coupled with many other integrated technologies &ndash; all together making a combined workflow of TDD, CD and CI. To make sure JIRA tickets are tracked correctly we enforce that each commit message should include JIRA ticket number in it. On failing to do so developers get an error and not able to push changes to remote.

### Update last commit message:
Let's say, I forgot to add JIRA ticket number in a commit that I just finalised. Now I cannot push the changes until commit message is updated with a JIRA ticket number. In such situation, to edit most recent commit message I use following Git command:

```bash
$ git commit --amend
```

This will open commit message in default Git editor where I can edit the commit message and save the changes. Now I can push the latest commits with no problem.

> You can set a default Git editor using `$ git config --global core.editor {editor_name}` where replace `editor_name` with correct editor name i.e. vim, pico, nano etc.

### Update few commit messages:
But sometimes when I have some [good music](http://soundcloud.com/jabran-rafique) going in the headphones, I may randomly forget to add JIRA ticket number in multiple commit messages. In such case, above command to amend the last commit message is not useful anymore. Instead following command that uses `rebase` with a flag and number of commits to amend works better:

```bash
$ git rebase -i HEAD~{n}
```

Where `n` is number of commits to be listed. Here comes the interesting part as this command is completed in following two steps:

#### Step 1
Opens a list of specified number of commits in default editor in following format.

```bash
pick commit_hash commit_message
```

To update a commit message, we replace `pick` with `reword` and above line becomes:
```bash
reword commit_hash commit_message
```

> Beware that removing a complete line will result in lost of commit.

At the bottom it also lists out all the available options.
```bash
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
```

Saving the changes completes step 1 and enters into step 2.

#### Step 2
Each commit prefixed with word `reword` will open one after each other where commit messages can be updated as required. Save and exit to update the commit messages.

### Pushing updated commit messages:
Now like me, if you were too quick to push the changes to remote then you cannot push any changes made to the commits using one of the above methods. Use `--force` flag to push changes to remote with updated commits.

```bash
$ git push origin HEAD --force
```

### Remove remote branch:
Sometimes we create unwanted or wrong branches in remote but unable to delete those &ndash; perhaps due to limited permissions. Use following Git command to permanently delete a branch in remote:

```bash
$ git push origin --delete {branch_name}
```

> Beware that this action CANNOT be undone. A branch deleted from remote cannot easily be recovered so proceed with caution and backup branches first.

### Add changes to finalised commit:
Sometimes we finalise commits only to realise that there were few more changes that could have been part of the same commit. Enter Git soft reset:

```bash
$ git reset --soft HEAD~{n}
```

Where `n` is a number of one finalised commit message that will be reset softly. Once done with further changes use following command to finalise the commit again by retaining the existing commit message.

```bash
$ git commit -c ORIG_MSG
```

### Fancy Git log:
A last but not lease and my favourite Git log command is combination of multiple flags that outputs an interactive view of Git history.

```bash
$ git log -{n} --oneline --stats --color --graph --pretty
```

Where `n` is number of commits to be shown as part of the log.
