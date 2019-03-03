const { addTopic } = require("@mielina/memory-short-term");

const conversations = addTopic("conversations", { stdTTL: 120 });
const conversationFactory = input => ({
  id: input.authorId,
  lastSeen: new Date(),
  messages: [input],
  isActive: false
});

const activate = conversation => () => {
  const { id } = conversation;
  conversations.set(id, { ...conversation, isActive: true });
  return conversations.get(id);
};

const end = ({ id }) => () => conversations.del(id);

module.exports = function(ctx) {
  const message = ctx.getMessage();
  let conversation = conversations.get(ctx.getAuthorId());
  if (conversation) {
    conversation.messages.push(message);
    conversation.isActive = true;
  } else {
    conversation = conversationFactory(message);
  }
  conversations.set(ctx.getAuthorId(), conversation);
  ctx.set("conversation", conversation);

  return {
    ...ctx,
    activateConversation: activate(conversation),
    endConversation: end(conversation)
  };
};
