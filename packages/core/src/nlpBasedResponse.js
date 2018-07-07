const { basicTextReply } = require('./actions');

module.exports = async (_ctx) => {
  const ctx = await _ctx;
  if (ctx.resolved()) return ctx;

  const nlp = ctx.get('nlp');
  if (typeof nlp !== 'object') {
    console.error('No NLP response recieved');
    return ctx;
  };
  if (!nlp.nlpFulfilled) {
    console.error('No fulfillment was provided by NLP');
    return ctx;
  }
  ctx.resolve(basicTextReply(nlp.fulfillment));
  return ctx;
};
