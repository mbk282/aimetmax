# Rendert de doosje-SVG's (voorkant + achterkant) naar print-klare PNG's.
# Laadt Shantell Sans + Inter (huisstijlfonts) via Google Fonts en schiet op 4x
# device-scale -> 2760x3760 px (portret 690x940 @ 4x). Vereist Microsoft Edge.
#
# Gebruik:  powershell -File scripts\render-doosje.ps1

$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "C:\Program Files\Microsoft\Edge\Application\msedge.exe" }
if (-not (Test-Path $edge)) { throw "Edge niet gevonden." }

$root = Split-Path $PSScriptRoot
$map = Join-Path $root "public\kaarten"
$paren = @("doosje", "achterkant")

foreach ($naam in $paren) {
  $svgPad = Join-Path $map "$naam.svg"
  $uit = Join-Path $map "$naam.png"
  if (-not (Test-Path $svgPad)) { Write-Host "Overslaan (geen $svgPad)"; continue }
  $svgInhoud = Get-Content $svgPad -Raw -Encoding utf8

  $html = @"
<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Shantell+Sans:wght@500;700;800&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;padding:0;width:690px;height:940px;background:#FAF6EE;overflow:hidden}
  svg{display:block;width:690px;height:940px}
</style></head>
<body>$svgInhoud</body></html>
"@

  $tmp = Join-Path $env:TEMP "render-doosje-$naam.html"
  $html | Out-File $tmp -Encoding utf8

  & $edge --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=4 `
    --default-background-color=00000000 --window-size=690,940 --virtual-time-budget=12000 `
    --screenshot="$uit" "file:///$($tmp -replace '\\','/')" 2>$null | Out-Null

  if (Test-Path $uit) { Write-Host "OK: $uit" } else { throw "Render mislukt: $naam" }
}
