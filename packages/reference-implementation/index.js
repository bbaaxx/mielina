require("dotenv").config();

const runLoop = require("@mielina/core");

const getServers = require("@mielina/base-servers");
const getNlpProvider = require("@mielina/nlp-apiai");
const getConsoleAdapter = require("@mielina/adapter-console");

/**
 * ### Configuration object ###
 * {
 *   nlpProvider: [[Configured NLP Provider]],
 *   servers: {
 *     web: [[ExpressJs *Running* Server Instance]],
 *     sockets: [[SocketIo *Running* server instance (attached to web server)]],
 *     database: [[Mongoose instance *already connected*]],
 *     ...
 *   },
 *   adapters: [
 *     [[PlatformAdapter]]
 *   ],
 *   skills: {
 *     impulses: [ [[Skill]] ],
 *     reactions: [ [[Skill]] ],
 *   }
 * }
 */
function makeConfig(servers) {
  // NLP Provider setup
  const nlpProviderConfig = {
    token: process.env.DF_CLIENT_ACCESS_TOKEN
  };
  const nlpProvider = getNlpProvider(nlpProviderConfig);

  // Platform Adapters setup
  const consoleAdapter = getConsoleAdapter();

  // return the configuration object
  return {
    servers,
    adapters: [
      consoleAdapter
    ],
    skills: {
      impulses: [],
      reactions: []
    },
    nlpProvider
  };
}

// Run the bot
getServers()
  .then(makeConfig)
  .then(runLoop);
