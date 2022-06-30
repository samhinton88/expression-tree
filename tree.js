const operationMap = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    'x': (a, b) => a * b
}

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

    return { result: () => first, toString: () => first.toString() };
  }

  const operation = first;
  const leftHandSide = typeof second === 'object' ? second : tree(second) ;
  const rightHandSide = typeof third === 'object' ? third : tree(third);

  return {
    result: () => operationMap[operation](leftHandSide.result(), rightHandSide.result()),
    toString: () => `(${leftHandSide} ${operation} ${rightHandSide})`,
  };
};

module.exports = tree;
