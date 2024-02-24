import { Pool, type QueryConfig, type QueryResult } from 'pg';
import type { Note, NotePayload } from 'src/types/note';
import { nanoid } from 'nanoid';
import { isEmpty } from 'src/utils/helper';
import { NotFoundException } from 'src/const/http_exception';

class NotesService {
  _pool: Pool;

  constructor () {
    this._pool = new Pool();
  }

  async addNote (payload: NotePayload): Promise<string> {
    const { title = 'untitled', body, tags } = payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query: QueryConfig = {
      text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, title, body, tags, createdAt, updatedAt]
    };

    const result: QueryResult<Note> = await this._pool.query(query);

    return result.rows[0].id;
  }

  async getNotes (): Promise<Note[]> {
    const query: QueryConfig = {
      text: 'SELECT * FROM notes'
    };
    const result: QueryResult<Note> = await this._pool.query(query);

    return result.rows;
  }

  async getNoteById (id: string): Promise<Note> {
    const query: QueryConfig = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id]
    };
    const result: QueryResult<Note> = await this._pool.query(query);

    if (isEmpty(result.rows)) {
      throw new NotFoundException('Note not found');
    }

    return result.rows[0];
  }

  async editNoteById (id: string, payload: NotePayload) {
    const { title, body, tags } = payload;
    const updatedAt = new Date().toISOString();
    const query: QueryConfig = {
      text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [title, body, tags, updatedAt, id]
    };

    const result: QueryResult<Note> = await this._pool.query(query);

    if (isEmpty(result.rows)) {
      throw new NotFoundException('Note not found');
    }
  }

  async deleteNoteById (id: string) {
    const query: QueryConfig = {
      text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
      values: [id]
    };

    const result: QueryResult = await this._pool.query(query);

    if (isEmpty(result.rows)) {
      throw new NotFoundException('Note not found');
    }
  }
}

export default NotesService;
