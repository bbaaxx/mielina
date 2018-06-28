const { checkForStaticReply, getStaticReply } = require('./staticReplies');

module.exports = function(ctx) {
  if (ctx.resolved()) return ctx;
  const content = ctx.getMessageContent();

  const iHaveAnImpulseReply = checkForStaticReply(content);
  const reaction = iHaveAnImpulseReply ? getStaticReply(content) : ctx.reaction;

  if (checkForStaticReply(content)) ctx.resolve(getStaticReply(content));

  return { ...ctx, handled: iHaveAnImpulseReply, reaction };
}
