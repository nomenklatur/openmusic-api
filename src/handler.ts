import { type Request } from '@hapi/hapi';
import { nanoid } from 'nanoid';
import { type Note, type NotePayload } from './types/note';
import notes from './dummies/notes';

function addNoteHandler (req: Request, h: any) {
  const { title, tags, body } = req.payload as NotePayload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = null;

  const newNote: Note = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  });
  response.code(500);
  return response;
}

function getAllNotesHandler () {
  return {
    status: 'success',
    data: {
      notes
    }
  };
}

export { addNoteHandler, getAllNotesHandler };
