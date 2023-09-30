import Hapi from '@hapi/hapi';

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost'
  });

  await server.start();
  console.log(`Simple Notes API is running on ${server.info.uri}`);
};

init();
