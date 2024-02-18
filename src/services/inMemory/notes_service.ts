import { type Note, type NotePayload } from '../../types/note';
import { isEmpty } from '../../utils/helper';
import { nanoid } from 'nanoid';
import { NotFoundException } from '../../const/http_exception';

class NotesService {
  _notes: Note[];

  constructor () {
    this._notes = [];
  }

  addNote (payload: NotePayload): string {
    const { title = 'untitled', body, tags } = payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote: Note = {
      id,
      title,
      body,
      tags,
      createdAt,
      updatedAt
    };

    this._notes.push(newNote);
    const isSuccess: boolean = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new Error();
    }

    return id;
  }

  getNotes (): Note[] {
    return this._notes;
  }

  getNoteById (id: string): Note {
    const note: Note = this._notes.filter((note) => note.id === id)[0];

    if (isEmpty(note)) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  editNoteById (id: string, payload: NotePayload) {
    const index = this._notes.findIndex((note) => note.id === id);
    const { title, body, tags } = payload;

    if (index === -1) {
      throw new NotFoundException('Note not found');
    }

    const updatedAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      body,
      tags,
      updatedAt
    };
  }

  deleteNoteById (id: string) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundException('Note not found');
    }

    this._notes.splice(index, 1);
  }
}

export default NotesService;
