module.exports = nlpProvider => async function(ctx) {
  if (ctx.resolved()) return ctx;
  const nlp = await nlpProvider(
    ctx.getMessageContent(),
    { sessionId: ctx.getAuthorId() }
  );
  ctx.set("nlp", nlp);
  return ctx;
};
