const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const nlpBasedResponse = require("../src/nlpBasedResponse");
const getCtx = require("./helpers/ctxFromStr");

module.exports = function() {
  describe("nlpBasedResponse function", function() {
    it("should be a function", function() {
      expect(nlpBasedResponse).to.be.a("function");
    });
  });

  describe("nlpBasedResponse functionality", function() {
    it("should not modify context if an NLP response is not provided", function(done) {
      const ctx = getCtx("lorem ipsum");
      nlpBasedResponse(ctx).then(function(newCtx) {
        expect(newCtx).to.eq(ctx);
        done();
      });
    });
    it("should not modify context if an NLP response is not fulfilled", function(done) {
      const ctx = getCtx("lorem ipsum");
      nlpBasedResponse(ctx).then(function(newCtx) {
        expect(newCtx).to.eq(ctx);
        done();
      });
    });
    it("should resolve the context if an NLP provider fulfills the request", function(done) {
      const ctx = getCtx("lorem ipsum");
      ctx.set("nlp", { nlpFulfilled: true });
      expect(ctx.resolved()).to.eq(false);
      nlpBasedResponse(ctx).then(function(newCtx) {
        expect(newCtx.resolved()).to.eq(true);
        done();
      });
    });
    it("should not do anything if context is resolved", function(done) {
      const ctx = getCtx("lorem ipsum");
      ctx.set("resolved", true);
      nlpBasedResponse(ctx).then(function(newCtx) {
        expect(newCtx).to.eq(ctx);
        expect(newCtx.get("reaction")).to.not.exist;
        done();
      });
    });
  });
};
