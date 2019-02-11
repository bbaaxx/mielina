const { pipe } = require("rxjs/Rx");
const { of } = require("rxjs/observable/of");
const { filter, map, mergeAll, catchError } = require("rxjs/operators");

const getContextCreator = require("./messageContext");
const attemptToTrigerImpulse = require("./impulses");
const filterMessages = require("./filterMessages");
const conversationToContext = require("./conversation");
// Async Stuff
// const asyncAttemptSkillHandling = require('./skills');
const asyncResolveReaction = require("./resolveReaction");
const asyncResortToNlpResponse = require("./nlpBasedResponse");
const nlpProviderWrapper = require("./nlpProviderWrapper");

module.exports.getMessagesPipeline = (servers, nlpProvider, skills) =>
  pipe(
    filter(i => i.type === "incoming-message"),

    map(getContextCreator(servers)),
    map(attemptToTrigerImpulse),
    map(conversationToContext),
    map(filterMessages),
    // Go async ...
    map(nlpProviderWrapper(nlpProvider)),
    //   map(asyncAttemptSkillHandling),
    map(asyncResortToNlpResponse),
    map(asyncResolveReaction),
    // ... then flatten
    mergeAll(),
    catchError(error => of({ type: "error", error }))
  );

module.exports.getEventsPipeline = servers =>
  pipe(
    filter(i => i.type !== "incoming-message")
    // catchError(error => of({ type: "error", error }))
  );
