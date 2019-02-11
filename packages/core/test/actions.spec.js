const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { basicTextReply, randomBasicFromArray } = require("../src/actions");

module.exports = function() {
  describe("basicTextReply function", function() {
    const mockMessage = "mock message";
    it("should be a function", function() {
      expect(basicTextReply).to.be.a("function");
    });
    it("should take a string and return a reply object", function() {
      const { type, message } = basicTextReply(mockMessage);
      expect(type).to.be.a("String");
      expect(message.contentType).to.exist;
      expect(message.content).to.exist;
    });
    it("should set reply type to: message-reply if a string is provided", function() {
      const { type } = basicTextReply(mockMessage);
      expect(type).to.eq("message-reply");
    });
    it("should set reply type to: ignore if no/empty string is provided", function() {
      const c1 = basicTextReply();
      const c2 = basicTextReply("");
      expect(c1.type).to.eq("ignore");
      expect(c2.type).to.eq("ignore");
    });
    it("should set the message reply contentType to: text", function() {
      const { message } = basicTextReply(mockMessage);
      expect(message.contentType).to.be.eq("text");
    });
  });
  describe("randomBasicFromArray function", function() {
    const mockResponses = [
      "mock response 1",
      "mock response 2",
      "mock response 3"
    ];
    it("should be a function", function() {
      expect(randomBasicFromArray).to.be.a("function");
    });
    it("should take an array and return a reply object", function() {
      const { type, message } = randomBasicFromArray(mockResponses);
      expect(type).to.be.a("String");
      expect(message.contentType).to.exist;
      expect(message.content).to.exist;
    });
    it("should set message content to one of the items in the provided array", function() {
      const { message } = randomBasicFromArray(mockResponses);
      expect(message.content).to.be.oneOf(mockResponses);
    });
  });
};
