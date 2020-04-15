---
coverImageUri: ""
title: "Import Large SQL Scripts into SQL Server"
datetime: "2013-09-25T16:30:43.000Z"
categories: "technology"
tags: "sql server"
---

Today's quick tip is brought to you by the following error message:

[![Cannot Execute Script](http://assets.brandonmartinez.com/brandonmartinez/2013/09/insufficient.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/09/insufficient.png)

I received that when trying to import a 31,000 line SQL file via SQL Server Management Studio. If you're just trying to run a single script, you can drop into a command line and use _sqlcmd_:

```bash
sqlcmd -S myServer\\instanceName -i C:\\myScript.sql -o C:\\EmpAdds.txt
```

Via Microsoft Technet: [Run Transact-SQL Script Files Using sqlcmd](http://technet.microsoft.com/en-us/library/ms170572.aspx "Microsoft Technet | Run Transact-SQL Script Files Using sqlcmd").
