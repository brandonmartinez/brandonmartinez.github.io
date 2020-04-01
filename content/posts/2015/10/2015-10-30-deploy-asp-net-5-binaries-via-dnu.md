---
id: '23143'
coverImageUri: ''
title: 'Deploy ASP.NET 5 Binaries via DNU'
date: '2015-10-30'
datetime: '2015-10-30T20:51:32.000Z'
categories: 'technology'
tags: 'asp.net 5,asp.net dnx'
excerpt:
  "I don't know why it took me so long to figure this out, but it's totally
  possible to deploy binaries from the DNU toolchain instead of source folders."
---

I don't know why it took me so long to figure this out, but it's totally
possible to deploy binaries from the DNU toolchain instead of source folders.

The trick is adding the `--no-source` flag to your `dnu publish` command. Here's
my `LocalPublish.ps1` file previously mentioned in
[another post](https://www.brandonmartinez.com/2015/09/16/deploying-asp-net-5-beta-7-through-vso/):

```powershell
#Requires -Version 3.0

param($vsoProjectName, $projectName, $buildConfiguration, $buildSourcesDirectory)

$VerbosePreference = "continue"
$ErrorActionPreference = "Stop"

&{$Branch='dev';iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))}
$globalJson = Get-Content -Path $PSScriptRoot\\global.json -Raw -ErrorAction Ignore | ConvertFrom-Json -ErrorAction Ignore

if($globalJson) {
    $dnxVersion = $globalJson.sdk.version
} else {
    Write-Warning "Unable to locate global.json to determine using 'latest'"
    $dnxVersion = "latest"
}

& $env:USERPROFILE\\.dnx\\bin\\dnvm install $dnxVersion -Persistent

$dnxRuntimePath = "$($env:USERPROFILE)\\.dnx\\runtimes\\dnx-clr-win-x86.$dnxVersion"

& "dnu" "build" "$PSScriptRoot\\src\\$projectName" "--configuration" "$buildConfiguration"

& "dnu" "publish" "$PSScriptRoot\\src\\$projectName" "--configuration" "$buildConfiguration" "--out" "$buildSourcesDirectory\\$vsoProjectName\\artifacts\\bin\\$buildConfiguration\\Publish" "--runtime" "$dnxRuntimePath" "--no-source"
```

Adding `--no-source` creates NuGet packages instead of deploying the `src`
folder.
