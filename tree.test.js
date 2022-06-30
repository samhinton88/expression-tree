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

    it("should play nicely when given a nested node", () => {
      expect(tree(tree(2)).result()).toBe(2);
    });
  });

  describe("binary expression", () => {
    it("should parse binary expressions with addition", () => {
      expect(tree("+", 2, 3).result()).toBe(5);
    });

    it("should parse binary expressions with subtraction", () => {
      expect(tree("-", 3, 2).result()).toBe(1);
    });

    it("should parse binary expressions with multiplication", () => {
      expect(tree("x", 3, 2).result()).toBe(6);
    });

    it("should parse binary expressions with division", () => {
      expect(tree("/", 4, 2).result()).toBe(2);
    });

    it("should represent binary expressions with parenthesis and the correct operator", () => {
      expect(tree("+", 2, 3).toString()).toBe("(2 + 3)");
      expect(tree("-", 2, 3).toString()).toBe("(2 - 3)");
      expect(tree("x", 2, 3).toString()).toBe("(2 x 3)");
      expect(tree("/", 2, 3).toString()).toBe("(2 / 3)");
    });
  });

  describe("implicit binary expression", () => {
    it("should interpret usage with two numeric arguments as an addition", () => {
      expect(tree(2, 3).result()).toBe(5);
    });
  });

  describe("nesting", () => {
    it("should allow for nested trees", () => {
      expect(tree("+", 2, tree("+", 2, 3)).result()).toBe(7);
      
      expect(tree("+", 2, tree("+", 2, 3)).toString()).toBe("(2 + (2 + 3))");
      const threeTimesEight = tree("x", 3, 8);
      expect(
        tree('-', threeTimesEight, tree('x', threeTimesEight, threeTimesEight, tree(threeTimesEight))).result()
      ).toBe(-552);
      expect(
        tree('-', threeTimesEight, tree('x', threeTimesEight, threeTimesEight, tree(threeTimesEight))).toString()
      ).toBe("((3 x 8) - ((3 x 8) x (3 x 8)))");
    });

    it("should throw if passed objects which are not valid Nodes", () => {
      expect(() => tree("+", 2, { some: "garbage" })).toThrow();
      expect(() => tree("+", { some: "garbage" }, 2)).toThrow();
      expect(() =>
        tree("+", { some: "garbage" }, { some: "garbage" })
      ).toThrow();
    });

    it("should interpret usage with two nested arguments as an addition", () => {
        expect(tree(tree(2), 3).result()).toBe(5);
        expect(tree(2, tree(3)).result()).toBe(5);
        expect(tree(tree(2), tree(3)).result()).toBe(5);
  
        expect(tree(tree(2), 3).toString()).toBe("(2 + 3)");
        expect(tree(2, tree(3)).toString()).toBe("(2 + 3)");
        expect(tree(tree(2), tree(3)).toString()).toBe("(2 + 3)");
      });
  });
});
