interface Note {
  id: string
  title: string
  createdAt: string
  updatedAt: string | null
  tags: string[]
  body: string
}

interface NotePayload {
  title: string
  tags: string[]
  body: string
}

export type { Note, NotePayload };
