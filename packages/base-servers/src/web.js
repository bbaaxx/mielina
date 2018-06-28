const http = require('http');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const getApp = ({ PORT, NODE_ENV }) =>
  new Promise((resolve, reject) => {
    try {
      const app = express();
      if (NODE_ENV === 'development') app.use(morgan('tiny'));

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      // ...
      app.get('/*', express.static('static'));

      resolve(app);
    } catch (err) {
      reject(err);
    }
  });

const startServer = ({ PORT }) => app => {
  const server = app.listen(PORT, () =>
    console.log(`Express server running on port ${PORT}`)
  );
  return { server, app };
};

module.exports = config => getApp(config).then(startServer(config));
