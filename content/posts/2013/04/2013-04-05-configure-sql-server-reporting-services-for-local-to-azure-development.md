---
coverImageUri: "11112"
title: "Configure SQL Server Reporting Services for Local-to-Azure Development"
datetime: "2013-04-05T16:30:05.000Z"
categories: "technology"
tags: ".net,azure reporting services,c#,ssrs,windows azure"
---

Recently, I was tasked with configuring our development environments for local SSRS reporting and development. This is the basic configuration I used, as well as some configuration for the **ReportViewer** control to get it communicating properly.

First, a few assumptions:

- You already have SQL Server, as well as Reporting Services, installed locally.
- Your SQL Server instance is SQL2012 (or, just substitute your name wherever applicable).

1. Open Reporting Services Configuration Manager: [![01_reportingservicesconfigmanager](http://assets.brandonmartinez.com/brandonmartinez/2013/03/01_reportingservicesconfigmanager-575x432.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/01_reportingservicesconfigmanager.png)
2. Set your service account to **Network Service**: [![02_networkservice](http://assets.brandonmartinez.com/brandonmartinez/2013/03/02_networkservice-575x435.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/02_networkservice.png)
3. Set your web service URL to **reportserver** (this is to match Azure’s url): [![03_reportserver](http://assets.brandonmartinez.com/brandonmartinez/2013/03/03_reportserver-575x435.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/03_reportserver.png)
4. Choose your database (Change Database button); Network Service should be selected for the credentials: [![04_database](http://assets.brandonmartinez.com/brandonmartinez/2013/03/04_database-575x433.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/04_database.png)
5. Set your report manager URL to **reportmanager**: [![05_reportmanager](http://assets.brandonmartinez.com/brandonmartinez/2013/03/05_reportmanager-575x434.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/05_reportmanager.png)
6. Change your execution account to an account that’s in the Administrators group: [![06_execution](http://assets.brandonmartinez.com/brandonmartinez/2013/03/06_execution-575x434.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/06_execution.png)
7. Apply your changes and exit.
8. Run Internet Explorer as an administrator, then go to http://MACHINE\_NAME/reportmanager: [![09_reportmanager](http://assets.brandonmartinez.com/brandonmartinez/2013/03/09_reportmanager-575x110.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/09_reportmanager.png)
9. Go to "Site Settings" from the navigation at the top right, then select the security tab. Add a new role assignment for NT AUTHORITY\\NETWORK SERVICE, selecting both options. Additionally, update the Administrators group to have both role assignments: [![10_admin](http://assets.brandonmartinez.com/brandonmartinez/2013/03/10_admin-575x161.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/10_admin.png)
10. Navigate to Home (top left link).
11. Choose Folder Settings from the tool bar.
12. Add a new role assignment for NT AUTHORITY\\NETWORK SERVICE, selecting all roles. Additionally, update the Administrators group to have all roles: [![13_foldersecurity](http://assets.brandonmartinez.com/brandonmartinez/2013/03/13_foldersecurity-575x171.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/13_foldersecurity.png)
13. Close IE.
14. Additional things to check:
    - In IIS: your app pools (default and other user-defined) are running as **Network Service**: [![15_iis](http://assets.brandonmartinez.com/brandonmartinez/2013/03/15_iis.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/15_iis.png)
    - In SSMS: the NT AUTHORITY\\NETWORK SERVICE user has access to your web applications’ databases as well as the reporting databases: [![15_ssms](http://assets.brandonmartinez.com/brandonmartinez/2013/03/15_ssms-575x381.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/15_ssms.png)

That environment should be perfect for local development and testing of .NET web applications and SSRS development.

P.S. If you're receiving **The request failed with HTTP status 401: Unauthorized.** errors from the ReportViewer control, these steps helped alleviate that problem for me.
