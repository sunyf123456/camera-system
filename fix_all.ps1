$lines = [System.IO.File]::ReadAllLines("all.js")
$out = New-Object System.Collections.Generic.List[string]
$addedInit = $false

for ($i = 0; $i -lt $lines.Length; $i++) {
  $out.Add($lines[$i])
  if ($lines[$i] -match "^\s*existingBodyId" -and -not $addedInit) {
    $out.Add("let recStateInit = false;")
    $addedInit = $true
  }
}

$fixed = $false
for ($i = 0; $i -lt $out.Count; $i++) {
  if ($out[$i] -match "render\.recommend = function\(\)" -and -not $fixed) {
    $out[$i]   = "render.recommend = function() {"
    $out[++$i] = '  if (!recStateInit) {'
    $out[++$i] = '    recState = { step:1, budgetLow:5000, budgetHigh:30000, photoPct:50,'
    $out[++$i] = '      sceneTypes:[], sensorPrefer:"", brandPrefer:[], useUsed:false,'
    $out[++$i] = '      existingBodyId:"", existingLensId:"", results:[] };'
    $out[++$i] = '    recStateInit = true;'
    $out[++$i] = '  }'
    $out[++$i] = '  return render._recWizard();'
    $out[++$i] = '};'
    $fixed = $true
  }
}

[System.IO.File]::WriteAllLines("all.js", $out, [System.Text.Encoding]::UTF8)
Write-Host "Fixed"
