module.exports = (message, overrides = {}) => ({
  type: "platform-message",
  message: {
    msgId: "mockId",
    content: message,
    authorId: "mockAuthor",
    authorName: "mockAuthorName",
    channel: "MOCK",
    attachments: void 0
  },
  ...overrides
});
