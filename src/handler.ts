import { type Request, type ResponseToolkit } from '@hapi/hapi';
import { nanoid } from 'nanoid';
import { isEmpty } from './utils/helper';
import { type Note, type NotePayload } from './types/note';
import notes from './dummies/notes';

function addNoteHandler (req: Request, h: ResponseToolkit) {
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

function getNoteByIdHandler (req: Request, h: ResponseToolkit) {
  const { id } = req.params;
  const note: Note = notes.filter((item) => item.id === id )[0];  

  if (!isEmpty(note)) {
    return {
      status: 'success',
      data: {
        note,
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Note not found'
  });
  response.code(404);
  return response;
} 

export { addNoteHandler, getAllNotesHandler, getNoteByIdHandler };
