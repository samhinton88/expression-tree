const operationMap = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    'x': (a, b) => a * b
}

const EXPRESSION_TYPE = Symbol("EXPRESSION_TYPE");

const isObject = (candidate) => typeof candidate === 'object' && candidate !== null;

const isSubNode = (candidate) => isObject(candidate) && (EXPRESSION_TYPE in candidate)

const BINARY_EXPRESSION = 'BINARY_EXPRESSION';
const NUMERIC_PRIMITIVE = 'NUMERIC_PRIMITIVE';

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
    if (typeof first !== "number") {
      throw new Error("Value should be a number");
    }

    return { result: () => first, toString: () => first.toString(), [EXPRESSION_TYPE]: NUMERIC_PRIMITIVE };
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
