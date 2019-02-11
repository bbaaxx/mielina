const chai = require("chai");
const sinonChai = require("sinon-chai");

const botLoop = require("../src/botLoop");

const getMockIoAdapter = require("./mocks/mockIoAdapter");
const getMockNlpProvider = require("./mocks/mockNlpProvider");
const buildConfig = require("./helpers/buildConfig");

const { expect } = chai;
chai.use(sinonChai);

module.exports = function() {
  describe("mock adapter", function() {
    it("should start a botLoop with basic config and mock adapters provided", function(done) {
      const mockMessage = "Test string one !!!";
      const testCb = ({ input: { message } }) => {
        expect(message).to.eq(mockMessage);
        done();
      };

      const mockIoAdapter = getMockIoAdapter(testCb);
      const { pushMessage } = mockIoAdapter;
      const mockConfig = buildConfig({ adapters: [mockIoAdapter] });

      botLoop(mockConfig);
      pushMessage(mockMessage);
    });
  });

  describe("mock nlp provider", function() {
    it("should provide a valid mock response from the mock nlp adapter", function(done) {
      const mockResponse = "Test response !!!";
      const testReaction = reaction => {
        expect(reaction.message).to.exist;
        expect(reaction.message.content).to.eq(mockResponse);
        done();
      };

      botLoop(
        buildConfig({
          providers: {
            nlp: getMockNlpProvider({
              nlpFulfilled: true,
              fulfillment: mockResponse
            })
          }
        })
      ).map(({ adapter: { pushMessage, reactions$ } }) => {
        reactions$.subscribe({
          next: testReaction
        });
        pushMessage("");
      });
    });

    it("should fail gracefully and report the error on input", function(done) {
      const testReaction = reaction => {
        expect(reaction.type).to.eq("error");
        done();
      };
      botLoop(
        buildConfig({
          providers: {
            nlp: () => Promise.reject(new Error("mock error"))
          }
        })
      ).map(({ adapter: { pushMessage, reactions$ } }) => {
        reactions$.subscribe({
          next: testReaction
        });
        pushMessage("");
      });
    });

    it("should fail gracefully and report the error on events");
  });
};
