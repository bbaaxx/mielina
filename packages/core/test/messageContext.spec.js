const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const createContext = require("../src/messageContext");
const getTestMsg = require("./helpers/makeMessageObj");

module.exports = function() {
  describe("createContext function", function() {
    it("should return a function when called", function() {
      expect(createContext).to.be.a("function");
    });
  });

  describe("context creator and context accessor", function() {
    let ctx;
    beforeEach(() => {
      ctx = createContext(getTestMsg());
    });
    afterEach(() => {
      ctx = void 0;
    });
    it("context creator should return a context object", function() {
      expect(createContext(getTestMsg())).to.be.an("object");
    });
    it("should provide getter and setter methods", function() {
      expect(ctx.set).to.be.a("function");
      expect(ctx.get).to.be.a("function");
    });
    it("should provide a resolve and resolved methods", function() {
      expect(ctx.resolve).to.be.a("function");
      expect(ctx.resolved).to.be.a("function");
    });
    it("should provide sugar getter methods", function() {
      expect(ctx.getMessage).to.be.a("function");
      expect(ctx.getMessageContent).to.be.a("function");
      expect(ctx.getAuthorId).to.be.a("function");
      // expect(ctx.getAuthorName).to.be.a("function");
      expect(ctx.getReaction).to.be.a("function");
    });
  });

  describe("context object", function() {
    const mockMessage = "mock message";
    it("should be able to get properties from the context", function() {
      const testMsg = getTestMsg(mockMessage);
      const ctx = createContext(testMsg);
      expect(ctx.get("message")).to.eq(testMsg.message);
      expect(ctx.get("resolved")).to.eq(false);
    });
    it("should be able to indirectly set properties", function() {
      const ctx = createContext(getTestMsg());
      expect(ctx.get("resolved")).to.eq(false);
      ctx.set("resolved", true);
      expect(ctx.get("resolved")).to.eq(true);
    });
    it("should timestamp itself", function() {
      const timeBefore = new Date();
      const ctx = createContext(getTestMsg());
      expect(ctx.get("startedAt")).to.be.within(timeBefore, new Date());
    });
    it("should have a default not resolved and unreacted state", function() {
      const ctx = createContext(getTestMsg());
      expect(ctx.get("resolved")).to.eq(false);
      expect(ctx.get("reaction")).to.eq(undefined);
    });
    it("should have a default not resolved and unreacted state", function() {
      const ctx = createContext(getTestMsg());
      expect(ctx.get("resolved")).to.eq(false);
      expect(ctx.get("reaction")).to.eq(undefined);
    });
  });
};
