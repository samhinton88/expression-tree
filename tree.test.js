const tree = require("./tree");

describe("tree", () => {
  it("should interpret usage with a single argument as just the value", () => {
    expect(tree(2).result()).toBe(2);
  });
});
