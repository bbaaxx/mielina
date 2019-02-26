const I = require("immutable");
const { of } = require("rxjs");

module.exports = ({ message }) =>
  I.Map({
    message,
    resolved: false,
    startedAt: new Date()
  });
