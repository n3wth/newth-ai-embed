import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, RefreshCw, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Color {
  hex: string
  name: string
  copied: boolean
}

const COLOR_NAMES = [
  'Crimson',
  'Coral',
  'Amber',
  'Emerald',
  'Teal',
  'Azure',
  'Indigo',
  'Violet',
  'Rose',
  'Orange',
  'Lime',
  'Cyan',
  'Blue',
  'Purple',
  'Pink',
  'Yellow',
  'Mint',
  'Lavender',
  'Peach',
  'Sage',
  'Slate',
  'Stone',
  'Zinc',
  'Gray',
]

function generateRandomColor(): string {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  )
}

function getColorName(): string {
  return COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)]!
}

function generatePalette(count: number = 5): Color[] {
  return Array.from({ length: count }, () => ({
    hex: generateRandomColor(),
    name: getColorName(),
    copied: false,
  }))
}

function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#000000' : '#ffffff'
}

function ColorCard({ color, onCopy }: { color: Color; onCopy: (hex: string) => void }) {
  const textColor = getContrastColor(color.hex)

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={() => onCopy(color.hex)}
    >
      <div
        className="h-32 flex items-center justify-center relative group"
        style={{ backgroundColor: color.hex }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        <div className="text-center z-10">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            {color.copied ? (
              <Check className="h-6 w-6 mx-auto mb-1" style={{ color: textColor }} />
            ) : (
              <Copy className="h-6 w-6 mx-auto mb-1" style={{ color: textColor }} />
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-3 space-y-2">
        <div className="text-center">
          <h3 className="font-medium text-sm">{color.name}</h3>
          <p className="text-xs text-muted-foreground font-mono">{color.hex.toUpperCase()}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ColorPalette() {
  const [palette, setPalette] = useState<Color[]>(() => generatePalette())
  const [paletteSize, setPaletteSize] = useState(5)

  const regeneratePalette = useCallback(() => {
    setPalette(generatePalette(paletteSize))
  }, [paletteSize])

  const copyToClipboard = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      setPalette((prev) =>
        prev.map((color) =>
          color.hex === hex ? { ...color, copied: true } : { ...color, copied: false }
        )
      )

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setPalette((prev) => prev.map((color) => ({ ...color, copied: false })))
      }, 2000)
    } catch {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = hex
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  const copyAllColors = async () => {
    const allColors = palette.map((color) => color.hex).join(', ')
    await copyToClipboard(allColors)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Palette className="h-5 w-5 text-purple-500" />
              Color Palette Generator
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Generate beautiful color palettes for your design projects
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="flex gap-2">
                {[3, 5, 7, 9].map((size) => (
                  <Button
                    key={size}
                    variant={paletteSize === size ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setPaletteSize(size)
                      setPalette(generatePalette(size))
                    }}
                  >
                    {size} colors
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-center">
              <Button onClick={regeneratePalette} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Generate New Palette
              </Button>
              <Button onClick={copyAllColors} variant="outline" className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Copy All
              </Button>
            </div>
          </CardContent>
        </Card>

        <div
          className={cn(
            'grid gap-4',
            paletteSize <= 3 && 'grid-cols-1 md:grid-cols-3',
            paletteSize === 5 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
            paletteSize === 7 && 'grid-cols-1 md:grid-cols-3 lg:grid-cols-7',
            paletteSize === 9 && 'grid-cols-1 md:grid-cols-3 lg:grid-cols-9'
          )}
        >
          {palette.map((color, index) => (
            <ColorCard key={`${color.hex}-${index}`} color={color} onCopy={copyToClipboard} />
          ))}
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Copy className="h-4 w-4" />
                <span>Click any color to copy its hex code</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="text-xs">
                  Perfect for web design
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Brand colors
                </Badge>
                <Badge variant="outline" className="text-xs">
                  UI themes
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
