---
id: "10858"
coverImageUri: ""
title: "Get Database Size in SQL Server Using T-SQL"
date: "2012-11-29"
datetime: "2012-11-29T22:00:48.000Z"
categories: "technology"
tags: "sql,sql server,tips"
---

Today's quick tip: get the size of your database in SQL Server (including SQL Azure) by using a T-SQL statement.

Connect to your database, and execute this query:

```sql
SELECT ( (SUM(Reserved\_Page\_Count) \* 8.0) / 1024 / 1024 ) AS DatabaseSizeInGigabytes FROM sys.dm\_db\_partition\_stats
```

Very useful in Azure where it's not easy or apparent to get the database's total size.
