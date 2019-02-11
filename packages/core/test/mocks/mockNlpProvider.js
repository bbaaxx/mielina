module.exports = (echoObj = {}) => () =>
  Promise.resolve(
    Object.assign(
      {
        type: "nlp-response",
        lang: "mock-lang",
        action: "mock.action",
        parameters: ["mock", "params"],
        nlpFulfilled: false,
        query: "mock query",
        fulfillment: "mock response"
      },
      echoObj
    )
  );
