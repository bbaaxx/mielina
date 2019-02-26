const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const nlpProviderWrapper = require("../src/nlpProviderWrapper");
const getCtx = require("./helpers/ctxFromStr");

module.exports = function() {
  describe("nlpProviderWrapper function", function() {
    it("should be a function", function() {
      expect(nlpProviderWrapper).to.be.a("function");
    });
  });

  describe("nlpBasedResponse functionality", function() {
    it("should not do anything if context is resolved", function(done) {
      const ctx = getCtx("lorem ipsum").set("resolved", true);
      nlpProviderWrapper({})(ctx).then(function(newCtx) {
        expect(newCtx).to.eq(ctx);
        expect(newCtx.get("nlp")).to.not.exist;
        done();
      });
    });
  });
};
