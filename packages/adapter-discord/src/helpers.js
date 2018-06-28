export const discardOwnMessages = client => message =>
  Boolean(message.author.id !== client.user.id);

export const discardBotMessages = message => !message.author.bot;

export const marshallMessage = message => ({
  msgId: message.id,
  content: message.content,
  authorId: message.author.id,
  authorName: message.author.username,
  channel: message.channel.id,
  attachments: message.attachments,
});
