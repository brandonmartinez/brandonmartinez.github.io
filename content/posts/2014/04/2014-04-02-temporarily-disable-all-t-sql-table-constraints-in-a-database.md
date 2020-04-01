---
id: "15411"
coverImageUri: ""
title: "Temporarily Disable All T-SQL Table Constraints in a Database"
date: "2014-04-02"
datetime: "2014-04-02T21:10:49.000Z"
categories: "technology"
tags: "sql,sql server,t-sql,tips"
---

After generating a set of scripts to import production data to a local development database, I ran into an issue with constraints blocking the inserts (this is on a fresh database structure). To get around the issue, execute this T-SQL command on your database:

```sql
EXEC sp\_msforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT all"
```

You can now insert data without constraints blocking the action. Once you've finished the import, you can re-enable all constraints using this command:

```sql
EXEC sp\_msforeachtable "ALTER TABLE ? WITH CHECK CHECK CONSTRAINT all"
```

And please, **don't** use this on a production database! Development or testing only!

One more tip: if you see the following error, you've most likely inserted data that violates one of your constraints. Check to make sure all of your inserts have succeeded.

`The ALTER TABLE statement conflicted with the FOREIGN KEY constraint "FK_YOUR_FOREIGN_KEY_CONSTRAINT".`
