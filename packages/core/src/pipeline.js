const { pipe } = require("rxjs/Rx");
const { of } = require("rxjs/observable/of");
const { map, mergeAll, catchError } = require("rxjs/operators");

/** Sync Stuff */
const createContext = require("./context");

// WIP {
const dispatchImpulses = require("./impulses");
const dispatchSkills = require("./skills");
// }

/** Async Stuff */
const nlpProviderWrapper = require("./nlpProviderWrapper");
const asyncResortToNlpResponse = require("./nlpBasedResponse");
const asyncResolveReaction = require("./resolveReaction");

module.exports = ({ providers }) =>
  pipe(
    map(createContext),
    map(dispatchImpulses),
    /** Go async */
    map(nlpProviderWrapper(providers.nlp)),
    map(dispatchSkills),
    map(asyncResortToNlpResponse),
    map(asyncResolveReaction),
    mergeAll(),
    catchError(error => of({ type: "error", error }))
  );
