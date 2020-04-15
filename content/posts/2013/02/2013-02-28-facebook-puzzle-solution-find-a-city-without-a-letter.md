---
coverImageUri: "11040"
title: "Facebook Puzzle Solution: Find a City Without a Letter"
datetime: "2013-02-28T21:30:44.000Z"
categories: "technology"
tags: "facebook,regex"
---

There seems to be a "puzzle craze" on Facebook for the last few days: finding cities in your state without certain characters in the name. While the point of it is to see how quickly you can come up with an example off the top of your head, I took it as a chance to show the power of text processing with regular expressions.

An example of the puzzle:

[![549903_524033730980213_1643200945_n](http://assets.brandonmartinez.com/brandonmartinez/2013/02/549903_524033730980213_1643200945_n.jpg)](http://assets.brandonmartinez.com/brandonmartinez/2013/02/549903_524033730980213_1643200945_n.jpg)

The solution to this is easy. First, grab a [list of all the cities, villages, and townships available in your state](http://en.wikipedia.org/wiki/List_of_cities,_villages,_and_townships_in_Michigan "Wikipedia | List of cities, villages, and townships in Michigan"), then just apply a regular expression to filter out the entries with the characters you don't want:

``` csharp
^\[^EeAa\]+$
```

Using a tool like RegexBuddy makes it really easy:

[![FilterCitiesInState](http://assets.brandonmartinez.com/brandonmartinez/2013/02/FilterCitiesInState-575x499.png)](http://assets.brandonmartinez.com/brandonmartinez/2013/02/FilterCitiesInState.png)

For Michigan, this was the result:

> Billings Township Birch Run Birch Run Township Bliss Township Boon Boon Township Boston Township Brighton Brighton Township Britton Bronson Bronson Township Brooklyn Brooks Township Brown City Brown Township Brutus Burlington Burnips Burns Township Burt Burton Byron Byron Township Churchill Township Clifford Clinton Clio Coldsprings Township Colon Colon Township Columbus Comins Comins Township Comstock Concord Concord Township Conklin Convis Township Corwith Township Covington Covington Township Croton Township Crump Cumming Township Curtis Curtis Township Dickson Township Dorr Dorr Township Dowling Drummond Township Dublin Dwight Township Filion Flint Flushing Flynn Township Fork Township Forsyth Township Frost Township Fruitport Fulton Township Gibson Township Gilford Gilford Township Goodrich Gould City Grim Township Grout Township Gustin Township Gwinn Higgins Township Hill Township Hinton Township Holly Holly Township Holt Holton Holton Township Honor Hopkins Hopkins Township Horton Horton Township Houghton Houghton Township Hudson Humboldt Township Huntington Woods Huron Township Inwood Township Iosco Township Irons Ironton Ironwood Irving Township Johnstown Township Kingsford Kingston Kingston Township Kinross Koylton Township Lincoln Lincoln Township, Huron County Linwood Livingston Township Lockport Township Lodi Township London Township Loud Township Ludington Lupton Lyndon Township Lynn Township Lyon Township Lyons Lyons Township Milford Millbrook Township Millington Millington Township Mio Morton Township Moscow Moscow Township Mount Morris Mount Morris Township Muir Mundy Township Munising Munising Township Munith Munro Township Northport Norwood Township Novi Novi Township Old Mission Otisco Township Otto Township Ovid Ovid Township, Clinton County Owosso Oxford Pickford Pickford Township Pinconning Pinconning Township Pittsford Pittsford Township Plymouth Port Huron Quincy Quincy Township, Houghton County Rich Township Richmond Robinson Township Rockford Rockwood Rollin Rollin Township Romulus Roscommon Roscommon Township Ross Township Rothbury Rubicon Township Ruby Rush Township Rust Township Ruth Scio Township Scipio Township Sims Township Sodus Sodus Township Soo Township South Lyon South Rockwood Springport Springport Township Spurr Township Stony Point Strongs Sturgis Sturgis Township Thompson Township Tipton Tompkins Township Troy Troy Township Turin Township Tustin Twining Ubly Union Union City Vicksburg Victor Township Victory Township Wilcox Township Willis Wilmot Township Winn Winsor Township Wixom Woodhull Township Woodstock Township Worth Township Wyoming
