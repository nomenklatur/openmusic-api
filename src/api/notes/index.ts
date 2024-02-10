import NotesHandler from './handler';
import type NotesService from '../../services/inMemory/notes_service';
import { type Server } from '@hapi/hapi';
import routes from './routes';

const NotesPlugin = {
  name: 'notes',
  version: '1.0.0',
  register: async (server: Server, { service }: any) => {
    const notesHandler = new NotesHandler(service as NotesService);
    server.route(routes(notesHandler));
  }
};

export default NotesPlugin;
