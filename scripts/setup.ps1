param([switch]$WithBrowser)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot
$toolsDirectory = Join-Path $projectRoot '.tools'
$cacheDirectory = Join-Path $projectRoot '.cache'
New-Item -ItemType Directory -Path $toolsDirectory, $cacheDirectory -Force | Out-Null
$bunExecutable = Join-Path $toolsDirectory 'bun.exe'
if (-not (Test-Path -LiteralPath $bunExecutable)) {
    $bunArchive = Join-Path $toolsDirectory 'bun-windows-x64.zip'
    Write-Host 'Downloading Bun into this project...'
    Invoke-WebRequest -Uri 'https://github.com/oven-sh/bun/releases/latest/download/bun-windows-x64.zip' -OutFile $bunArchive -UseBasicParsing
    Expand-Archive -LiteralPath $bunArchive -DestinationPath $toolsDirectory -Force
    Copy-Item -LiteralPath (Join-Path $toolsDirectory 'bun-windows-x64\bun.exe') -Destination $bunExecutable
}
$env:BUN_INSTALL = $toolsDirectory
$env:BUN_INSTALL_CACHE_DIR = Join-Path $cacheDirectory 'bun'
$env:BUN_RUNTIME_TRANSPILER_CACHE_PATH = Join-Path $cacheDirectory 'transpiler'
$env:ASTRO_TELEMETRY_DISABLED = '1'
& $bunExecutable --version
if ($LASTEXITCODE -ne 0) { throw 'Bun could not start.' }
& $bunExecutable install
if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
if ($WithBrowser) {
    $env:PLAYWRIGHT_BROWSERS_PATH = Join-Path $cacheDirectory 'playwright'
    & $bunExecutable run playwright install chromium
    if ($LASTEXITCODE -ne 0) { throw 'Browser download failed.' }
}
Write-Host 'Ready. Start the site with: .\.tools\bun.exe run dev'
