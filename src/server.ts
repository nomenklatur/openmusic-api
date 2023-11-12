import Hapi from '@hapi/hapi';
import routes from './routes';

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
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
