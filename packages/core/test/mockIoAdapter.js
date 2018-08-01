const { Subject } = require("rxjs/Rx");
const { zip } = require("rxjs/observable/zip");
const { merge } = require("rxjs/observable/merge");
const { of } = require("rxjs/observable/of");

const marshallMessage = message => ({
  msgId: "TESTID123",
  content: message,
  authorId: "TEST AUTHOR",
  authorName: "Mr. Test author",
  channel: "MOCK",
  attachments: void 0
});

const commands$ = new Subject();
const reactions$ = new Subject();
const incoming$ = new Subject();

const inputs$ = incoming$.map(({ message }) => ({
  type: "incoming-message",
  message: marshallMessage(message)
}));

const messageLoop$ = zip(incoming$ , reactions$, (input, reaction) => ({
  ...reaction,
  input
}));

const pushMessage = message => incoming$.next({
  type: "platform-message",
  message
});

const subscribeHandler = handler =>
  merge(messageLoop$, commands$).subscribe(handler);

module.exports = function(handler = () => void 0) {
  const subscription = subscribeHandler(handler);
  
  return {
    inputs$,
    reactions$,
    commands$,
    subscription,
    pushMessage
  };
};
