import dotenv from 'dotenv';
dotenv.config();
import Hapi from '@hapi/hapi';
import routes from './routes';
import { SERVER_HOST, SERVER_PORT } from './const/common';
import { type Server } from '@hapi/hapi';

const init = async () => {
  const server: Server = Hapi.server({
    port: SERVER_PORT,
    host: SERVER_HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route(routes);
  await server.start();
  console.log(`Simple Notes API is running on ${server.info.uri}`);
};

init();
