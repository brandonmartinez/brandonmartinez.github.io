---
coverImageUri: ''
title: 'Access All IConfiguration Properties in MVC 6'
datetime: '2015-09-11T12:00:05.000Z'
categories: 'technology'
tags: 'asp.net,asp.net dnx,asp.net mvc,c#'
excerpt:
  "Just a quick snippet I thought I'd share: I needed to access all of the
  configuration settings available in my app's IConfiguration object. I created
  an extension method that maps it to an IDictionary."
---

Just a quick snippet I thought I'd share: I needed to access **all** of the
configuration settings available in my app's `IConfiguration` object. I created
an extension method that maps it to an `IDictionary`.

```csharp
public static IDictionary<string, object> ExpandToDictionary(this IConfiguration configuration)
{
    var dictionary = new Dictionary<string, object>();
    var configurationSections = configuration.GetChildren();
    if(configurationSections.Any())
    {
        foreach(var section in configurationSections)
        {
            var subConfigurationSections = section.GetChildren();
            if(subConfigurationSections.Any())
            {
                var serializedSection = section.ExpandToDictionary();
                dictionary.Add(section.Key, serializedSection);
            }
            else
            {
                var flattenedValue = configuration[section.Key];
                dictionary.Add(section.Key, flattenedValue);
            }
        }
    }
 
    return dictionary;
}
```

I can then iterate through this by key to see all values, or even serialize it
to JSON if I want to use the configuration in my view's JavaScript.
