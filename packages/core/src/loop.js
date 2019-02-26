const getPipeline = require("./pipeline");

module.exports = function(config) {
  const { adapters } = config;
  return adapters.map(adapter => ({
    adapter,
    subscription: adapter.inputs$
      .let(getPipeline(config))
      .subscribe(adapter.reactions$)
  }));
};
