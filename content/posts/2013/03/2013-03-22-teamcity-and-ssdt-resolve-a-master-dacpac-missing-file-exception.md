---
coverImageUri: ''
title: 'TeamCity and SSDT: Resolve a master.dacpac Missing File Exception'
datetime: '2013-03-22T17:00:15.000Z'
categories: 'technology'
tags: 'ssdt,teamcity'
---

If you're receiving a missing file exception when trying to build an SSDT
database project on TeamCity, you may have to copy a dependency to your build
machine.

```bash
\[10:00:08\]\[SqlBuildTask\] C:\\Program Files (x86)\\MSBuild\\Microsoft\\VisualStudio\\v10.0\\SSDT\\Microsoft.Data.Tools.Schema.SqlTasks.targets(494, 5): error SQL72027: File "C:\\Extensions\\Microsoft\\SQLDB\\Extensions\\SqlServer\\Azure\\SqlSchemas\\master.dacpac" does not exist.
```

This results from adding a database reference to your SSDT database project to
the master or msdb databases. Those files are stored in a local folder, and are
not included in your project. As such, they're missing from the TeamCity server.

To fix this issue, copy files from **C:\\Program Files (x86)\\Microsoft Visual
Studio
10.0\\Common7\\IDE\\Extensions\\Microsoft\\SQLDB\\Extensions\\SqlServer\\110\\SQLSchemas**
to your TeamCity server:

[![Missing *.dacpac Files](http://assets.brandonmartinez.com/brandonmartinez/2013/03/dacpac-575x86.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/03/dacpac.png)

I had to create the path on the TeamCity server (C:\\Extensions didn't exist at
all):

```bash
mkdir C:\\Extensions\\Microsoft\\SQLDB\\Extensions\\SqlServer\\Azure\\SqlSchemas\\
```

And then dropped the files in there. Started a rebuild and everything worked
again.

_Note: paths may vary based on your system, versions installed, or
configuration._
