import Hapi from '@hapi/hapi';
import { SERVER_HOST, SERVER_PORT } from './const/common';
import { type Server } from '@hapi/hapi';
import NotesPlugin from './api/notes';
import NotesService from './services/inMemory/notes_service';

const init = async () => {
  const notesService = new NotesService();
  const server: Server = Hapi.server({
    port: SERVER_PORT,
    host: SERVER_HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  await server.register({
    plugin: NotesPlugin,
    options: {
      service: notesService
    }
  });

  await server.start();
  console.log(`Simple Notes API is running on ${server.info.uri}`);
};

init();
