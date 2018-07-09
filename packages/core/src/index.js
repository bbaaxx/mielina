const { pipe } = require("rxjs/Rx");
const { of } = require("rxjs/observable/of");
const { merge } = require("rxjs/observable/merge");
const { filter, map, mergeAll, catchError } = require("rxjs/operators");

const getContextCreator = require("./messageContext");
const attemptToTrigerImpulse = require("./impulses");
const filterMessages = require("./filterMessages");
const conversationToContext = require("./conversation");
// Async Stuff
// const asyncAttemptSkillHandling = require('./skills');
const asyncResolveReaction = require("./resolveReaction");
const asyncResortToNlpResponse = require("./nlpBasedResponse");

// const discordToken = process.env.DISCORD_BOT_TOKEN;
// const game = {
//   type: 'PLAYING',
//   name: 'with your mind',
// };

const getMessagePipeline = (servers, nlpProvider) =>
  pipe(
    filter(i => i.type === "incoming-message"),

    map(getContextCreator(servers)),
    map(attemptToTrigerImpulse),
    map(conversationToContext),
    map(filterMessages),
    // Go async ...
    map(nlpProvider),
    //   map(asyncAttemptSkillHandling),
    map(asyncResortToNlpResponse),
    map(asyncResolveReaction),
    // ... then flatten
    mergeAll(),
    catchError(error => of({ type: "error", error }))
  );

const getEventsPipeline = servers =>
  pipe(
    filter(i => i.type !== "incoming-message"),
    catchError(error => of({ type: "error", error }))
  );

module.exports = async ({ servers, adapters, nlpProvider }) =>
  adapters.map(({ inputs$, reactions$ }) =>
    merge(
      inputs$.let(getMessagePipeline(servers, nlpProvider)),
      inputs$.let(getEventsPipeline(servers))
    ).subscribe(reactions$)
  );
