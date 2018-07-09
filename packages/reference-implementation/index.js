require("dotenv").config();

const runLoop = require("@mielina/core");
const getConsoleAdapter = require("@mielina/adapter-console");
const getServers = require("@mielina/base-servers");
const nlpProvider = require("@mielina/nlp-dialogflow");

/**
 * ### Configuration object ###
 * {
 *   servers: {
 *     web: [[ExpressJs Running Server Instance]],
 *     sockets: [[SocketIo running server instance (attached to web server)]],
 *     database: [[Mongoose instance already connected]],
 *   },
 *   adapters: [
 *     [[Messaging Platform Adapters]]
 *   ],
 *   skills: [ [[SkillObject]] ]
 * }
 */

const consoleAdapter = getConsoleAdapter();

const getConfig = servers => ({
  servers,
  adapters: [consoleAdapter],
  skills: {},
  nlpProvider
});

getServers().then(servers => runLoop(getConfig(servers)));
