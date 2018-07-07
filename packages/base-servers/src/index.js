const getWebServer = require('./web');
const getSocketsServer = require('./sockets');
const getDatabaseConnection = require('./database');

module.exports = async () => {
  const webServer = await getWebServer(process.env);
  const webSocketServer = await getSocketsServer(webServer);
  // const databaseConnection = await getDatabaseConnection(process.env);
  return {
    web: webServer,
    sockets: webSocketServer,
    database: {}
    // database: databaseConnection,
  };
};
