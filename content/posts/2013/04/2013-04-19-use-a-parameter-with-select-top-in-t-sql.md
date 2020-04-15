---
coverImageUri: ""
title: "Use a Parameter with SELECT TOP in T-SQL"
datetime: "2013-04-19T16:00:25.000Z"
categories: "technology"
tags: "sql"
---

A quick T-SQL tip to end the week with: T-SQL's **SELECT TOP** can accept a parameter to choose how many rows to select:

```sql
DECLARE @TopLimit INT = 100

SELECT TOP (@TopLimit) FROM YOURTABLE yt
```

The parentheses around the parameter are important; don't forget them!
