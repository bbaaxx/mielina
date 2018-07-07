module.exports.discardOwnMessages = client => message =>
  Boolean(message.author.id !== client.user.id);

module.exports.discardBotMessages = message => !message.author.bot;

module.exports.marshallMessage = message => ({
  msgId: message.id,
  content: message.content,
  authorId: message.author.id,
  authorName: message.author.username,
  channel: message.channel.id,
  attachments: message.attachments,
});
