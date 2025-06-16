import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CopyIcon, DownloadIcon } from 'lucide-react'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [size, setSize] = useState(200)

  // Auto-generate QR code when text or size changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!text.trim()) {
        setQrCodeUrl('')
        return
      }

      const encodedText = encodeURIComponent(text.trim())
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`
      setQrCodeUrl(url)
    }, 300)

    return () => clearTimeout(timer)
  }, [text, size])

  const downloadQRCode = async () => {
    if (!qrCodeUrl) return

    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `qr-code-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading QR code:', error)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>📱 QR Code Generator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Enter text or URL:</label>
              <Textarea
                placeholder="Enter any text, URL, email, phone number..."
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Size: {size}x{size}px
              </label>
              <Input
                type="range"
                min="100"
                max="400"
                step="50"
                value={size}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSize(Number(e.target.value))
                }
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={copyToClipboard}
                disabled={!text.trim()}
                variant="outline"
                className="gap-2"
              >
                <CopyIcon className="h-4 w-4" />
                Copy Text
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Display */}
        <Card>
          <CardHeader>
            <CardTitle>Generated QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qrCodeUrl ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-lg shadow-sm border">
                      <img
                        src={qrCodeUrl}
                        alt="Generated QR Code"
                        className="max-w-full h-auto"
                        style={{ width: size, height: size }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {size}x{size}px
                      </Badge>
                      <Button onClick={downloadQRCode} size="sm" className="gap-2">
                        <DownloadIcon className="h-4 w-4" />
                        Download PNG
                      </Button>
                    </div>

                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">Content:</p>
                      <p className="text-sm font-mono break-all">{text}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-muted-foreground">Enter text or URL to generate QR code</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info */}
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>Supported formats:</strong> URLs, text, email (mailto:), phone (tel:), WiFi
              credentials
            </p>
            <p>
              <strong>WiFi format:</strong> WIFI:T:WPA;S:NetworkName;P:Password;;
            </p>
            <p>
              <strong>Tip:</strong> QR codes are generated automatically as you type
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
