---
coverImageUri: ''
title: 'Add Array Items to MVC 6 IConfiguration via Environment Variables'
datetime: '2015-09-14T21:02:47.000Z'
categories: 'technology'
tags: 'asp.net 5,asp.net dnx,asp.net mvc'
excerpt:
  "Here's a quick MVC tip to start your week: if you're utilizing environment
  variables to set IConfiguration data in your web application (e.g. deploying
  to different Azure environments), setting values of an array is not apparent.
  It's actually quite easy to do so, though!"
---

Here's a quick MVC tip to start your week: if you're utilizing environment
variables to set IConfiguration data in your web application (e.g. deploying to
different Azure environments), setting values of an array is not apparent. It's
actually quite easy to do so, though!

`YourConfigurationSection:SubKeyName:0:KeyName`

Where `0` is replaced with the index of the array. For example, let's say your
`config.json` looks like this:

```json
{
  "AppSettings": {
    "SiteTitle": "My Application"
  },
  "Data": {
    "SomeResource": {
      "ConnectionString": "A Connection String"
    }
  },
  "AzureSearch": {
    "BaseURI": "https://a-sample-search-service.search.windows.net",
    "APIKey": "2M5S053OVB60U7K1TJVEGF2V9FEJG6I"
    "Indexes": [
      {
        "IndexName": "myindexname-local",
        "SuggesterName": "mysuggestername-local",
        "ScoringProfileName": "myprofilename-local"
      },
      {
        "IndexName": "myindexname-dev",
        "SuggesterName": "mysuggestername-dev",
        "ScoringProfileName": "myprofilename-dev"
      }
    ]
  }
}
```

If we want to override one of those search index, we'd just have to add
`AzureSearch:Indexes:1:SuggesterName` into our Azure Application Settings.

[![azureconfigurationsearchsuggester](http://assets.brandonmartinez.com/brandonmartinez/2015/09/azureconfigurationsearchsuggester.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/09/azureconfigurationsearchsuggester.png)

Keep in mind that this also works for **adding** items to the array. We could
just as easily use an index of `2` and it'd append to the array. Just remember,
you can't **remove** anything that's there (though, I suppose you could
overwrite all the values with `null`).

Hope that helps!
