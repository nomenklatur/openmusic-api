import { type ResponseObject, type Request, type ResponseToolkit } from '@hapi/hapi';
import { nanoid } from 'nanoid';
import { isEmpty } from './utils/helper';
import { type Note, type NotePayload } from './types/note';
import { RESPONSE_CODE, RESPONSE_STATUS } from './const/api';
import notes from './dummies/notes';

function addNoteHandler (req: Request, h: ResponseToolkit): ResponseObject {
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
      status: RESPONSE_STATUS.SUCCESS,
      message: 'Note Created Successfully',
      data: {
        noteId: id
      }
    });
    response.code(RESPONSE_CODE.CREATED);
    return response;
  }
  const response = h.response({
    status: RESPONSE_STATUS.ERROR,
    message: 'Fail to Create Note'
  });
  response.code(RESPONSE_CODE.INTERNAL_ERROR);
  return response;
}

function getAllNotesHandler () {
  return {
    status: RESPONSE_STATUS.SUCCESS,
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
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        note
      }
    };
  }

  const response = h.response({
    status: RESPONSE_STATUS.FAILED,
    message: 'Note not found'
  });
  response.code(RESPONSE_CODE.NOT_FOUND);
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
      status: RESPONSE_STATUS.SUCCESS,
      message: 'Update Success'
    });
    response.code(RESPONSE_CODE.OK);
    return response;
  }

  const response = h.response({
    status: RESPONSE_STATUS.FAILED,
    message: 'Update Failed'
  });
  response.code(RESPONSE_CODE.NOT_FOUND);
  return response;
}

function deleteNoteByIdHandler (req: Request, h: ResponseToolkit): ResponseObject {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: RESPONSE_STATUS.SUCCESS,
      message: 'Delete Success'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: RESPONSE_STATUS.FAILED,
    message: 'Delete Failed'
  });
  response.code(RESPONSE_CODE.NOT_FOUND);
  return response;
}

export { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };
