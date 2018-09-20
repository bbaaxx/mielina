const chai = require("chai");
const { publishMessage, platformMessage } = require("../src/actions");

const { expect } = chai;

describe("Mielina Console Adapter Actions", function() {
  describe("platformMessage:", function() {
    it("Should transform a raw text message into a platform message object", function() {
      const textEntry = "Test platformMessage";
      const pMessage = platformMessage(textEntry);
      expect(pMessage).to.have.property("type", "platform-message");
      expect(pMessage).to.have.property("message", textEntry);
    });
  });

  describe("publishMessage:", function() {
    it("Should transform a platform message into a bot message object", function() {
      const textEntry = "Test message";
      const publishedMessage = publishMessage({ message: textEntry });
      expect(publishedMessage).to.have.property("type", "incoming-message");

      const { message } = publishedMessage;
      expect(message).to.have.property("msgId");
      expect(message).to.have.property("content", textEntry);
      expect(message).to.have.property("authorId", "CONSOLE");
      expect(message).to.have.property("authorName", "OP Root user");
      expect(message).to.have.property("channel", "CONSOLE");
    });
    it("Should generate unique Id's", function() {
      const aMessage = publishMessage({ message: "test" }).message;
      const bMessage = publishMessage({ message: "test" }).message;
      expect(aMessage.msgId).to.not.be.eq(bMessage.msgId);
    });
  });
});
