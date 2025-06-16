import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PlusIcon, TrashIcon, DumbbellIcon } from 'lucide-react'

interface Exercise {
  id: string
  name: string
  sets: ExerciseSet[]
  date: string
}

interface ExerciseSet {
  id: string
  reps: number
  weight?: number
}

export default function WorkoutLog() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [newExerciseName, setNewExerciseName] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Load exercises from localStorage
  useEffect(() => {
    const savedExercises = localStorage.getItem('workout-log')
    if (savedExercises) {
      try {
        setExercises(JSON.parse(savedExercises))
      } catch (error) {
        console.error('Error loading exercises:', error)
      }
    }
  }, [])

  // Save exercises to localStorage
  useEffect(() => {
    localStorage.setItem('workout-log', JSON.stringify(exercises))
  }, [exercises])

  const addExercise = () => {
    if (newExerciseName.trim()) {
      const exercise: Exercise = {
        id: Date.now().toString(),
        name: newExerciseName.trim(),
        sets: [],
        date: selectedDate!,
      }
      setExercises([...exercises, exercise])
      setNewExerciseName('')
    }
  }

  const deleteExercise = (id: string) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id))
  }

  const addSet = (exerciseId: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const newSet: ExerciseSet = {
            id: Date.now().toString(),
            reps: 0,
            weight: 0,
          }
          return { ...exercise, sets: [...exercise.sets, newSet] }
        }
        return exercise
      })
    )
  }

  const updateSet = (exerciseId: string, setId: string, updates: Partial<ExerciseSet>) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map((set) => (set.id === setId ? { ...set, ...updates } : set)),
          }
        }
        return exercise
      })
    )
  }

  const deleteSet = (exerciseId: string, setId: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.filter((set) => set.id !== setId),
          }
        }
        return exercise
      })
    )
  }

  const getTodaysExercises = () => {
    return exercises.filter((exercise) => exercise.date === selectedDate)
  }

  const getStats = () => {
    const todaysExercises = getTodaysExercises()
    const totalSets = todaysExercises.reduce((sum, ex) => sum + ex.sets.length, 0)
    const totalReps = todaysExercises.reduce(
      (sum, ex) => sum + ex.sets.reduce((setSum, set) => setSum + set.reps, 0),
      0
    )
    const totalWeight = todaysExercises.reduce(
      (sum, ex) => sum + ex.sets.reduce((setSum, set) => setSum + (set.weight || 0), 0),
      0
    )

    return {
      exercises: todaysExercises.length,
      sets: totalSets,
      reps: totalReps,
      weight: totalWeight,
    }
  }

  const getRecentDates = () => {
    const dates = [...new Set(exercises.map((ex) => ex.date))].sort().reverse()
    return dates.slice(0, 7)
  }

  const stats = getStats()
  const recentDates = getRecentDates()
  const todaysExercises = getTodaysExercises()

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Date Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <label className="font-medium">Workout Date:</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
            {recentDates.length > 0 && (
              <div className="flex gap-2">
                <span className="text-sm text-muted-foreground">Recent:</span>
                {recentDates.slice(0, 5).map((date) => (
                  <Button
                    key={date}
                    variant={date === selectedDate ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDate(date)}
                  >
                    {new Date(date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.exercises}</div>
            <div className="text-sm text-muted-foreground">Exercises</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.sets}</div>
            <div className="text-sm text-muted-foreground">Sets</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.reps}</div>
            <div className="text-sm text-muted-foreground">Total Reps</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.weight}</div>
            <div className="text-sm text-muted-foreground">Total Weight (lbs)</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Exercise */}
      <Card>
        <CardHeader>
          <CardTitle>Add Exercise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Exercise name (e.g., Push-ups, Bench Press)"
              value={newExerciseName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewExerciseName(e.target.value)
              }
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === 'Enter' && addExercise()
              }
              className="flex-1"
            />
            <Button onClick={addExercise} disabled={!newExerciseName.trim()}>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Exercises */}
      {todaysExercises.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <DumbbellIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">
                No exercises logged for {new Date(selectedDate!).toLocaleDateString()}
              </p>
              <p>Add your first exercise above to start tracking your workout!</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {todaysExercises.map((exercise) => (
            <Card key={exercise.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <DumbbellIcon className="h-5 w-5" />
                    {exercise.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{exercise.sets.length} sets</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteExercise(exercise.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sets */}
                  {exercise.sets.length > 0 && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-10 gap-2 text-sm font-medium text-muted-foreground">
                        <div className="col-span-1">Set</div>
                        <div className="col-span-3">Reps</div>
                        <div className="col-span-3">Weight (lbs)</div>
                        <div className="col-span-3"></div>
                      </div>
                      {exercise.sets.map((set, index) => (
                        <div key={set.id} className="grid grid-cols-10 gap-2 items-center">
                          <div className="col-span-1 text-sm font-medium">{index + 1}</div>
                          <div className="col-span-3">
                            <Input
                              type="number"
                              value={set.reps || ''}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                updateSet(exercise.id, set.id, {
                                  reps: parseInt(e.target.value) || 0,
                                })
                              }
                              placeholder="0"
                              min="0"
                            />
                          </div>
                          <div className="col-span-3">
                            <Input
                              type="number"
                              value={set.weight || ''}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                updateSet(exercise.id, set.id, {
                                  weight: parseFloat(e.target.value) || 0,
                                })
                              }
                              placeholder="0"
                              min="0"
                              step="0.5"
                            />
                          </div>
                          <div className="col-span-3 flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteSet(exercise.id, set.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Set Button */}
                  <Button
                    variant="outline"
                    onClick={() => addSet(exercise.id)}
                    className="w-full gap-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add Set
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tips */}
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>💡 Tips:</strong>
            </p>
            <p>• Track your progress by logging reps and weight for each set</p>
            <p>• Use notes to record how the exercise felt or any form cues</p>
            <p>• Review previous workouts by selecting different dates</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
