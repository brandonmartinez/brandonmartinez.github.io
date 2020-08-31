---
coverImageUri: ''
title: 'Sanitizing Phone Numbers With C#'
datetime: '2009-08-03T18:47:51.000Z'
categories: 'technology'
tags: '.net,c#,programming,sanitizing input'
---

An extension method to remove all but digits from a phone number. This should be
useful for sanitizing input to put into your database.

```csharp
using System.Text.RegularExpressions;

namespace CustomStringMethods {
    public static class PhoneNumber {
        public static string StripAllButDigits(this string s) {
            return (s == null) ? string.Empty : Regex.Replace(s, @"\\D", string.Empty);
        }

    }
}
```

Obviously this can be used for more than just phone numbers.
