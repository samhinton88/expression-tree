const { numericPrimitive } = require('./models');
const { EXPRESSION_TYPE } = require('./constants');
const operationMap = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    'x': (a, b) => a * b
}



const isObject = (candidate) => typeof candidate === 'object' && candidate !== null;

const isSubNode = (candidate) => isObject(candidate) && (EXPRESSION_TYPE in candidate)

const BINARY_EXPRESSION = 'BINARY_EXPRESSION';


/**
 * tree(42) -> numeric primitive - string representation: "42"
 * @param {number} first
 * @returns
 */
const tree = (first, second, third) => {
  console.log({ first, second, third })
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

  if (!isSubNode(leftHandSide)) {
    throw new Error("Binary expressions only accept Nodes")
  }

  if (!isSubNode(rightHandSide)) {
    throw new Error("Binary expressions only accept Nodes")
  }

  return {
    result: () => operationMap[operation](leftHandSide.result(), rightHandSide.result()),
    toString: () => `(${leftHandSide} ${operation} ${rightHandSide})`,
    [EXPRESSION_TYPE]: BINARY_EXPRESSION
  };
};

module.exports = tree;
