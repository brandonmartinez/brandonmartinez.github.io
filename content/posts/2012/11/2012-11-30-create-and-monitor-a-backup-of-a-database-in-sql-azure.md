---
id: "10873"
coverImageUri: ""
title: "Create and Monitor a Backup of a Database in SQL Azure"
date: "2012-11-30"
datetime: "2012-11-30T23:00:35.000Z"
categories: "technology"
tags: "sql,sql server,tips,windows azure"
---

SQL Azure provides a scriptable, easy way to create a backup of a database from within SQL Management Studio. This is very useful if you need to create a backup before making a large production change, or if you just need an archive/snapshot of your current data.

Additionally, SQL Azure gives you the ability to check on the status of the backup via a SQL query. Using that, we can create a small script to monitor the status of the backup and let us know when it has finished:

```sql
CREATE DATABASE TheNameOfYourDatabaseBackup AS COPY OF TheNameOfYourDatabaseToBeBackedUp

GO

PRINT 'Backup started at ' + CAST(DATEADD(hh, -5, GETDATE()) AS VARCHAR(100))

WHILE (SELECT state\_desc FROM sys.databases WHERE Name = 'TheNameOfYourDatabaseBackup') = 'COPYING' BEGIN -- Check every minute to see if the backup has completed WAITFOR DELAY '00:01' END

PRINT 'Backup completed at ' + CAST(DATEADD(hh, -5, GETDATE()) AS VARCHAR(100))

GO
```

A few notes:

- Azure enforces the _CREATE DATABASE X AS COPY OF Y_ to run as its own batch. The _GO_ statements should take care of that, but I have not tested it. If you get an error, just run that line on its own.
- I am shifting the _GETDATE()_ function to my timezone. Change _\-5_ to whatever your GMT offset is.
- _[WAITFOR DELAY '00:01'](http://blog.sqlauthority.com/2007/06/18/sql-server-delay-function-waitfor-clause-delay-execution-of-commands/ "SQL SERVER — Delay Function — WAITFOR clause — Delay Execution of Commands")_ delays the check for one minute. You can change this to whatever suits your needs: '1:00' for every hour, '00:00:01' for every second, and so on.
