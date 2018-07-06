const { marshallMessage } = require('./helpers');

module.exports.publishMessage = ({ message }) => ({
  type: 'incoming-message',
  message: marshallMessage(message),
});

module.exports.platformMessage = message => ({
  type: 'platform-message',
  message,
});

module.exports.adapterReady = () => ({ type: 'adapter-ready' });
