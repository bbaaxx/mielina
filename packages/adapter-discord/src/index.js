const Discord = require('discord.js');
const { Subject, Observable } = require('rxjs/Rx');
const { zip } = require('rxjs/observable/zip');
const { merge } = require('rxjs/observable/merge');
const { fromEvent } = require('rxjs/observable/fromEvent');

const {
  adapterReady,
  publishMessage,
  platformMessage
} = require('./actions');
const actionHandler = require('./handlers');
const { discardOwnMessages, discardBotMessages } = require('./helpers');

const client = new Discord.Client();

const commands$ = new Subject();
const reactions$ = new Subject();

// TODO: Let the bot handle the errors
client.on('error', console.error);

const platformMessages$ = fromEvent(client, 'message')
  .filter(discardOwnMessages(client))
  .filter(discardBotMessages)
  .map(platformMessage);

const platformEvents$ = merge(fromEvent(client, 'ready').map(adapterReady));

const messageLoop$ = zip(
  merge(platformEvents$, platformMessages$),
  reactions$,
  (input, reaction) => ({ ...reaction, input })
);

const platformSubscription = merge(messageLoop$, commands$).subscribe(
  actionHandler(client)
);

module.exports = () => ({
  inputs$: merge(platformEvents$, platformMessages$.map(publishMessage)),
  reactions$,
  commands$
});
