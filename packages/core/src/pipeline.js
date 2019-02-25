const { pipe } = require("rxjs/Rx");
const { of } = require("rxjs/observable/of");
const { map, mergeAll, catchError } = require("rxjs/operators");

/** Sync Stuff */
const createContext = require("./messageContext");
const filterMessages = require("./filterMessages");

// WIP {
const dispatchImpulses = require("./impulsesDispatcher");
// }

/** Async Stuff */
const asyncResolveReaction = require("./resolveReaction");
const nlpProviderWrapper = require("./nlpProviderWrapper");
const asyncResortToNlpResponse = require("./nlpBasedResponse");

// WIP {
const dispatchSkills = require("./skillsDispatcher");
// }

module.exports = (nlpProvider, skills) =>
  pipe(
    map(createContext),
    map(dispatchImpulses),
    map(filterMessages),
    /** Go async */
    map(nlpProviderWrapper(nlpProvider)),

    // ....... Handle skills here .......
    map(dispatchSkills),
    map(asyncResortToNlpResponse),
    map(asyncResolveReaction),
    // ... then flatten
    mergeAll(),
    catchError(error => of({ type: "error", error }))
  );
