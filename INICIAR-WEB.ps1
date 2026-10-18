#Requires -Version 5.1
[CmdletBinding()]
param()
$ErrorActionPreference='Stop'
$site=Join-Path $PSScriptRoot 'site'
if (-not (Test-Path -LiteralPath (Join-Path $site 'package-lock.json'))) { throw 'Falta package-lock.json. Usa el paquete completo.' }
if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) { throw 'Instala Node.js compatible y abre otra ventana PowerShell.' }
$env:ASTRO_TELEMETRY_DISABLED='1'
Push-Location $site
try {
  if (-not (Test-Path -LiteralPath (Join-Path $site 'node_modules'))) { & npm.cmd ci; if ($LASTEXITCODE -ne 0) { throw 'La instalacion de dependencias fallo.' } }
  & npm.cmd run build
  if ($LASTEXITCODE -ne 0) { throw 'La construccion no paso la verificacion. No se iniciara una version incompleta.' }
  Start-Process 'http://127.0.0.1:4321/'
  & node (Join-Path $PSScriptRoot 'tools\serve-dist.mjs')
} finally { Pop-Location }
