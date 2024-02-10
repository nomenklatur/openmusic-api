import { type ResponseObject, type Request, type ResponseToolkit } from '@hapi/hapi';
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
  const note: Note = notes.filter((item) => item.id === id)[0];

  if (!isEmpty(note)) {
    return {
      status: 'success',
      data: {
        note
      }
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Note not found'
  });
  response.code(404);
  return response;
}

function editNoteByIdHandler (req: Request, h: ResponseToolkit): ResponseObject {
  const { id } = req.params;
  const { title, tags, body } = req.payload as NotePayload;
  const updatedAt = new Date().toISOString();

  // find note object index by its id
  const index = notes.findIndex((note) => note.id === id);

  // replace the note object if index is found
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    };

    const response = h.response({
      status: 'success',
      message: 'Update Success'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Update Failed'
  });
  response.code(400);
  return response;
}

function deleteNoteByIdHandler (req: Request, h: ResponseToolkit): ResponseObject {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Delete Success'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Delete Failed'
  });
  response.code(404);
  return response;
}

export { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };
