const chai = require("chai");
const sinon = require("sinon");
const createHandler = require("../src/handlers");

const { expect } = chai;
const mockClient = "";

describe("Mielina Console Adapter Handlers", function() {
  let mockClient;
  let handler;
  let fakes;

  beforeEach(function() {
    mockClient = {
      prompt: sinon.fake()
    };
    handler = createHandler(mockClient);
    fakes = {
      prompt: mockClient.prompt,
      consoleLog: sinon.fake(),
      consoleWarn: sinon.fake(),
      consoleError: sinon.fake(),
      procStdoutClearLine: sinon.fake(),
      procStdoutCursorTo: sinon.fake()
    };
    sinon.replace(console, "log", fakes.consoleLog);
    sinon.replace(console, "warn", fakes.consoleWarn);
    sinon.replace(console, "error", fakes.consoleError);
    sinon.replace(process.stdout, "clearLine", fakes.procStdoutClearLine);
    sinon.replace(process.stdout, "cursorTo", fakes.procStdoutCursorTo);
  });
  afterEach(() => {
    handler = void 0;
    sinon.restore();
  });

  describe("Handle default action", function() {
    it("Should output an informative warn message", function() {
      const actionType = "test!@#";
      const { consoleWarn } = fakes;
      handler({ type: actionType });
      expect(consoleWarn.callCount).to.be.greaterThan(0);
      expect(consoleWarn.lastArg).to.include(actionType);
    });
  });
  describe("Handle ignore", function() {
    it("Should silently do nothing at all", function() {
      const actionType = "ignore";
      const { consoleWarn } = fakes;
      handler({ type: actionType });
      expect(consoleWarn.callCount).to.be.eq(0);
    });
  });
  describe("Handle error", function() {
    it("Should console out an error and a message", function() {
      const actionType = "error";
      const { consoleError, consoleLog } = fakes;
      handler({ type: actionType });
      expect(consoleError.callCount).to.be.eq(1);
      expect(consoleLog.callCount).to.be.eq(1);
    });
  });
  describe("Handle message-reply", function() {
    it("Should console out a reply", function() {
      const actionType = "message-reply";
      const testReply = "test reply";
      const { consoleLog, prompt } = fakes;
      handler({ type: actionType, message: { content: testReply } });
      expect(consoleLog.callCount).to.be.eq(1);
      expect(prompt.callCount).to.be.eq(1);
    });
  });
});
