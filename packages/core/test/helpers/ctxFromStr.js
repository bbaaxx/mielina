const contextCreator = require("../../src/messageContext");
const getTestMsg = require("./makeMessageObj");

module.exports = messageStr => contextCreator(getTestMsg(messageStr));
