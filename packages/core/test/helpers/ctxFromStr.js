const contextCreator = require("../../src/context");
const getTestMsg = require("./makeMessageObj");

module.exports = messageStr => contextCreator(getTestMsg(messageStr));
