module.exports = async _ctx => {
  const ctx = await _ctx;
  if (ctx.get("resolved")) return ctx.get("reaction");
  console.warn("WARN >>> no middleware resolved the request");
  return ctx.get("reaction");
};
