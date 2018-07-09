const newId = require("uniquid");

module.exports.discardOwnMessages = client => message =>
  Boolean(message.author.id !== client.user.id);

module.exports.discardBotMessages = message => !message.author.bot;

module.exports.marshallMessage = message => ({
  msgId: newId(),
  content: message,
  authorId: "CONSOLE",
  authorName: "OP Root user",
  channel: "CONSOLE",
  attachments: void 0
});
