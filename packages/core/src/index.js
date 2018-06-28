const servers = require('@mielina/base-servers');

const { pipe } = require('rxjs/Rx');
const { of } = require('rxjs/observable/of');
const { merge } = require('rxjs/observable/merge');
const { filter, map, mergeAll, catchError } = require('rxjs/operators');

const getContextCreator = require('./messageContext');
// const attemptToTrigerImpulse = require('./impulses');
// const filterMessages = require('./filterMessages');
// const conversationToContext = require('./skills/conversation');
// // Async Stuff
// const asyncProcessWithNlp = require('./nlp');
// const asyncAttemptSkillHandling = require('./skills');
// const asyncResolveReaction = require('./resolveReaction');
// const asyncResortToNlpResponse = require('./nlpBasedResponse');

// const token = process.env.DISCORD_BOT_TOKEN;
// const game = {
//   type: 'PLAYING',
//   name: 'with your mind',
// };

module.exports = async function({servers, adapters}) {
  // const discordAdapter = getDiscordAdapter();
  // const fbAdapter = getFbAdapter(servers);
  // const { inputs$, reactions$, commands$ } = discordAdapter;
  // const createMessageContext = getContextCreator(servers);

  // const messagesPipeline = pipe(
  //   filter(i => i.type === 'incoming-message'),
  //
  //   map(createMessageContext),
  //   map(attemptToTrigerImpulse),
  //   map(conversationToContext),
  //   map(filterMessages),
  //   // Go async ...
  //   map(asyncProcessWithNlp),
  //   map(asyncAttemptSkillHandling),
  //   map(asyncResortToNlpResponse),
  //   map(asyncResolveReaction),
  //   // ... then flatten
  //   mergeAll(),
  //
  //   catchError(error => of({ type: 'error', error })),
  // );

  // const eventsPipeline = pipe(
  //   filter(i => i.type !== 'incoming-message'),
  //   catchError(error => of({ type: 'error', error })),
  // );
  //
  // merge(inputs$.let(messagesPipeline), inputs$.let(eventsPipeline)).subscribe(
  //   reactions$,
  // );
  // merge(fbAdapter.inputs$.let(messagesPipeline), fbAdapter.inputs$.let(eventsPipeline)).subscribe(
  //   fbAdapter.reactions$,
  // );
  //
  // commands$.next({ type: 'connect', token });
  //
  // return { inputs$, reactions$ };
}
