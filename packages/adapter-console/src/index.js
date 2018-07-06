const readline = require('readline');
const { Subject, Observable } = require('rxjs/Rx');
const { zip } = require('rxjs/observable/zip');
const { merge } = require('rxjs/observable/merge');
const { fromEvent } = require('rxjs/observable/fromEvent');

const {
  publishMessage,
  platformMessage
} = require('./actions');
const actionHandler = require('./handlers');

const client = readline.createInterface(process.stdin, process.stdout);
client.setPrompt('(OP Root user)#> ');

const commands$ = new Subject();
const reactions$ = new Subject();

const platformMessages$ = fromEvent(client, 'line')
  .map(platformMessage);

const messageLoop$ = zip(
  platformMessages$,
  reactions$,
  (input, reaction) => ({ ...reaction, input })
);

const platformSubscription = merge(messageLoop$, commands$).subscribe(
  actionHandler(client)
);

module.exports = () => ({
  inputs$: platformMessages$.map(publishMessage),
  reactions$,
  commands$
});
