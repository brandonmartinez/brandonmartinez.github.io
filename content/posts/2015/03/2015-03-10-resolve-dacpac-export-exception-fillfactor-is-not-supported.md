---
id: '16191'
coverImageUri: ''
title: 'Resolve DACPAC Export Exception: FillFactor is Not Supported'
date: '2015-03-10'
datetime: '2015-03-10T16:00:26.000Z'
categories: 'technology'
tags: 'bacpac,dacpac,sql,sql azure,sql server'
excerpt:
  'Another interesting data-tier application export exception: FillFactor is not
  supported when used as part of a data package.'
---

Another interesting data-tier application export exception: FillFactor is not
supported when used as part of a data package.

Use the following query to identify the problem indexes:

```sql
SELECT              OBJECT_NAME(i.object_id) AS TableName,
                    c.[name] AS ColumnName,
                    i.[name] AS IndexName,
                    i.fill_factor AS [FillFactor]
FROM                sys.indexes i
INNER JOIN          sys.index_columns ic ON ic.object_id = i.object_id AND ic.index_id = i.index_id
INNER JOIN          sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.index_column_id
WHERE               i.Fill_factor != 0
```

[![01-FillFactorNotSupported](http://assets.brandonmartinez.com/brandonmartinez/2014/06/01-FillFactorNotSupported.png)](http://assets.brandonmartinez.com/brandonmartinez/2014/06/01-FillFactorNotSupported.png)

[![02-QueryResults](http://assets.brandonmartinez.com/brandonmartinez/2014/06/02-QueryResults.png)](http://assets.brandonmartinez.com/brandonmartinez/2014/06/02-QueryResults.png)

[![03-SetFillFactorTo0](http://assets.brandonmartinez.com/brandonmartinez/2014/06/03-SetFillFactorTo0.png)](http://assets.brandonmartinez.com/brandonmartinez/2014/06/03-SetFillFactorTo0.png)

Then, one-by-one, bring up the designer for each table that has an offending
index. Right-click the designer and bring up the _Indexes/Keys..._ dialog. Find
the offending index, then change its Fill Specification -> Fill Factor property
to **0**. Close the dialog and save the table.
