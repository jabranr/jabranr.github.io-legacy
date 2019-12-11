---
layout: post
title: 'Automatic database backup using Git (Bitbucket/GitLab/Github)'
date: 2016-04-25 8:00:00
categories: articles
tags:
  [
    'database',
    'backup',
    'version control',
    'github',
    'bitbucket',
    'gitlab',
    'bash',
    'cron',
    'git',
    'Ubuntu',
    'Linux',
  ]
excerpt: 'Set up an automaic backup cron job and host data using version control'
permalink:
thumbnail:
comment: true
private: false
---

> This walk-through is based on Ubuntu 12LTS+ to backup MySQL databases. It may be usable to backup other type of databases with additional to no tweaks. Use this as guidelines only and always try on a dummy database before setting it up on a production database. Of course by all means trying it is completely at your own risk.

If your work involves a database or collection of databases there are high chances that you need to create backups on regular basis to make sure you do not loose any valuable data. Setting up an automatic backup task is probably the most easiest way of making sure that everything is in order. One of the ways is to setup a cron job for such a task that would run at specific intervals.

Another concern in this automated task is to where to store such valuable data and most easy way to restore it when required. Using a private Git respository on one of the services ([Bitbucket](https://bitbucket.org) / [GitLab](https://gitlab.com) / [Github](https://github.com)) is a cheap, secure and efficient way.

## Setup a cron user

Let's start with creating a special MySQL user called `cron_user` but you can name it anything you like. Login into MySQL by replacing USER with your username:

```bash
$ mysql -u USER -p
```

Create a new user with password (always use a strong password and make sure to save it to safe place before moving forward):

```bash
$ CREATE USER 'cron_user'@'localhost' IDENTIFIED BY 'someStrongPassword';
```

Now grant only specific privileges to this user and flush privileges to bring all changes in effect:

```bash
$ GRANT SELECT,LOCK TABLES, EVENT, TRIGGER, SHOW VIEW PRIVILEGES ON *.* TO 'cron_user'@'localhost';
$ FLUSH PRIVILEGES;
```

Our `cron_user` is ready for use now.

## Setup local and remote repository

Now create a fresh empty repository now on any of above mentioned services and name is `database-backups`. Now `ssh` to your server using any Terminal app and make a backup directory at `/home/backup` and `cd` into it.

```bash
$ mkdir -p /home/backup/database-backups && cd /home/backup/database-backups
```

Create a shell script file and make it executable.

```bash
$ touch cron_backup.sh
$ chmod +x cron_backup.sh
```

Add Git and add remote repository.

```bash
$ git init
$ git remote add origin {path/to/remote/database-backups.git}
$ git add -A
$ git commit -am 'Add files'
$ git push -u origin HEAD
```

## Setup cron script

Use any of your favourite editor to edit the file. Here I am using `nano`.

```bash
$ nano cron_backup.sh
```

Add following script, save and exit of editor (CTRL x).

```bash
#!/bin/sh
# Set variables
DB_NAME="foo"
CRON_USER="bar"

FULLDATE=$(date +"%Y-%d-%m %H:%M")
NOW=$(date +"%Y-%m-%d-%H-%M")
MYSQL_DUMP=`which mysqldump`
GIT=`which git`
TEMP_BACKUP="latest_backup.sql"
BACKUP_DIR=$(date +"%Y/%m")

# Check current Git status and update
${GIT} status
${GIT} pull origin HEAD

# Dump database
${MYSQL_DUMP} -u "$CRON_USER" $DB_NAME > $TEMP_BACKUP &
wait

# Make backup directory if not exists (format: {year}/{month}/)
if [ ! -d "$BACKUP_DIR" ]; then
  mkdir -p $BACKUP_DIR
fi

# Compress SQL dump
tar -cvzf $BACKUP_DIR/$DB_NAME-$NOW-sql.tar.gz $TEMP_BACKUP

# Remove original SQL dump
rm -f $TEMP_BACKUP

# Add to Git and commit
${GIT} add -A
${GIT} commit -m "Automatic backup - $FULLDATE"
${GIT} push origin HEAD
```

Let's go through what each line does in this script:

- `#!/bin/sh` tells that this script will use shell from this path
- Next block sets different values in variables so we can reuse those in script. Here you will only need to update `DB_NAME` for your database name and `CRON_USER` with your specially created cron user name.
- `${GIT} status` checks for current status of the repository
- `${GIT} pull` performs fetch and pull to get latest from remote
- `${MYSQL_DUMP} -u "$CRON_USER" $DB_NAME > $TEMP_BACKUP & wait` performs a MySQL dump and save it as a temporary file.
- Next block of script checks if a directory exists and if not then creates it. To keep the backup structured we setup directories in {year}/{month}/ format.
- `tar -cvzf $BACKUP_DIR/$DB_NAME-$NOW-sql.tar.gz $TEMP_BACKUP` compresses and saves the temporary MySQL dump file with dated name. This shall save us a massive amount of space as repository grows bigger with each backup.
- `rm -f $TEMP_BACKUP` removes the original MySQL dump file as we do not want duplicates.
- Next block literally adds the newly created backup file to version control and commit with a dated message before it pushes it back to remote.

Running this short script will dump the specified database, gzip it using `tar` and then add it to a Git repository before updating to remote. But to make this script work, we need to make sure that some settings are in place.

## Setup `mysqldump` credentials

As you may have noticed that you did not have to enter any password for MySQL `CRON_USER`. If we run this script now, it will fail and return an authentication error. We could create user with no password and avoid this error but we should not have a MySQL user interacting with database without an empty or no password &ndash; as it would a serious security risk even though this user has limited permissions. To make sure that `mysqldump` does not return an authentication error, let's create a file `.my.cnf` at user root level.

```bash
$ cd
$ nano ~/.my.cnf
```

Add following credentials to this file.

```bash
[mysqldump]
user=CRON_USER_NAME
password=CRON_USER_PASSWORD
```

Make sure to update `CRON_USER_NAME` and `CRON_USER_PASSWORD` with correct credentials. Save and exit the editor (CTRL x). Now we have fixed the authentication issue. If we have run the script now by issuing following command, we can see our remote repository being updated with a file of fresh backup.

```bash
$ ./cron_backup.sh
```

Reference: [Stackoverflow](http://stackoverflow.com/questions/9293042/mysqldump-without-the-password-prompt)

## Setup cron job

Our next step is to setup a cron job so this script runs a specific time automically. Issue following command to edit the cron job file.

```bash
$ crontab -u USER -e
```

Replace `USER` with correct user name who has the permissions to repository and the backup directory. This shall open the cron job file in an editor. Navigate to the end of the file and add following line.

```bash
@daily cd /home/backup/database-backups; /home/backup/database-backups/cron_backup.sh > /dev/null 2>&1
```

This line creates a daily cron job for midnight. It will change directory to `/home/backup/database-backups` and then run `cron_backup.sh`.

[Here is a Gist](https://gist.github.com/jabranr/d4939b2b48fdcadc74765a3ed04d8157) for cron script.
