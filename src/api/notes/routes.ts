import { type ServerRoute } from '@hapi/hapi';
import type NotesHandler from './handler';

const routes = (handler: NotesHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHanlder
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler
  }
];

export default routes;
