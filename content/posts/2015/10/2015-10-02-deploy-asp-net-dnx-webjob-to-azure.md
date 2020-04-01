---
id: '22801'
coverImageUri: ''
title: 'Deploy ASP.NET DNX WebJob to Azure'
date: '2015-10-02'
datetime: '2015-10-02T17:00:07.000Z'
categories: 'technology'
tags: 'asp.net 5,asp.net dnx,azure webjobs,msdeploy,web deploy'
excerpt:
  "Over the past few weeks, I've really been digging into the Visual Studio
  Online Preview Build System. This has mostly been around deploying ASP.NET DNX
  web applications, and the last few blog posts have been around that process.
  Well, something new came up this past week: how do I deploy an ASP.NET DNX
  command line project as an Azure WebJob?"
---

Over the past few weeks, I've really been digging into the Visual Studio Online
Preview Build System. This has mostly been around deploying ASP.NET DNX web
applications, and the last few blog posts have been around that process. Well,
something new came up this past week: how do I deploy an ASP.NET DNX command
line project as an Azure WebJob?

There are several tutorials online on how to do it in a traditional C# project,
but nothing that addresses ASP.NET DNX. After some digging, I came up with a
PowerShell script based on
[Microsoft's recommended deployment script](https://msdn.microsoft.com/Library/vs/alm/Build/azure/deploy-aspnet5)
as well as some of the underlying scripts that it calls to directly invoke
MSDeploy.

I put this under my application's `scripts` directory:

```powershell
#Requires -Version 3.0

param($websiteNames, $jobname, $jobtype, $packOutput, $slotName = "")

$VerbosePreference = "continue"
$ErrorActionPreference = "continue"

# Helper Functions (based on or from https://github.com/aspnet/vsweb-publish/blob/master/publish-module.psm1)
function Get-MSDeploy {
    [cmdletbinding()]
    param()
    process {
        $installPath = $env:msdeployinstallpath

        if (!$installPath) {
            $keysToCheck = @('hklm:\SOFTWARE\Microsoft\IIS Extensions\MSDeploy\3', 'hklm:\SOFTWARE\Microsoft\IIS Extensions\MSDeploy\2', 'hklm:\SOFTWARE\Microsoft\IIS Extensions\MSDeploy\1')

            foreach ($keyToCheck in $keysToCheck) {
                if (Test-Path $keyToCheck) {
                    $installPath = (Get-itemproperty $keyToCheck -Name InstallPath -ErrorAction SilentlyContinue | select -ExpandProperty InstallPath -ErrorAction SilentlyContinue)
                }

                if ($installPath) {
                    break;
                }
            }
        }

        if (!$installPath) {
            throw "Unable to find msdeploy.exe, please install it and try again"
        }

        [string]$msdInstallLoc = (join-path $installPath 'msdeploy.exe')

        "Found msdeploy.exe at [{0}]" -f $msdInstallLoc | Write-Verbose

        $msdInstallLoc
    }
}

function Execute-Command {
    [cmdletbinding()]
    param(
        [Parameter(Mandatory = $true, Position = 0, ValueFromPipeline = $true, ValueFromPipelineByPropertyName = $true)]
        [String]$exePath,
        [Parameter(Mandatory = $true, Position = 1, ValueFromPipelineByPropertyName = $true)]
        [String]$arguments
    )
    process {
        $psi = New-Object -TypeName System.Diagnostics.ProcessStartInfo
        $psi.CreateNoWindow = $true
        $psi.UseShellExecute = $false
        $psi.RedirectStandardOutput = $true
        $psi.RedirectStandardError = $true
        $psi.FileName = $exePath
        $psi.Arguments = $arguments

        $process = New-Object -TypeName System.Diagnostics.Process
        $process.StartInfo = $psi
        $process.EnableRaisingEvents = $true

        # Register the event handler for error
        $stdErrEvent = Register-ObjectEvent -InputObject $process  -EventName 'ErrorDataReceived' -Action {
            if (! [String]::IsNullOrEmpty($EventArgs.Data)) {
                $EventArgs.Data | Write-Error
            }
        }

        # Starting process.
        $process.Start() | Out-Null
        $process.BeginErrorReadLine() | Out-Null
        $output = $process.StandardOutput.ReadToEnd()
        $process.WaitForExit() | Out-Null
        $output | Write-Output

        # UnRegister the event handler for error
        Unregister-Event -SourceIdentifier $stdErrEvent.Name | Out-Null
    }
}

Write-Verbose "Published requested of $jobtype web job $jobname to the following website(s): $websiteNames"

$websiteNames.split(',') | % {
    $websiteName = $_

    #Write-Verbose "Restarting Azure Websites $websiteName to ensure no locks"
    #Restart-AzureWebsite -Name $websiteName

    Write-Verbose "Starting publish of $jobtype web job $jobname to $websiteName"
    $website = if ([string]::IsNullOrWhiteSpace($slotName)) { Get-AzureWebsite -Name $websiteName } else { Get-AzureWebsite -Name $websiteName -Slot $slotName }

    # If we have an array, we most likely have additional slots on this website. Throw an exception and leave.
    if ($website -is [System.Object[]]) {
        throw [System.Exception] "Multiple websites returned for $websiteName; please specify a slot"
    }

    # Grab SCM url to use with MSDeploy; there should only be one
    $msdeployurl = $website.EnabledHostNames | Where-Object { $_ -like "*.scm.*" }

    if ($msdeployurl -is [System.Object[]]) {
        throw [System.Exception] "Multiple SCM urls returned for $websiteName; consult Kudu/Azure portal to clarify."
    }

    # MSDeploy variables to use in arguments below
    $msdeployIisAppPath = $website.Name
    $msdeployIisSubAppPath = "$msdeployIisAppPath/app_data/jobs/$jobtype/$jobname"
    # The following is Azure specific; your mileage may vary
    $msdeployComputerName = "https://$msdeployurl/msdeploy.axd"
    $msdeployUserName = $website.PublishingUsername
    $msdeployPassword = $website.PublishingPassword

    # Build the msdeploy command, more info on this command here https://technet.microsoft.com/sv-se/library/dd569034(v=ws.10).aspx
    $webrootOutputFolder = (get-item $packOutput).FullName
    $publishArgs = @()
    $publishArgs += "-source:contentPath='$webrootOutputFolder'"
    $publishArgs += "-dest:contentPath='$msdeployIisSubAppPath',ComputerName='$msdeployComputerName',UserName='$msdeployUserName',Password='$msdeployPassword',IncludeAcls='False',AuthType='Basic'"
    $publishArgs += '-verb:sync'
    $publishArgs += '-usechecksum'
    $publishArgs += '-enablerule:AppOffline'
    $publishArgs += '-retryAttempts:2'
    $publishArgs += '-disablerule:BackupRule'
    # Uncomment the following if you want to keep files on the server
    #$publishArgs += '-enableRule:DoNotDeleteRule'

    $msdeployPath = Get-MSDeploy
    $msdeployArguments = $publishArgs -join ' '
    $msdeployArgumentsLog = $msdeployArguments.Replace($msdeployPassword, "{PASSWORD_REMOVED}")

    Write-Verbose "Executing MSDeploy command $msdeployPath $msdeployArgumentsLog"
    Execute-Command -exePath $msdeployPath -arguments $msdeployArguments

    Write-Verbose "Finished publish of $jobtype web job $jobname to $websiteName"
}

Write-Verbose "Finished requested publish of $jobtype web job $jobname to the following website(s): $websiteNames"
```

_This is also available as a
[Gist](https://gist.github.com/brandonmartinez/0c2ed9034010a0021d8c)._

Then from VSO, I can add a new _Azure PowerShell_ task setup similarly to this:

[![VSO Azure Web Job](http://assets.brandonmartinez.com/brandonmartinez/2015/10/azurewebjob.png)](http://assets.brandonmartinez.com/brandonmartinez/2015/10/azurewebjob.png)

The _Script Arguments_ field is setup similarly to this:

```powershell
-websiteNames "website001,website002" -jobname "MyWebJob" -jobtype "continuous" -packOutput $(Build.SourcesDirectory)\\$(system.teamProject)\\artifacts\\bin\\$(BuildConfiguration)\\Publish
```

This will then publish your web job in the appropriate location in your web app!
Of course, your mileage may vary.
