---
coverImageUri: ""
title: "SQL DELETE or INSERT Fail with Incorrect 'QUOTED_IDENTIFIER' SET Options"
datetime: "2013-06-18T18:30:08.000Z"
categories: "technology"
tags: "continuous integration,sql,sql server"
---

A very frustrating error was holding the entire team up yesterday: **...the following SET options have incorrect settings: 'QUOTED\_IDENTIFIER'**.

Here's the full exception that TeamCity was giving us:

(DELETE/INSERT) failed because the following SET options have incorrect settings: 'QUOTED\_IDENTIFIER'. Verify that SET options are correct for use with indexed views and/or indexes on computed columns and/or filtered indexes and/or query notifications and/or XML data type methods and/or spatial index operations.

We were tempted to put `SET QUOTED_IDENTIFIER ON` on all of our scripts that were failing, but after some investigation we found that the error was related to Microsoft's [sqlcmd Utility](http://msdn.microsoft.com/en-us/library/ms162773.aspx "msdn | sqlcmd Utility").

Apparently, _sqlcmd_ runs all of its commands with `QUOTED_IDENTIFIER` turned off, unlike almost every other SQL utility Microsoft has (e.g. SSMS, .NET, ODBC, etc). To get around this, modify your _sqlcmd_ script to include the \-I option, which turns `QUOTED_IDENTIFIER` back on.
