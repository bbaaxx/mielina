module.exports = nlpProvider =>
  async function(ctx) {
    if (ctx.get("resolved")) return ctx;
    const { content, authorId } = ctx.get("message");
    return ctx.set("nlp", await nlpProvider(content, { sessionId: authorId }));
  };
