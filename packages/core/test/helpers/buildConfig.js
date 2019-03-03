const getMockIoAdapter = require("../mocks/mockIoAdapter");
const getMockNlpProvider = require("../mocks/mockNlpProvider");

module.exports = (overrides = {}) => ({
  servers: {
    web: {},
    database: {},
    sockets: {}
  },
  adapters: [getMockIoAdapter()],
  providers: { nlp: getMockNlpProvider() },
  impulses: [],
  skills: [],
  ...overrides
});
