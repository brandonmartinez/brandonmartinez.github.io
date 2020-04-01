---
id: '22021'
coverImageUri: ''
title: 'Resolve an ASP.NET 5 Deployment Issue to Azure Web App Slot'
date: '2015-09-09'
datetime: '2015-09-09T23:00:00.000Z'
categories: 'technology'
tags:
  'asp.net 5,asp.net dnx,azure web apps,microsoft azure,powershell,team
  foundation server,visual studio online'
excerpt:
  "If you've attempted to deploy your ASP.NET 5 MVC 6 apps to Azure from Visual
  Studio Online or Team Foundation Server, you may have used Microsoft's
  PowerShell Deployment Scripts. Overall, their script example works really well
  for basic Azure web apps. However, their script does not compensate for Azure
  Web Apps that are either configured with multiple deployment slots, configured
  with a traffic manager instance, or both."
---

If you've attempted to deploy your ASP.NET 5 MVC 6 apps to Azure from _Visual
Studio Online_ or _Team Foundation Server_, you may have used
[Microsoft's PowerShell Deployment Scripts](https://msdn.microsoft.com/Library/vs/alm/Build/azure/deploy-aspnet5 'Build and Deploy your ASP.NET 5 Application to an Azure Web App').
Overall, their script example works really well for basic Azure web apps.

However, their script does not compensate for Azure Web Apps that are either
configured with multiple deployment slots, configured with a traffic manager
instance, or both.

## The Issues

There are two problematic lines in their script. The first is this:

```powershell
$website = Get-AzureWebsite -Name $websiteName
```

The `Get-AzureWebsite` commandlet can potentially return a `System.Object[]`
when there are multiple slots configured for the web app.

Oddly enough, the property mentioned in the next block still returns when
`EnabledHostNames` is asked for, it just includes **all** hostnames from the
app. For example, if I have a web app **my-azure-website.azurewebsites.net**,
with a _Staging_ slot configured, it'll return the following:

- my-azure-website-staging.azurewebsites.net
- my-azure-website-staging.scm.azurewebsites.net
- my-azure-website.azurewebsites.net
- my-azure-website.scm.azurewebsites.net

This leads to the second issue in the deployment script (comment left intact
since it's actually the problem):

```powershell
# get the scm url to use with MSDeploy.  By default this will be the second in the array
$msdeployurl = $website.EnabledHostNames[1]
```

In addition to the multiple slot issue above, we run into another issue when
Traffic Manager is configured on the web app. Assuming we have a traffic manager
instance called **my-azure-website-trafficmanager.trafficmanager.net** and one
for our staging deployments at
**my-azure-website-staging-trafficmanager.trafficmanager.net**, we can expect an
output like this:

- my-azure-website-staging-trafficmanager.trafficmanager.net
- my-azure-website-staging.azurewebsites.net
- my-azure-website-staging.scm.azurewebsites.net
- my-azure-website-trafficmanager.trafficmanager.net
- my-azure-website.azurewebsites.net
- my-azure-website.scm.azurewebsites.net

We can now see that the code above, looking for an index of `1`, will not work
in this scenario. It will end up pushing the actual staging URL to the msdeploy
process, even if we wanted the actual production SCM instance.

Keep in mind that even if we specifically ask for staging through an alternative
method (i.e. asking for **my-azure-website(Staging)**), it would still not work
because of Traffic Manager:

- my-azure-website-trafficmanager.trafficmanager.net
- my-azure-website.azurewebsites.net
- my-azure-website.scm.azurewebsites.net

## A Solution

To fix these issues, we need to add an optional slot parameter, and then check
to make sure we're not getting more web apps or host names than we expect.

Here is the new `param` line with our change:

```powershell
param($websiteNames, $packOutput, $slotName)
```

And now checking to see if multiple sites are returned:

```powershell
$website = if ([string]::IsNullOrWhiteSpace($slotName)) {  Get-AzureWebsite -Name $websiteName } else {  Get-AzureWebsite -Name $websiteName -Slot $slotName }
```

And finally, specifically seek out our SCM url:

```powershell
# Grab SCM url to use with MSDeploy; there should only be one
$msdeployurl = $website.EnabledHostNames | Where-Object {$_ -like "*.scm.*"}

if($msdeployurl -is [System.Object[]]) {
    throw [System.Exception] "Multiple SCM urls returned for $websiteName; consult Kudu/Azure portal to clarify."
}
```

With those changes, we should be all set!

## My Deployment Script

Here is the actual script that I use in my deployments. Note that I added some
additional functionality such as deploying to multiple web apps with the same
packaged app and restarting the web app before it is deployed to in an attempt
to reduce file locking issues.

```powershell
#Requires -Version 3.0

param($websiteNames, $packOutput, $slotName)

$VerbosePreference = "continue"
$ErrorActionPreference = "continue"

Write-Verbose "Published requested of the following website(s): $websiteNames"

$websiteNames.split(',') | % {
    $websiteName = $_

    Write-Verbose "Restarting Azure Websites $websiteName to ensure no locks"
    Restart-AzureWebsite -Name $websiteName

    Write-Verbose "Starting publish of $websiteName"
    $website = if ([string]::IsNullOrWhiteSpace($slotName)) {  Get-AzureWebsite -Name $websiteName } else {  Get-AzureWebsite -Name $websiteName -Slot $slotName }

    # If we have an array, we most likely have additional slots on this website. Throw an exception and leave.
    if($website -is [System.Object[]]) {
        throw [System.Exception] "Multiple websites returned for $websiteName; please specify a slot"
    }

    # Grab SCM url to use with MSDeploy; there should only be one
    $msdeployurl = $website.EnabledHostNames | Where-Object {$_ -like "*.scm.*"}

    if($msdeployurl -is [System.Object[]]) {
        throw [System.Exception] "Multiple SCM urls returned for $websiteName; consult Kudu/Azure portal to clarify."
    }

    $publishProperties = @{'WebPublishMethod'='MSDeploy';
                            'MSDeployServiceUrl'=$msdeployurl;
                            'DeployIisAppPath'=$website.Name;
                            'EnableMSDeployAppOffline'=$true;
                            'MSDeployUseChecksum'=$true;}

    Write-Verbose "Using the following publish properties (excluding username and password):"
    Write-Verbose ($publishProperties | Format-List | Out-String)

    $publishProperties.Add('Username', $website.PublishingUsername)
    $publishProperties.Add('Password', $website.PublishingPassword)

    $publishScript = "${env:ProgramFiles(x86)}\Microsoft Visual Studio 14.0\Common7\IDE\Extensions\Microsoft\Web Tools\Publish\Scripts\default-publish.ps1"

    Write-Verbose "Running publish script $publishScript"

    . $publishScript -publishProperties $publishProperties -packOutput $packOutput

    Write-Verbose "Finished publish of $websiteName"
 }

 Write-Verbose "Finished requested publish of the following website(s): $websiteNames"
```
