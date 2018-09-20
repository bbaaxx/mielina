const newId = require("uniquid");

module.exports.publishMessage = ({ message }) => ({
  type: "incoming-message",
  message: {
    msgId: newId(),
    content: message,
    authorId: "CONSOLE",
    authorName: "OP Root user",
    channel: "CONSOLE",
    attachments: void 0
  }
});

module.exports.platformMessage = message => ({
  type: "platform-message",
  message
});
