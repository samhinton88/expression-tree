const { numericPrimitive, binaryExpression } = require("./models");
const { isSubNodeOrNumber, isSubNode } = require("./validation");

/**
 * tree(42) -> numeric primitive - string representation: "42"
 * @param {number} first
 * @returns
 */
const tree = (first, second, third) => {
  if (
    typeof first !== undefined &&
    second === undefined &&
    third === undefined
  ) {
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
