const { isSubNode } = require('../validation')
const { EXPRESSION_TYPE, BINARY_EXPRESSION } = require('../constants')

const operationMap = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    'x': (a, b) => a * b
}

const binaryExpression = ({ leftHandSide, rightHandSide, operation }) => {
  if (!isSubNode(leftHandSide)) {
    throw new Error("Binary expressions only accept Nodes");
  }

  if (!isSubNode(rightHandSide)) {
    throw new Error("Binary expressions only accept Nodes");
  }

  return {
    result: () =>
      operationMap[operation](leftHandSide.result(), rightHandSide.result()),
    toString: () => `(${leftHandSide} ${operation} ${rightHandSide})`,
    [EXPRESSION_TYPE]: BINARY_EXPRESSION,
  };
};

module.exports = binaryExpression