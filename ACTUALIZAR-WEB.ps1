#Requires -Version 5.1
[CmdletBinding()]
param([string]$Destination=(Join-Path $HOME 'Projects\Isaac-Daroch.github.io'),[switch]$ValidateOnly)
$ErrorActionPreference='Stop'
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js es necesario.' }
$arguments=@((Join-Path $PSScriptRoot 'tools\install-project.mjs'),'--destination',$Destination)
if ($ValidateOnly) { $arguments+='--validate-only' }
& node @arguments
exit $LASTEXITCODE
