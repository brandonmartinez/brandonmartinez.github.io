---
id: "16111"
coverImageUri: ""
title: "Resolve BACPAC Export Exception: MS_Description is Not Supported"
date: "2014-08-16"
datetime: "2014-08-16T15:00:54.000Z"
categories: "technology"
tags: "bacpac,dacpac,sql,sql azure,sql server"
---

Recently ran into this interesting issue when trying to export a BACPAC:

[![01-failedexport](http://assets.brandonmartinez.com/brandonmartinez/2014/06/01-failedexport.png)](http://assets.brandonmartinez.com/brandonmartinez/2014/06/01-failedexport.png)

[![02-MS_DescriptionNotSupported](http://assets.brandonmartinez.com/brandonmartinez/2014/06/02-MS_DescriptionNotSupported.png)](http://assets.brandonmartinez.com/brandonmartinez/2014/06/02-MS_DescriptionNotSupported.png)

The _MS\_Description_ extended property is apparently not supported by the export data-tier application utility.

So how do we find the offenders? Here are two SQL scripts to find descriptions on tables and columns:

```sql
DECLARE @ExtendedPropertyName VARCHAR = 'MS\_Description'

\-- Find Tables with Descriptions SELECT OBJECT\_NAME(ep.major\_id) AS TableName, ep.\[Value\] AS \[Description\], 'EXEC sp\_dropextendedproperty @name = ''' + @ExtendedPropertyName + ''', @level0type = ''schema'', ' + '@level0name = ' + OBJECT\_SCHEMA\_NAME(ep.major\_id) + ', @level1type = ''table'', @level1name = ' + OBJECT\_NAME(ep.major\_id) AS DropTableDescriptions FROM sys.extended\_properties ep WHERE ep.class\_desc = 'OBJECT\_OR\_COLUMN' AND ep.minor\_id = 0 AND ep.NAME = @ExtendedPropertyName -- Find Columns with Descriptions SELECT OBJECT\_NAME(ep.major\_id) AS TableName, columns.NAME AS ColumnName, ep.\[Value\] AS \[Description\], 'EXEC sp\_dropextendedproperty @name = ''' + @ExtendedPropertyName + ''', @level0type = ''schema'', ' + '@level0name = ' + OBJECT\_SCHEMA\_NAME(ep.major\_id) + ', @level1type = ''table'', @level1name = ' + OBJECT\_NAME(ep.major\_id) + ', @level2type = ''column'', @level2name = ' + columns.NAME AS DropColumnDescriptions FROM sys.extended\_properties ep INNER JOIN sys.columns ON columns.object\_id = ep.major\_id AND columns.column\_id = ep.minor\_id WHERE ep.class\_desc = 'OBJECT\_OR\_COLUMN' AND ep.minor\_id > 0 AND ep.NAME = @ExtendedPropertyName
```

It should display something similar to this, assuming there are MS\_Description properties on any of your tables or columns:

[![03-SQLResults](http://assets.brandonmartinez.com/brandonmartinez/2014/06/03-SQLResults.png)](http://assets.brandonmartinez.com/brandonmartinez/2014/06/03-SQLResults.png)

To remove the properties, copy the last column in the results from the above query, paste them in your editor, and execute them. An example generated script:

```sql
EXEC sp\_dropextendedproperty @name = 'MS\_Description', @level0type = 'schema', @level0name = dbo, @level1type = 'table', @level1name = EXEC sp\_dropextendedproperty @name = 'MS\_Description', @level0type = 'schema', @level0name = dbo, @level1type = 'table', @level1name = {{YOUR\_TABLE\_NAME}}, @level2type = 'column', @level2name = {{YOUR\_COLUMN\_NAME}}
```

Once you have those cleaned up, you should be able to do another export:

[![04-success](http://assets.brandonmartinez.com/brandonmartinez/2014/06/04-success.png)](http://assets.brandonmartinez.com/brandonmartinez/2014/06/04-success.png)

Done!

SQL based off code from this thread: [Drop extended property "MS\_Description" of ALL tables and ALL columns](http://bmtn.us/XpHOmO)
