const tree = require("./tree");

describe("tree", () => {
  describe("single argument usage", () => {
    it("should interpret usage with a single argument as just the value", () => {
      expect(tree(2).result()).toBe(2);
    });

    it("should represent usage with a single argument as the value simply", () => {
      expect(tree(2).toString()).toBe("2");
    });

    it("should throw if given a single argument that is a numeric string", () => {
      expect(() => tree("2").toString()).toThrow();
    });
  });

  describe("binary expression", () => {
    it("should parse binary expressions with addition", () => {
        expect(tree("+", 2, 3).result()).toBe(5);
    })

    it("should parse binary expressions with subtraction", () => {
        expect(tree("-", 3, 2).result()).toBe(1);
    })
  })
});
