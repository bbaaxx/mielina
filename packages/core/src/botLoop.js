const getPipeline = require("./pipeline");

module.exports = function(config) {
  const { adapters, providers, impulses, skills } = config;
  const messagesPipeline = getPipeline(providers.nlp, impulses, skills);

  return adapters.map(adapter => ({
    adapter,
    subscription: adapter.inputs$
      .let(messagesPipeline)
      .subscribe(adapter.reactions$)
  }));
};
