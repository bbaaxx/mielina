const { merge } = require("rxjs/observable/merge");
const { getMessagesPipeline, getEventsPipeline } = require("./pipelines");

module.exports = function(config) {
  const { servers, adapters, nlpProvider, skills } = config;
  const messagesPipeline = getMessagesPipeline(servers, nlpProvider, skills);
  const eventsPipeline = getEventsPipeline(servers, skills);

  return adapters.map(({ inputs$, reactions$ }) =>
    merge(
      inputs$.let(messagesPipeline),
      inputs$.let(eventsPipeline)
    ).subscribe(reactions$)
  );
};
