import { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler } from './handler';
import { type ServerRoute } from '@hapi/hapi';

const routes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler
  }
];

export default routes;
