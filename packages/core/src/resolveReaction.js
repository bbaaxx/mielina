module.exports = async _ctx => {
  const ctx = await _ctx;
  console.log(ctx);
  if (ctx.resolved()) return ctx.getReaction();
  console.warn("WARN >>> no middleware resolved the request");
  const { reaction } = ctx;
  return reaction;
};
