const { Subject } = require("rxjs/Rx");
const { zip } = require("rxjs/observable/zip");
const { merge } = require("rxjs/observable/merge");

const marshallMessage = message => ({
  msgId: "mockId",
  content: message,
  authorId: "mockAuthor",
  authorName: "mockAuthorName",
  channel: "MOCK",
  attachments: void 0
});

module.exports = function(handler = () => void 0) {
  const commands$ = new Subject();
  const reactions$ = new Subject();
  const incoming$ = new Subject();

  const inputs$ = incoming$.map(({ message, type }) => ({
    type,
    message: marshallMessage(message)
  }));

  const messageLoop$ = zip(incoming$, reactions$, (input, reaction) => ({
    ...reaction,
    input
  }));

  return {
    inputs$,
    reactions$,
    commands$,

    // Imperative methods for testing
    subscription: merge(messageLoop$, commands$).subscribe(handler),
    pushMessage: message =>
      incoming$.next({
        type: "incoming-message",
        message
      }),
    pushEvent: event =>
      incoming$.next({
        type: "incoming-event",
        event
      })
  };
};
