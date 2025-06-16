import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlusIcon, TrashIcon, BookIcon, CheckIcon } from 'lucide-react'

interface Book {
  id: string
  title: string
  author: string
  status: 'to-read' | 'reading' | 'completed'
  notes?: string
  dateAdded: string
  dateCompleted?: string
  rating?: number
}

export default function ReadingList() {
  const [books, setBooks] = useState<Book[]>([])
  const [newBook, setNewBook] = useState({ title: '', author: '' })
  const [activeTab, setActiveTab] = useState('to-read')

  // Load books from localStorage
  useEffect(() => {
    const savedBooks = localStorage.getItem('reading-list')
    if (savedBooks) {
      try {
        setBooks(JSON.parse(savedBooks))
      } catch (error) {
        console.error('Error loading books:', error)
      }
    }
  }, [])

  // Save books to localStorage
  useEffect(() => {
    localStorage.setItem('reading-list', JSON.stringify(books))
  }, [books])

  const addBook = () => {
    if (newBook.title.trim() && newBook.author.trim()) {
      const book: Book = {
        id: Date.now().toString(),
        title: newBook.title.trim(),
        author: newBook.author.trim(),
        status: 'to-read',
        dateAdded: new Date().toISOString().split('T')[0]!,
      }
      setBooks([...books, book])
      setNewBook({ title: '', author: '' })
    }
  }

  const deleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  const updateBookStatus = (id: string, status: Book['status']) => {
    setBooks(
      books.map((book) => {
        if (book.id === id) {
          const updates: Partial<Book> = { status }
          if (status === 'completed' && book.status !== 'completed') {
            updates.dateCompleted = new Date().toISOString().split('T')[0]
          }
          return { ...book, ...updates }
        }
        return book
      })
    )
  }

  const updateBookNotes = (id: string, notes: string) => {
    setBooks(books.map((book) => (book.id === id ? { ...book, notes } : book)))
  }

  const updateBookRating = (id: string, rating: number) => {
    setBooks(books.map((book) => (book.id === id ? { ...book, rating } : book)))
  }

  const getBooksByStatus = (status: Book['status']) => {
    return books.filter((book) => book.status === status)
  }

  const getStats = () => {
    const toRead = getBooksByStatus('to-read').length
    const reading = getBooksByStatus('reading').length
    const completed = getBooksByStatus('completed').length
    return { toRead, reading, completed, total: books.length }
  }

  const stats = getStats()

  const renderStars = (rating: number, bookId: string) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => updateBookRating(bookId, star)}
            className={`text-lg ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
          >
            ⭐
          </button>
        ))}
      </div>
    )
  }

  const renderBookCard = (book: Book) => (
    <Card key={book.id} className="group">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteBook(book.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>

          {book.status === 'completed' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rating:</span>
                {renderStars(book.rating || 0, book.id)}
              </div>
              {book.dateCompleted && (
                <p className="text-xs text-muted-foreground">
                  Completed: {new Date(book.dateCompleted).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Textarea
              placeholder="Add notes about this book..."
              value={book.notes || ''}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateBookNotes(book.id, e.target.value)
              }
              className="min-h-[60px] text-sm"
            />
          </div>

          <div className="flex gap-2">
            {book.status !== 'reading' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateBookStatus(book.id, 'reading')}
                className="gap-1"
              >
                <BookIcon className="h-3 w-3" />
                Start Reading
              </Button>
            )}
            {book.status !== 'completed' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateBookStatus(book.id, 'completed')}
                className="gap-1"
              >
                <CheckIcon className="h-3 w-3" />
                Mark Complete
              </Button>
            )}
            {book.status !== 'to-read' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateBookStatus(book.id, 'to-read')}
              >
                Move to To-Read
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Books</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.toRead}</div>
            <div className="text-sm text-muted-foreground">To Read</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.reading}</div>
            <div className="text-sm text-muted-foreground">Reading</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Book */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              placeholder="Book title"
              value={newBook.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
            />
            <Input
              placeholder="Author name"
              value={newBook.author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
            />
            <Button
              onClick={addBook}
              disabled={!newBook.title.trim() || !newBook.author.trim()}
              className="gap-2"
            >
              <PlusIcon className="h-4 w-4" />
              Add Book
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Books List */}
      <Card>
        <CardHeader>
          <CardTitle>My Reading List</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="to-read">To Read ({stats.toRead})</TabsTrigger>
              <TabsTrigger value="reading">Reading ({stats.reading})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
            </TabsList>

            <TabsContent value="to-read" className="space-y-4 mt-4">
              {getBooksByStatus('to-read').length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No books in your to-read list yet</p>
                </div>
              ) : (
                <div className="space-y-4">{getBooksByStatus('to-read').map(renderBookCard)}</div>
              )}
            </TabsContent>

            <TabsContent value="reading" className="space-y-4 mt-4">
              {getBooksByStatus('reading').length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No books currently being read</p>
                </div>
              ) : (
                <div className="space-y-4">{getBooksByStatus('reading').map(renderBookCard)}</div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4 mt-4">
              {getBooksByStatus('completed').length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No completed books yet</p>
                </div>
              ) : (
                <div className="space-y-4">{getBooksByStatus('completed').map(renderBookCard)}</div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
