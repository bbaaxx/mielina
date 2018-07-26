const checkFulfilled = fulfillment =>
  Boolean(fulfillment.messages) &&
  Array.isArray(fulfillment.messages) &&
  Boolean(fulfillment.messages.length > 0) &&
  Boolean(fulfillment.speech && fulfillment.speech !== "");

const getFulfillment = fl => fl.messages[0].speech;

module.exports = response => {
  const { result, lang, status } = response;
  const { action, parameters, fulfillment } = result || {};
  const nlpFulfilled = checkFulfilled(fulfillment);

  const reaction = {
    type: "nlp-response",
    lang,
    action,
    parameters,
    nlpFulfilled,
    query: result.resolvedQuery
  };

  if (action && action !== "" && reaction.nlpFulfilled)
    reaction.fulfillment = getFulfillment(fulfillment);

  return reaction;
};
