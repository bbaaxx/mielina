const { pipe } = require("rxjs/Rx");
const { of } = require("rxjs/observable/of");
const { map, mergeAll, catchError } = require("rxjs/operators");

/** Sync Stuff */
const getContextCreator = require("./messageContext");
const attemptToTrigerImpulse = require("./impulses");
const filterMessages = require("./filterMessages");
const conversationToContext = require("./conversation");

/** Async Stuff */
// const asyncAttemptSkillHandling = require('./skills');
const asyncResolveReaction = require("./resolveReaction");
const nlpProviderWrapper = require("./nlpProviderWrapper");
const asyncResortToNlpResponse = require("./nlpBasedResponse");

module.exports = (nlpProvider, skills) =>
  pipe(
    map(getContextCreator),
    map(attemptToTrigerImpulse),
    map(conversationToContext),
    map(filterMessages),
    /** Go async */
    map(nlpProviderWrapper(nlpProvider)),
    //   map(asyncAttemptSkillHandling),
    map(asyncResortToNlpResponse),
    map(asyncResolveReaction),
    // ... then flatten
    mergeAll(),
    catchError(error => of({ type: "error", error }))
  );
