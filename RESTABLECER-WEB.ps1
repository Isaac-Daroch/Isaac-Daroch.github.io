#Requires -Version 5.1
[CmdletBinding()]
param([Parameter(Mandatory=$true)][string]$BackupPath)
$ErrorActionPreference='Stop'
& node (Join-Path $PSScriptRoot 'tools\restore-project.mjs') $BackupPath
exit $LASTEXITCODE
