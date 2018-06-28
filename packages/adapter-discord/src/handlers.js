const logPrefix = 'Adapter[discordJs]:';

const wait = t => new Promise(r => setTimeout(r, t));

const makeMessage = reaction => {
  switch (reaction.contentType) {
    case 'text':
    case 'embed':
      return reaction.content;
    case 'nlp-response':
      return reaction.fulfillment;
    default:
      return;
  }
};

const platformActions = {
  'default-action'(client, reaction) {
    console.warn(
      `${logPrefix} I don't know what to do with reaction type: ${
        reaction.type
      }`
    );
  },
  ignore() {
    return;
  },
  error(_, reaction) {
    console.log('errored Reaction', reaction);
    return console.error(`${logPrefix} I have an error: ${reaction.error}`);
  },
  'message-reply'(_, reaction) {
    const { input, message } = reaction;
    const { channel } = input.message;
    channel.startTyping();
    wait(1000).then(
      () => channel.send(makeMessage(message)) && channel.stopTyping()
    );
  },
  connect(client, reaction) {
    const { token } = reaction;
    client.login(token);
  },
  'set-presence'(client, reaction) {
    const { presence } = reaction;
    client.user.setPresence(presence);
  },
  'adapter-ready'(client, reaction) {
    console.log(`${logPrefix} logged in as ${client.user.tag}`);
  }
};

const getAction = actionType =>
  actionType in platformActions
    ? platformActions[actionType]
    : platformActions['default-action'];

module.export = client => action => {
  getAction(action.type)(client, action);
};
