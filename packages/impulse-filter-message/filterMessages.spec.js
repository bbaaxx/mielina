const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const filterMessages = require("../src/filterMessages");
const getCtx = require("./helpers/ctxFromStr");

module.exports = function() {
  describe("filterMessages function", function() {
    it("should be a function", function() {
      expect(filterMessages).to.be.a("function");
    });
  });

  describe("filterMessages functionality", function() {
    it("should set the message type to ignore if bot regexp is not matched", function() {
      const ctx = getCtx("lorem ipsum");
      expect(filterMessages(ctx).type).to.eq("ignore");
    });

    it("should set the message type to process-message if bot regexp is matched", function() {
      const ctx = getCtx("robot");
      expect(filterMessages(ctx).type).to.eq("process");
    });

    it("should set the message type to ignore if no conversation is active", function() {
      const ctx = getCtx("lorem ipsum");
      expect(filterMessages(ctx).type).to.eq("ignore");
    });

    it("type should be undefined if context is resolved", function() {
      const ctx = getCtx();
      ctx.resolve();
      expect(filterMessages(ctx).type).to.not.exist;
    });
  });
};
