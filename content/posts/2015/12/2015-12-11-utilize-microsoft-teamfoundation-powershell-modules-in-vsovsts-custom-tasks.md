---
id: '23361'
coverImageUri: ''
title:
  'Utilize Microsoft.TeamFoundation PowerShell Modules in VSO/VSTS Custom Tasks'
date: '2015-12-11'
datetime: '2015-12-11T13:00:13.000Z'
categories: 'technology'
tags: 'powershell,visual studio online,visual studio team services'
excerpt:
  'If you haven''t been paying attention to the "New Microsoft", you may have
  missed that a lot of their new code is ending up on places like Github.
  Included in that is the backbone of their new Visual Studio Team Services
  build and deploy services: tasks.'
---

If you haven't been paying attention to the "New Microsoft", you may have missed
that a lot of their new code is ending up on places like Github. Included in
that is the backbone of their new
[Visual Studio Team Services](https://www.visualstudio.com/products/visual-studio-team-services-vs)
build and deploy services: tasks.

In exploring the
[Github repository](https://github.com/Microsoft/vso-agent-tasks 'Microsoft VSO Agent Tasks | Github'),
I noticed that they were making use of some interesting, non-public modules
(primarily in the `Microsoft.TeamFoundation.DistributedTask.*` namespace).
Several of their scripts referenced code like this:

```powershell
# Import the Task.Common and Task.Internal dll that has all the
cmdlets we need for Build Import-Module
"Microsoft.TeamFoundation.DistributedTask.Task.Internal" Import-Module
"Microsoft.TeamFoundation.DistributedTask.Task.Common"
```

In
[attempting to create my own tasks](http://donovanbrown.com/post/2015/10/05/how-do-i-upload-a-custom-task-for-build 'How do I upload a custom task for build? | Donovan Brown'),
I found that I couldn't do that same import. Errors like this would prevent me
from utilizing them:

```
##[error]import-module : Could not load file or assembly 'Microsoft.TeamFoundation.DistributedTask.Agent.Interfaces, Version=14.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a' or one of its dependencies.
The system cannot find the file specified. At C:\LR\MMS\Services\Mms\TaskAgentProvisioner\Tools \agents\default\tasks\ BuildDnxWebApp\0.1.11\Build-DnxWebApp.ps1:24 char:1
+ import-module "Microsoft.TeamFoundation.DistributedTask.Task.Internal"
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
+ CategoryInfo : NotSpecified: (:) [Import-Module], FileNotFoundException + FullyQualifiedErrorId : System.IO.FileNotFoundException, + Microsoft.PowerShell.Commands.ImportModuleCommand
```

After **much** investigation, I found where the modules live on the VSO/VSTS
server. Change your import line to directly reference the agent's module path:

```powershell
# Import the Task.Common and Task.Internal dll that has all the cmdlets we need for Build
$agentWorkerModulesPath = "$($env:AGENT\_HOMEDIRECTORY)\\agent\\worker\\Modules"
$agentDistributedTaskInternalModulePath = "$agentWorkerModulesPath\\Microsoft.TeamFoundation.DistributedTask.Task.Internal\\Microsoft.TeamFoundation.DistributedTask.Task.Internal.dll"
$agentDistributedTaskCommonModulePath = "$agentWorkerModulesPath\\Microsoft.TeamFoundation.DistributedTask.Task.Common\\Microsoft.TeamFoundation.DistributedTask.Task.Common.dll"
Write-Host "Importing VSTS Module $agentDistributedTaskInternalModulePath"

Import-Module $agentDistributedTaskInternalModulePath
Write-Host "Importing VSTS Module $agentDistributedTaskCommonModulePath"
Import-Module $agentDistributedTaskCommonModulePath
```

The vital part is the `$env:AGENT_HOMEDIRECTORY`. This is a
[predefined variable](https://msdn.microsoft.com/en-us/Library/vs/alm/Build/scripts/variables 'Working with predefined variables | MSDN')
available to the build runner pointing to the agent's home directory. Underneath
this is where the tasks, modules, and other agent-specific assets live. After
prefixing the modules with the proper path, I was back in business!

Hopefully this helps someone; I couldn't find a single piece of info on this.
Good luck!
