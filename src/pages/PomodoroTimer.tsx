import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

type TimerMode = 'work' | 'break'
type TimerStatus = 'idle' | 'running' | 'paused'

const WORK_DURATION = 25 * 60 // 25 minutes in seconds
const BREAK_DURATION = 5 * 60 // 5 minutes in seconds

export default function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('work')
  const [status, setStatus] = useState<TimerStatus>('idle')
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION)
  const [completedSessions, setCompletedSessions] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgress = (): number => {
    const totalTime = mode === 'work' ? WORK_DURATION : BREAK_DURATION
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  const startTimer = () => {
    setStatus('running')
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer completed
          setStatus('idle')
          if (mode === 'work') {
            setCompletedSessions((prev) => prev + 1)
            setMode('break')
            setTimeLeft(BREAK_DURATION)
          } else {
            setMode('work')
            setTimeLeft(WORK_DURATION)
          }
          return mode === 'work' ? BREAK_DURATION : WORK_DURATION
        }
        return prev - 1
      })
    }, 1000)
  }

  const pauseTimer = () => {
    setStatus('paused')
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const resetTimer = () => {
    setStatus('idle')
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setTimeLeft(mode === 'work' ? WORK_DURATION : BREAK_DURATION)
  }

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode)
    setStatus('idle')
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setTimeLeft(newMode === 'work' ? WORK_DURATION : BREAK_DURATION)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const isWork = mode === 'work'
  const progress = getProgress()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-md">
        <Card className="overflow-hidden">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              {isWork ? (
                <Zap className="h-5 w-5 text-orange-500" />
              ) : (
                <Coffee className="h-5 w-5 text-green-500" />
              )}
              <CardTitle className="text-xl">{isWork ? 'Focus Time' : 'Break Time'}</CardTitle>
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                variant={isWork ? 'default' : 'outline'}
                size="sm"
                onClick={() => switchMode('work')}
                disabled={status === 'running'}
              >
                Work
              </Button>
              <Button
                variant={!isWork ? 'default' : 'outline'}
                size="sm"
                onClick={() => switchMode('break')}
                disabled={status === 'running'}
              >
                Break
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Timer Display */}
            <div className="text-center space-y-4">
              <div className="relative w-48 h-48 mx-auto">
                {/* Progress Ring */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-muted-foreground/20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                    className={cn(
                      'transition-all duration-1000 ease-linear',
                      isWork ? 'text-orange-500' : 'text-green-500'
                    )}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Time Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-mono font-bold">{formatTime(timeLeft)}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {Math.floor(progress)}% complete
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2 justify-center">
              {status === 'idle' || status === 'paused' ? (
                <Button onClick={startTimer} className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  {status === 'paused' ? 'Resume' : 'Start'}
                </Button>
              ) : (
                <Button onClick={pauseTimer} variant="outline" className="flex items-center gap-2">
                  <Pause className="h-4 w-4" />
                  Pause
                </Button>
              )}

              <Button onClick={resetTimer} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>

            {/* Stats */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  Sessions: {completedSessions}
                </Badge>
                <Badge variant={status === 'running' ? 'default' : 'outline'} className="text-sm">
                  {status === 'running' ? 'Active' : status === 'paused' ? 'Paused' : 'Ready'}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground">
                {isWork
                  ? "Focus on your task. You've got this!"
                  : 'Take a break. Stretch, hydrate, relax.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
