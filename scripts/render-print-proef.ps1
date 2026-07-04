# Rendert een DRUKKLAAR voorbeeld van een gesprekskaart als vector-PDF op ware
# grootte (74x109 mm eindformaat + 6 mm afloop = 86x121 mm mediavlak), via
# Microsoft Edge --print-to-pdf met @page-grootte in mm. Geen InDesign/IDML nodig.
#
# Output (map drukwerk/):
#   voorbeeld-kaart.pdf            -> schoon, dit upload je naar de drukker
#   voorbeeld-kaart-hulplijnen.pdf -> zelfde kaart + snijlijn/veilige marge/snijtekens
#   voorbeeld-kaart.png            -> preview op 300 dpi (alleen ter controle)
#
# Maten uit de drukker-templates:
#   mediavlak (afloop) 86 x 121 mm | snijlijn 74 x 109 mm | afloop 6 mm rondom
#
# Gebruik:  powershell -File scripts\render-print-proef.ps1

$ErrorActionPreference = "Stop"

$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "C:\Program Files\Microsoft\Edge\Application\msedge.exe" }
if (-not (Test-Path $edge)) { throw "Edge niet gevonden." }

# Eigen tijdelijk profiel: anders haakt een headless-aanroep aan een al
# draaiende Edge aan en worden de flags (--print-to-pdf) genegeerd.
$profiel = Join-Path $env:TEMP ("edge-print-" + [guid]::NewGuid().ToString("N"))
$errLog  = Join-Path $env:TEMP "edge-print-stderr.log"

function Invoke-Edge([string[]]$extra) {
  $base = @(
    "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
    "--user-data-dir=$profiel", "--virtual-time-budget=12000"
  )
  Start-Process -FilePath $edge -ArgumentList ($base + $extra) -NoNewWindow -Wait `
    -RedirectStandardError $errLog | Out-Null
}

$root = Split-Path $PSScriptRoot
$uit  = Join-Path $root "drukwerk"
if (-not (Test-Path $uit)) { New-Item -ItemType Directory -Path $uit | Out-Null }

# --- Inhoud van de voorbeeldkaart (kaart 01 uit kaarten-data.ts) -----------
$nr        = "01"
$themaNaam = "Mens &amp; betekenis"
$themaKlr  = "#875A6B"
$typeLabel = "Stelling"
$tekst     = "Het maakt mij niet uit of een tekst, foto of liedje door een mens of door AI is gemaakt, als ik er maar van geniet."

# Mens-icoon (fineliner, huisstijl) uit kaart-visual.tsx
$icoon = @"
<svg viewBox="0 0 32 32" fill="none" stroke="$themaKlr" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:9mm;height:9mm">
  <circle cx="12.5" cy="12" r="6.3" />
  <path d="M3.5 28 Q3.5 19 12.5 19 Q17 19 19.5 21.5" />
  <path d="M25 23.4 C21 20.6 21.6 17 25 18.5 C28.4 17 29 20.6 25 23.4 Z" />
</svg>
"@

# Snijtekens (crop marks) op de vier snijhoeken; lijnen lopen de afloop in.
function CropMark($x, $y, $dx, $dy) {
  "<path d='M$x $y l$dx 0 M$x $y l0 $dy' stroke='#2A2A2A' stroke-width='0.18' />"
}
$crop = @(
  (CropMark 6   6   -3.5 0), (CropMark 6   6   0 -3.5),   # linksboven
  (CropMark 80  6    3.5 0), (CropMark 80  6   0 -3.5),   # rechtsboven
  (CropMark 6   115 -3.5 0), (CropMark 6   115 0  3.5),   # linksonder
  (CropMark 80  115  3.5 0), (CropMark 80  115 0  3.5)    # rechtsonder
) -join "`n"

$guidesSvg = @"
<svg class="guides" width="86mm" height="121mm" viewBox="0 0 86 121"
     style="position:absolute;left:0;top:0;pointer-events:none">
  <rect x="0"  y="0"  width="86" height="121" fill="none" stroke="#1f9d55" stroke-width="0.18" stroke-dasharray="0.8 0.8"/>
  <rect x="6"  y="6"  width="74" height="109" fill="none" stroke="#E8009E" stroke-width="0.22"/>
  <rect x="11" y="11" width="64" height="99"  fill="none" stroke="#0094D6" stroke-width="0.18" stroke-dasharray="1 1"/>
  $crop
  <g font-family="Inter, sans-serif" font-size="1.7" fill="#E8009E">
    <text x="43" y="4.2" text-anchor="middle">afloopvlak 86 x 121 mm</text>
  </g>
</svg>
"@

function Build-Html([bool]$guides) {
  $guidesBlock = if ($guides) { $guidesSvg } else { "" }
  @"
<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Shantell+Sans:wght@600;700;800&display=block" rel="stylesheet">
<style>
  @page { size: 86mm 121mm; margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body { margin: 0; padding: 0; }
  .bleed {
    position: relative; width: 86mm; height: 121mm; overflow: hidden;
    background: #FAF6EE; font-family: 'Inter', sans-serif; color: #2A2A2A;
  }
  /* decoratief dubbel kader, ruim binnen de snijlijn (start 4 mm binnen trim) */
  .frame {
    position: absolute; left: 10mm; top: 10mm; width: 66mm; height: 101mm;
    border: 1.4pt solid #2A2A2A; border-radius: 7mm;
    padding: 6mm 6.4mm 5mm; display: flex; flex-direction: column;
  }
  .frame-accent {
    position: absolute; left: 11.7mm; top: 11.7mm; width: 62.6mm; height: 97.6mm;
    border: 0.7pt solid $themaKlr; border-radius: 5.6mm;
  }
  .hand { font-family: 'Shantell Sans', cursive; font-weight: 800; }
  .top { display: flex; align-items: flex-start; justify-content: space-between; }
  .nr  { font-family: 'Shantell Sans', cursive; font-weight: 700; font-size: 13pt; color: #B3ADA1; line-height: 1; }
  .thema { font-size: 14pt; color: $themaKlr; line-height: 1.05; margin-top: 1mm; }
  .badge {
    align-self: flex-start; margin-top: 2.4mm; border: 0.8pt solid $themaKlr; color: $themaKlr;
    border-radius: 999px; padding: 1mm 3mm; font-size: 7pt; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.13em;
  }
  .stelling { flex: 1; display: flex; align-items: center; font-size: 12.5pt; font-weight: 500; line-height: 1.34; padding: 4mm 0; }
  .voet { display: flex; align-items: center; justify-content: space-between; border-top: 0.7pt solid #E5DCCB; padding-top: 2mm; }
  .merk { font-size: 10.5pt; }
  .url  { font-size: 6.5pt; color: #5A5550; letter-spacing: 0.02em; }
</style></head>
<body>
  <div class="bleed">
    <div class="frame-accent"></div>
    <div class="frame">
      <div class="top">
        $icoon
        <span class="nr">$nr</span>
      </div>
      <div class="thema hand">$themaNaam</div>
      <span class="badge">$typeLabel</span>
      <div class="stelling">$tekst</div>
      <div class="voet">
        <span class="merk hand">AI met Max</span>
        <span class="url">aimetmax.nl/kaarten</span>
      </div>
    </div>
    $guidesBlock
  </div>
</body></html>
"@
}

function Render-Pdf([bool]$guides, [string]$outPdf) {
  $html = Build-Html $guides
  $tmp  = Join-Path $env:TEMP ("proef-" + [IO.Path]::GetFileNameWithoutExtension($outPdf) + ".html")
  $html | Out-File $tmp -Encoding utf8
  $url = "file:///" + ($tmp -replace '\\','/')
  if (Test-Path $outPdf) { Remove-Item $outPdf -Force }
  Invoke-Edge @("--no-pdf-header-footer", "--print-to-pdf=$outPdf", $url)
  if (Test-Path $outPdf) { Write-Host "OK: $outPdf" } else { throw "PDF mislukt: $outPdf" }
}

# Schone print-PDF (uploaden) + variant met hulplijnen (controle)
Render-Pdf $false (Join-Path $uit "voorbeeld-kaart.pdf")
Render-Pdf $true  (Join-Path $uit "voorbeeld-kaart-hulplijnen.pdf")

# Preview-PNG op 300 dpi (86x121 mm -> 1016x1429 px), alleen ter controle
$htmlP = Build-Html $false
$tmpP  = Join-Path $env:TEMP "proef-preview.html"
$htmlP | Out-File $tmpP -Encoding utf8
$pngUit = Join-Path $uit "voorbeeld-kaart.png"
if (Test-Path $pngUit) { Remove-Item $pngUit -Force }
# 86x121 mm bij 96 dpi CSS = 325x457 px; device-scale 3 -> ~975x1371 px (~288 dpi)
Invoke-Edge @("--hide-scrollbars", "--force-device-scale-factor=3",
  "--default-background-color=00000000", "--window-size=325,457",
  "--screenshot=$pngUit", ("file:///" + ($tmpP -replace '\\','/')))
if (Test-Path $pngUit) { Write-Host "OK: $pngUit" }

# Preview-PNG met hulplijnen (controle)
$htmlG = Build-Html $true
$tmpG  = Join-Path $env:TEMP "proef-preview-hulplijnen.html"
$htmlG | Out-File $tmpG -Encoding utf8
$pngG  = Join-Path $uit "voorbeeld-kaart-hulplijnen.png"
if (Test-Path $pngG) { Remove-Item $pngG -Force }
Invoke-Edge @("--hide-scrollbars", "--force-device-scale-factor=3",
  "--default-background-color=00000000", "--window-size=325,457",
  "--screenshot=$pngG", ("file:///" + ($tmpG -replace '\\','/')))
if (Test-Path $pngG) { Write-Host "OK: $pngG" }

if (Test-Path $profiel) { Remove-Item $profiel -Recurse -Force -ErrorAction SilentlyContinue }
