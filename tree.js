const { numericPrimitive, binaryExpression } = require('./models');
const { EXPRESSION_TYPE } = require('./constants');



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

  const operation = first;

  const leftHandSide = typeof second === 'object' ? second : tree(second) ;
  const rightHandSide = typeof third === 'object' ? third : tree(third);

  return binaryExpression({ leftHandSide, rightHandSide, operation })
};

module.exports = tree;
