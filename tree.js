const { numericPrimitive, binaryExpression } = require("./models");
const { isSubNodeOrNumber, isSubNode } = require("./validation");

/**
 * Orchestration function to build expressions.
 *
 * The tree currently supports either
 * primitive numbers or binary expressions
 *
 * tree(42) -> numeric primitive - string representation: "42"
 * tree(23, 19) -> implicit binary expression - string representation: "(23 + 19)"
 * tree("+", 23, 19) -> binary expression - string representation: "(23 + 19)"
 * 
 * Trees can be nested
 * tree(tree(42)) -> numeric primitive - string representation: "42"
 * 
 * interface Node {
 *   result: () => number
 *   toString: () => string
 * }
 *
 * 
 * tree() should be seen as a controller or convenience function
 * where the are requirements for a finer grain developers can 
 * build expression graphs from models directly:
 * binaryExpression({
 *   leftHandSide: binaryExpression({ 
 *      leftHandSide: primitiveNumber({ value: 5 }), 
 *      rightHandSide: primitiveNumber({ value: 10 }),
 *      operation: '*'
 *    }),
 *    rightHandSide: primitiveNumber({ value: 12 }),
 *    operation: '+'
 * }) // -> 62
 * @param {string|number|Node} first
 * @param {number|Node} second
 * @param {number|Node} third
 * @returns
 */
const tree = (first, second, third) => {
  if (
    typeof first !== undefined &&
    second === undefined &&
    third === undefined
  ) {
    if (isSubNode(first)) {
        return first
    }

    return numericPrimitive({ value: first });
  }

  let operation, leftHandSide, rightHandSide;

  if (isSubNodeOrNumber(first)) {
    operation = "+";

    leftHandSide = isSubNode(first) ? first : tree(first);
    rightHandSide = isSubNode(second) ? second : tree(second);
  } else {
    operation = first;

    leftHandSide = isSubNode(second) ? second : tree(second);
    rightHandSide = isSubNode(third) ? third : tree(third);
  }

  return binaryExpression({ leftHandSide, rightHandSide, operation });
};

module.exports = tree;
