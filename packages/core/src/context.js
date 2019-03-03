const { Map } = require("immutable");

module.exports = ({ message }) =>
  Map({
    message,
    resolved: false,
    startedAt: new Date()
  });
