---
coverImageUri: ""
title: "SQL UPSERTing in SQL Server 2005 via a Variable Table"
datetime: "2009-07-22T21:28:13.000Z"
categories: "technology"
tags: "sql,sql server 2005,upsert"
---

I was trying to find an example of how to "[UPSERT](http://en.wikipedia.org/wiki/Upsert)" data the other day, and could not find anything half-way decent. After doing some research into some of the capablities of SQL Server 2005 (since that is what I was writing the script for), I came up with this solution: ```sql
-- GENERATE A SAMPLE ORIGINAL TABLE (THE TABLE TO UPDATE) -- THIS WOULD BE A REAL TABLE DECLARE @SampleOriginalData Table ( FirstName VarChar(50), LastName VarChar(50), PhoneNumber VarChar(10), Email VarChar(250) )

\-- CREATE SAMPLE DATA

INSERT INTO @SampleOriginalData (FirstName, LastName, PhoneNumber, Email) VALUES ('Brandon', 'Martinez', '2312336789', 'bmartinez@gmail.com')

INSERT INTO @SampleOriginalData (FirstName, LastName, PhoneNumber, Email) VALUES ('Shawn', 'Davis', '1029384756', 'shawn.davis@gmail.com')

INSERT INTO @SampleOriginalData (FirstName, LastName, PhoneNumber, Email) VALUES ('Jim', 'FrankWorth', '1229384756', 'jimfrankworth@gmail.com')

\-- CHECK TO MAKE SURE THE DATA WAS INSERTED PROPERLY select \* from @SampleOriginalData

\-- CREATE A SAMPLE IMPORT DATA TABLE (THE TABLE TO IMPORT/UPDATE FROM) -- THIS WOULD BE A REAL TABLE DECLARE @SampleImportData Table ( FirstName VarChar(50), LastName VarChar(50), PhoneNumber VarChar(10), Email VarChar(250) )

\-- MORE SAMPLE DATA; ONE NEW RECORD AND ONE TO BE UPDATED INSERT INTO @SampleImportData (FirstName, LastName, PhoneNumber, Email) VALUES ('Shawn', 'Davis', '9781231230', 'shawn.davis@gmail.com')

INSERT INTO @SampleImportData (FirstName, LastName, PhoneNumber, Email) VALUES ('Darrel', 'Davis', '9787651230', 'd.davis@gmail.com')

\-- MAKE SURE THE DATA WAS INSERTED PROPERLY select \* from @SampleImportData

\-- CREATE THE TEMP TABLE (THIS WILL BE USED IN A REAL SCENARIO) DECLARE @SampleTempData Table ( FirstName VarChar(50), LastName VarChar(50), PhoneNumber VarChar(10), Email VarChar(250) )

\-- DELETE THE SAMPLE IMPORT DATA AND OUTPUT -- IT TO THE TEMP DATA TABLE DELETE @SampleImportData OUTPUT DELETED.\* INTO @SampleTempData FROM @SampleImportData si, @SampleOriginalData so WHERE (si.email = so.email)

\--select \* from @SampleTempData --select \* from @SampleImportData

\-- UPDATE THE ORIGINAL DATA TABLE WITH ITEMS IN THE TEMP TABLE UPDATE so SET FirstName = s.FirstName, LastName = s.LastName, PhoneNumber = s.PhoneNumber, Email = s.Email FROM @SampleOriginalData so INNER JOIN @SampleTempData s ON so.Email = s.Email

\--select \* from @SampleOriginalData

\-- GRAB THE REMAINING RECORDS FROM THE IMPORT DATA TABLE -- THESE SHOULD ALL BE NEW RECORDS INSERT @SampleOriginalData(FirstName, LastName, PhoneNumber, Email) SELECT FirstName, LastName, PhoneNumber, Email FROM @SampleImportData

select \* from @SampleOriginalData
``` Now, I do realize that SQL Server 2008 supports the _MERGE_ command, but as I said, I don't have that available to use. Feel free to expand upon this (such as adding WHERE clauses to narrow down on the data). You can view the latest version of the code [Upsert with Temp Tables](http://github.com/brandonmartinez/SQL-Scripts/blob/master/UPSERT/UPSERT%20using%20Temp%20Tables%20(SQLSRV2005).sql) or the extended [Upserting Addresses](http://github.com/brandonmartinez/SQL-Scripts/blob/master/UPSERT/Match%20or%20Insert%20Addresses%20(SQLSRV2005).sql) example at [GitHub](http://www.github.com/), along with some of my other [SQL scripts](http://github.com/brandonmartinez/SQL-Scripts/tree/master).
