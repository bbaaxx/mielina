const basicTextReply = text => ({
  type: text && text !== "" ? "message-reply" : "ignore",
  message: { contentType: "text", content: text }
});

module.exports = async _ctx => {
  const ctx = await _ctx;
  if (ctx.get("resolved")) return ctx;
  const nlp = ctx.get("nlp");
  if (typeof nlp !== "object" || !nlp.nlpFulfilled) {
    return ctx;
  }
  return ctx
    .set("resolved", true)
    .set("reaction", basicTextReply(nlp.fulfillment));
};
