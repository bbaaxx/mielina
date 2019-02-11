const getMockIoAdapter = require("../mocks/mockIoAdapter");
const getMockNlpProvider = require("../mocks/mockNlpProvider");

module.exports = (overrides = {}) => ({
  servers: {
    web: {},
    database: {},
    sockets: {}
  },
  adapters: [getMockIoAdapter()],
  nlpProvider: getMockNlpProvider(),
  skills: {
    impulses: [],
    reactions: []
  },
  ...overrides
});
