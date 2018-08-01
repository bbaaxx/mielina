const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const botLoop = require("../src");

const getMockIoAdapter = require("./mockIoAdapter");
const getMockNlpProvider = require("./mockNlpProvider");

const { expect } = chai;
chai.use(sinonChai);

/*   The bare-bones configuration object:
{
  servers: {
    web: {},
    database: {},
    sockets: {}
  },
  adapters: [ { inputs$: Observable, commands$: Subject, reactions$: Subject } ],
  nlpProvider: () => Promise<{
    type: String,
    lang: String,
    action: String,
    parameters: [{ [paramName]: String }],
    nlpFulfilled: Boolean,
    query: String
  }>,
  skills: {
    impulses: [],
    reactions: []
  }
}
*/
const buildConfig = (overrides = {}) => ({
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

describe("botLoop test", function() {

  it("should test botLoop", function(done) {
    const mockMessage = "Test string !!!";
    const mockIoAdapter = getMockIoAdapter(output => {
      expect(output.input.message).to.eq(mockMessage);
      expect(output.input.type).to.eq("platform-message");
      done();
    });
    const { pushMessage } = mockIoAdapter;
    const mockConfig = buildConfig({ adapters: [mockIoAdapter] });

    botLoop(mockConfig);
    pushMessage(mockMessage);
  });

});
