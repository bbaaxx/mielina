const botNameRegExp = new RegExp(process.env.BOT_NAME_REGEXP || "bot", "i");

module.exports = function(ctx) {
  if (ctx.resolved()) return ctx;
  const conversation = ctx.get("conversation");

  const activeConversation = Boolean(conversation) && conversation.isActive;
  const iWasMentioned = botNameRegExp.test(
    String(ctx.getMessageContent()).toLowerCase()
  );

  const type = iWasMentioned || activeConversation ? "process" : "ignore";

  return { ...ctx, type };
};
