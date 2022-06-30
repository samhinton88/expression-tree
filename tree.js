const { numericPrimitive, binaryExpression } = require('./models');


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

  if (typeof first === 'number') {
    operation = '+';
    
    leftHandSide = typeof first === 'object' ? first : tree(first) ;
    rightHandSide = typeof second === 'object' ? second : tree(second);
  } else {
    operation = first;
    
    leftHandSide = typeof second === 'object' ? second : tree(second) ;
    rightHandSide = typeof third === 'object' ? third : tree(third);
  }


  return binaryExpression({ leftHandSide, rightHandSide, operation })
};

module.exports = tree;
