import NotesHandler from './handler';
import type NotesService from '../../services/inPostgresql/notes_service';
import type NotesValidation from 'src/validation/notes';
import { type Server } from '@hapi/hapi';
import routes from './routes';

const NotesPlugin = {
  name: 'notes',
  version: '1.0.0',
  register: async (server: Server, { service, validator }: any) => {
    const notesHandler = new NotesHandler(service as NotesService, validator as NotesValidation);
    server.route(routes(notesHandler));
  }
};

export default NotesPlugin;
