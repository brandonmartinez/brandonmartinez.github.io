---
id: '17541'
coverImageUri: ''
title: 'Force Drop a Database From T-SQL'
date: '2015-03-31'
datetime: '2015-03-31T14:25:49.000Z'
categories: 'technology'
tags: 'sql server,t-sql,tips'
excerpt:
  "While it's rather easy to force drop a database from SQL Server Management
  Studio's UI, it's just as easy to script it out:"
---

While it's rather easy to force drop a database from SQL Server Management
Studio's UI, it's just as easy to script it out:

```sql
ALTER DATABASE [YOUR-DATABASE-NAME] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO
USE MASTER
GO
DROP DATABASE [YOUR-DATABASE-NAME]
GO
CREATE DATABASE [YOUR-DATABASE-NAME]
GO
```
