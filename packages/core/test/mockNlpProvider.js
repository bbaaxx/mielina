module.exports = (echoObj = {}) => () =>
  Promise.resolve(
    Object.assign(
      {},
      {
        type: "nlp-response",
        lang: "test-lang",
        action: "test.action",
        parameters: ["test", "params"],
        nlpFulfilled: false,
        query: "test query"
      },
      echoObj
    )
  );
