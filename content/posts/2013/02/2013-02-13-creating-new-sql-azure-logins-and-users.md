---
id: "11012"
coverImageUri: ""
title: "Creating New SQL Azure Logins and Users"
date: "2013-02-13"
datetime: "2013-02-13T17:30:54.000Z"
categories: "technology"
tags: "sql azure,windows azure"
---

Until recently, I didn't realize that SQL Azure allows you to create new logins, users, and roles. They don't expose this functionality through the UI, it all has to be done through T-SQL commands.

For example:

2. Run this when connected to master: ```sql
CREATE LOGIN MyReportingUser WITH PASSWORD='MyP@assWord123'
```
3. Then connect to the database you want to add the user to and run this: ```sql
CREATE USER MyReportingUser FROM LOGIN MyReportingUser
```
4. You can then grant them a role: ```sql
EXEC sp\_addrolemember 'db\_datareader', 'MyReportingUser'
```

You can then connect to your SQL Azure database using that new login.

Via: [Azure How-To Talk Series: How To: Manage SQL Azure Security](http://azure-howto.blogspot.com/2011/06/how-to-manage-sql-azure-security-logins.html "Azure How-To Talk Series: How To: Manage SQL Azure Security - Logins, Users, Roles, Schemas and Permissions").
