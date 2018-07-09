const rp = require("request-promise-native");

const marshallResponse = response => {
  const { query, topScoringIntent, entities } = response;
  const { intent, score } = topScoringIntent || {};
  return {
    type: "nlp-response",
    intent: (score && score < 0.7) || intent === "None" ? "NotSure" : intent,
    entities,
    query
  };
};

const luisUri = `${process.env.LUIS_ENDPOINT}/${process.env.LUIS_APPID}`;
const baseConfig = {
  uri: luisUri,
  qs: { "subscription-key": process.env.LUIS_SUBSCRIPTION_KEY },
  headers: { "User-Agent": "Request-Promise" },
  json: true
};

module.exports = text =>
  rp({ ...baseConfig, qs: { ...baseConfig.qs, q: text } }).then(
    marshallResponse
  );
// .catch(handleLuisError);

module.exports.handleLuisError = error => ({ type: "error", error });
