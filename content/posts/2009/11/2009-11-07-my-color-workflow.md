---
coverImageUri: "679"
title: "My Color Workflow"
datetime: "2009-11-07T14:32:56.000Z"
categories: "technology"
tags: "adobe rgb,cmyk,color management,color profiles,gracol,rgb,sheetfed,srgb"
---

[![Color Settings](http://assets.brandonmartinez.com/brandonmartinez/2009/11/Color-Settings-150x150.png "Color Settings")](http://assets.brandonmartinez.com/brandonmartinez/2009/11/Color-Settings.png)I am currently taking a color management class at Ferris State University. In it, we talk about profiling devices for accurate color, how to convert from one device to another, as well as how to manage our color workflow. I have been aware for awhile that color calibration is important, but not until recently have decided to "standardize" myself.

To the left, you can take a look at my current color settings. I have put these together in Photoshop (because for whatever reason, Bridge doesn't allow you to manual edit them, even though it is the app to sync all of the suite). To put this together, I started with the base profile of _North American Web_ (an Adobe preset). I've modified some of the value to better suit my workflow, which is mostly web-based, with some design work for print.

View my settings after the jump.

## Working Spaces

- **RBG: Adobe RGB (1998).** I've seen some [web developers](http://www.smashingmagazine.com/2009/10/12/setting-up-photoshop-for-web-app-and-iphone-development/) say to set your profile to your monitor or to "disable" color management. I don't fully agree with this. I chose Adobe RGB (1998) for a few reasons.
    1. The ARGB profile fully encapsulates a standard CMYK gamut, allowing me to move to a printed product without a problem.
    2. My Digital SLR (Canon Rebel XS - 1000D) shoots in Adobe RGB
    3. On **output**, I can convert graphics for web to sRGB, to allow for better display across more monitors and computer setups
- **CMYK: GRACoL2006\_Coated1v2.** I don't design for print very often, but when I do it would normally be geared for a sheetfed environment. In the event that I _do_ have to make something for a web or digital press, I can assign the profiles manually.
- **Gray: Gray Gamma 2.2.** I left this as the default.
- **Spot: Dot Gain 20%.** I went with the default on this as well.

## Color Management Policies

- **RGB: Convert to Working RGB.** Generally, I always want to be working in Adobe RGB. After much discussion with my professor, he suggested working in a much larger RGB space, such as [DonRGB](http://www.hutchcolor.com/HCT_examples.htm "DonRGB at Hutch Color"), to allow the largest gamut possible while editing. I, however, am perfectly fine with the size of the Adobe RGB Gamut.
- **CMYK: Preserve Embedded Profiles.** If ever I work on a printed product, I will normally want to preserve the color management of whoever gives me the product.
- **Gray: Preserve Embedded Profiles.** Honestly, I'm not too worried about this; however, in the event that something comes up where this would be needed, I left it as preserve.
- **Profile Mismatch: Don't Ask.**
- **Missing Profiles: Don't Ask.**

## Conversion Options

I left all of these as their defaults. They all work well for what I'm doing.

- **Engine: Adobe ACE.**
- **Intent: Relative Colorimetric.** This setting would provide the least amount of change for out-of-gamut colors, and would allow me to get more consistent results between images.
- **Use Black Point Compensation, Use Dither, Compensate for Scene-referred Profiles.**

### Related Downloads

- [GRACoL and SWOP 2006 Profiles](http://files.idealliance.org/gracol/icc/swop2006%20and%20GRACoL2006%20ICC%20Profiles.zip)
- [My Color Settings](http://assets.brandonmartinez.com/brandonmartinez/2009/11/Brandon-Martinez-Adobe-Color-Settings.zip)
