---
coverImageUri:
title: 'SQL Azure: Solve an Excessive Transaction Log Space Usage Exception'
datetime: '2013-02-28T14:00:04.000Z'
categories: 'technology'
tags: 'sql server,windows azure'
---

Early this morning I was alerted of an interesting SQL exception from one of our
data integration services: _The session has been terminated because of excessive
transaction log space usage. Try modifying fewer rows in a single transaction._
Now, I generally try to run away whenever I see a transaction log exception, but
today I had to stand my ground.

Here's the stack trace from the exception:

```bash
System.Data.SqlClient.SqlException (0x80131904): The session has been terminated because of excessive transaction log space usage. Try modifying fewer rows in a single transaction. A severe error occurred on the current command. The results, if any, should be discarded.

at System.Data.SqlClient.SqlConnection.OnError(SqlException exception, Boolean breakConnection) at System.Data.SqlClient.TdsParser.ThrowExceptionAndWarning() at System.Data.SqlClient.TdsParser.Run(RunBehavior runBehavior, SqlCommand cmdHandler, SqlDataReader dataStream, BulkCopySimpleResultSet bulkCopyHandler, TdsParserStateObject stateObj) at System.Data.SqlClient.SqlBulkCopy.WriteToServerInternal() at System.Data.SqlClient.SqlBulkCopy.WriteRowSourceToServer(Int32 columnCount) at System.Data.SqlClient.SqlBulkCopy.WriteToServer(DataRow\[\] rows)
```

Apparently, modifying a large set of rows in combination with having multiple
constraints/indexes can cause this exception to occur; for us, we were clearing
out a table and bulk inserting a few hundred-thousand rows daily. To resolve the
issue, an additional option needs to be set on the constraint:
[ONLINE=ON](http://msdn.microsoft.com/en-us/library/ms190273.aspx).

```sql
DROP INDEX \[IX\_MY\_CONSTRAIN\_NAME\] ON \[dbo\].\[MY\_TABLE\_NAME\]

GO

CREATE NONCLUSTERED INDEX \[IX\_MY\_CONSTRAIN\_NAME\] ON \[dbo\].\[MY\_TABLE\_NAME\] ( \[MyColumn\] ASC ) WITH ( PAD\_INDEX = OFF, STATISTICS\_NORECOMPUTE = OFF, SORT\_IN\_TEMPDB = OFF, DROP\_EXISTING = OFF, ALLOW\_ROW\_LOCKS = ON, ALLOW\_PAGE\_LOCKS = ON, -- By default, the following was set to OFF, switching it to ON to improve performance ONLINE = ON, ) GO
```

So, what does that do for us? According to MSDN:

> **ONLINE = { ON | OFF }**
>
> Specifies whether underlying tables and associated indexes are available for
> queries and data modification during the index operation. The default is OFF.
> REBUILD can be performed as an ONLINE operation.

> **ON:** Long-term table locks are not held for the duration of the index
> operation. During the main phase of the index operation, only an Intent Share
> (IS) lock is held on the source table. This enables queries or updates to the
> underlying table and indexes to continue. At the start of the operation, a
> Shared (S) lock is held on the source object for a very short time. At the end
> of the operation, for a short time, an S (Shared) lock is acquired on the
> source if a nonclustered index is being created; or an SCH-M (Schema
> Modification) lock is acquired when a clustered index is created or dropped
> online and when a clustered or nonclustered index is being rebuilt. ONLINE
> cannot be set to ON when an index is being created on a local temporary table.
> Only single-threaded heap rebuild operation is allowed.

**tl;dr** it appears to relax the locking process, allowing for you to continue
working with the table.

After some light testing, this seems to have resolved my issue. Hopefully it'll
help you.

**WARNING:** SQL azure requires that you have a clustered index on your tables,
so if your only constraint is your clustered primary key, you may have to get
creative on implementing this fix.
