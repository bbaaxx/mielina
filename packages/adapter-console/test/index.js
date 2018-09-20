const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

describe("Mielina Console Adapter", function() {
  it("should test something", function() {
    expect(true).to.eq(true);
  });
});
