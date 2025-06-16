import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { PlusIcon, TrashIcon } from 'lucide-react'

interface Note {
  id: string
  content: string
  timestamp: Date
}

export default function QuickNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('quick-notes')
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes).map(
          (note: { id: string; content: string; timestamp: string }) => ({
            ...note,
            timestamp: new Date(note.timestamp),
          })
        )
        setNotes(parsedNotes)
      } catch (error) {
        console.error('Error loading notes:', error)
      }
    }
  }, [])

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('quick-notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote.trim(),
        timestamp: new Date(),
      }
      setNotes([note, ...notes])
      setNewNote('')
    }
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return timestamp.toLocaleDateString()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      addNote()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Add Note Section */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <Textarea
              placeholder="Capture your thoughts and ideas..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyDown={handleKeyPress}
              className="min-h-[100px] resize-none"
              autoFocus
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Press Cmd/Ctrl + Enter to save</span>
              <Button onClick={addNote} disabled={!newNote.trim()} size="sm" className="gap-2">
                <PlusIcon className="h-4 w-4" />
                Add Note
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground">
                <div className="text-lg mb-2">📝</div>
                <p>No notes yet. Start capturing your ideas!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          notes.map((note) => (
            <Card key={note.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 space-y-2">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
                    <Badge variant="secondary" className="text-xs">
                      {formatTimestamp(note.timestamp)}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Stats */}
      {notes.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          {notes.length} note{notes.length !== 1 ? 's' : ''} saved
        </div>
      )}
    </div>
  )
}
