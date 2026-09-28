# Simple Local Web Server for Mobile Testing
param([int]$Port = 5000)

$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch "Loopback|vEthernet|Virtual" -and $_.IPAddress -notmatch "^169\.254\." } | Select-Object -First 1).IPAddress
if (-not $ip) { $ip = "127.0.0.1" }

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
$listener.Start()

Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "    TECHZONE LOCAL WEB SERVER (TEST MOBILE & PC)          " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host " 1. Tren may tinh hien tai (PC):" -ForegroundColor Yellow
Write-Host "    http://localhost:$Port" -ForegroundColor White
Write-Host ""
Write-Host " 2. Tren Dien Thoai (iOS / iPhone & Android) cung WiFi:" -ForegroundColor Yellow
Write-Host "    http://${ip}:${Port}" -ForegroundColor Green
Write-Host ""
Write-Host " [Nhan Ctrl + C de dung server bat ky luc nao]" -ForegroundColor DarkGray
Write-Host "==========================================================" -ForegroundColor Cyan

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

$root = $PSScriptRoot

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::UTF8)
        $line = $reader.ReadLine()

        if ($line) {
            $parts = $line.Split(' ')
            if ($parts.Length -ge 2 -and $parts[0] -eq 'GET') {
                $rawPath = $parts[1].Split('?')[0]
                $relPath = [System.Uri]::UnescapeDataString($rawPath).TrimStart('/')
                if ([string]::IsNullOrWhiteSpace($relPath)) { $relPath = "index.html" }

                $filePath = [System.IO.Path]::Combine($root, $relPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))

                if ([System.IO.File]::Exists($filePath)) {
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                    $bytes = [System.IO.File]::ReadAllBytes($filePath)

                    $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($bytes.Length)`r`nConnection: close`r`nAccess-Control-Allow-Origin: *`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($bytes, 0, $bytes.Length)
                } else {
                    $notFound = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: 9`r`nConnection: close`r`n`r`nNot Found"
                    $notBytes = [System.Text.Encoding]::UTF8.GetBytes($notFound)
                    $stream.Write($notBytes, 0, $notBytes.Length)
                }
            }
        }
        $stream.Flush()
        $client.Close()
    } catch {
        # ignore client disconnect errors
    }
}
