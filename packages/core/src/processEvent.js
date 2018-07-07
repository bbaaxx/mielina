const askTheIa = require('../ia/nlp');
const handleWithASkill = require('./skills');

const botNameRegExp = new RegExp(process.env.BOT_NAME_REGEXP || 'bot', 'i');

module.exports = async function(ctx) {
  if (ctx.resolved()) return ctx;
  const { message, conversation } = ctx;
  const { authorId, content } = message;

  const fallbackAction = { type: 'ignore' };
  const getErrorAction = error => {
    type: 'system-error', error;
  };

  const theConversationIsActive = Boolean(
    conversation && conversation.isActive,
  );
  const iWasMentioned = botNameRegExp.test(String(content).toLowerCase());

  const reaction =
    iWasMentioned || theConversationIsActive
      ? await askTheIa(message)
          .then(handleWithASkill(ctx))
          .catch(err => getErrorAction)
      : fallbackAction;

  return { ...ctx, reaction };
}
