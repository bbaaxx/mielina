const { merge } = require("rxjs/observable/merge");
const { getMessagesPipeline, getEventsPipeline } = require("./pipelines");

module.exports = function(config) {
  const { servers, adapters, nlpProvider, skills } = config;
  const messagesPipeline = getMessagesPipeline(servers, nlpProvider, skills);
  const eventsPipeline = getEventsPipeline(servers, skills);

  return adapters.map(adapter => ({
    adapter,
    subscriptions: merge(
      adapter.inputs$.let(messagesPipeline),
      adapter.inputs$.let(eventsPipeline)
    ).subscribe(adapter.reactions$)
  }));
};
