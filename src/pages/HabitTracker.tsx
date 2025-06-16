import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { PlusIcon, TrashIcon, CheckIcon } from 'lucide-react'

interface Habit {
  id: string
  name: string
  color: string
  streak: number
  completedDates: string[]
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [newHabitName, setNewHabitName] = useState('')

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
  ]

  // Load habits from localStorage
  useEffect(() => {
    const savedHabits = localStorage.getItem('habit-tracker')
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits))
      } catch (error) {
        console.error('Error loading habits:', error)
      }
    }
  }, [])

  // Save habits to localStorage
  useEffect(() => {
    localStorage.setItem('habit-tracker', JSON.stringify(habits))
  }, [habits])

  const addHabit = () => {
    if (newHabitName.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        name: newHabitName.trim(),
        color: colors[habits.length % colors.length]!,
        streak: 0,
        completedDates: [],
      }
      setHabits([...habits, habit])
      setNewHabitName('')
    }
  }

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id))
  }

  const toggleHabitToday = (id: string) => {
    const today = new Date().toISOString().split('T')[0]!

    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const isCompletedToday = habit.completedDates.includes(today)
          let newCompletedDates: string[]
          let newStreak = habit.streak

          if (isCompletedToday) {
            // Remove today's completion
            newCompletedDates = habit.completedDates.filter((date) => date !== today)
            newStreak = Math.max(0, habit.streak - 1)
          } else {
            // Add today's completion
            newCompletedDates = [...habit.completedDates, today].sort()

            // Calculate new streak
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            const yesterdayStr = yesterday.toISOString().split('T')[0]!

            if (habit.completedDates.includes(yesterdayStr) || habit.streak === 0) {
              newStreak = habit.streak + 1
            } else {
              newStreak = 1
            }
          }

          return {
            ...habit,
            completedDates: newCompletedDates,
            streak: newStreak,
          }
        }
        return habit
      })
    )
  }

  const getLastSevenDays = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push({
        date: date.toISOString().split('T')[0]!,
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        isToday: i === 0,
      })
    }
    return days
  }

  const isHabitCompletedOnDate = (habit: Habit, date: string) => {
    return habit.completedDates.includes(date)
  }

  const getTodayCompletionRate = () => {
    if (habits.length === 0) return 0
    const today = new Date().toISOString().split('T')[0]!
    const completedToday = habits.filter((habit) => habit.completedDates.includes(today)).length
    return Math.round((completedToday / habits.length) * 100)
  }

  const lastSevenDays = getLastSevenDays()
  const todayCompletionRate = getTodayCompletionRate()

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{habits.length}</div>
            <div className="text-sm text-muted-foreground">Active Habits</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{todayCompletionRate}%</div>
            <div className="text-sm text-muted-foreground">Today's Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{Math.max(...habits.map((h) => h.streak), 0)}</div>
            <div className="text-sm text-muted-foreground">Best Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Habit */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Habit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter habit name (e.g., Drink 8 glasses of water)"
              value={newHabitName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewHabitName(e.target.value)}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === 'Enter' && addHabit()
              }
              className="flex-1"
            />
            <Button onClick={addHabit} disabled={!newHabitName.trim()}>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Habits List */}
      {habits.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <div className="text-4xl mb-4">🎯</div>
              <p className="text-lg mb-2">No habits yet</p>
              <p>Start building better habits by adding your first one above!</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Habits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Week Header */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-5 text-sm font-medium">Habit</div>
                <div className="col-span-6 grid grid-cols-7 gap-1">
                  {lastSevenDays.map((day) => (
                    <div
                      key={day.date}
                      className={`text-xs text-center p-1 rounded ${
                        day.isToday ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {day.label}
                    </div>
                  ))}
                </div>
                <div className="col-span-1"></div>
              </div>

              {/* Habits */}
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className="grid grid-cols-12 gap-2 items-center p-2 rounded-lg border"
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${habit.color}`}></div>
                    <div>
                      <div className="font-medium">{habit.name}</div>
                      <div className="text-sm text-muted-foreground">{habit.streak} day streak</div>
                    </div>
                  </div>

                  <div className="col-span-6 grid grid-cols-7 gap-1">
                    {lastSevenDays.map((day) => {
                      const isCompleted = isHabitCompletedOnDate(habit, day.date)
                      const isToday = day.isToday

                      return (
                        <button
                          key={day.date}
                          onClick={() => isToday && toggleHabitToday(habit.id)}
                          disabled={!isToday}
                          className={`
                            w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors
                            ${
                              isCompleted
                                ? `${habit.color} border-transparent text-white`
                                : 'border-gray-300 hover:border-gray-400'
                            }
                            ${isToday && !isCompleted ? 'hover:bg-gray-100' : ''}
                            ${!isToday ? 'cursor-default' : 'cursor-pointer'}
                          `}
                        >
                          {isCompleted && <CheckIcon className="h-4 w-4" />}
                        </button>
                      )
                    })}
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteHabit(habit.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>💡 Tips:</strong>
            </p>
            <p>• Click on today's circle to mark a habit as complete</p>
            <p>• Build streaks by completing habits consistently</p>
            <p>
              • Start small - it's better to do something small daily than something big
              occasionally
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
