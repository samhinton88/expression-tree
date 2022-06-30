const { NUMERIC_PRIMITIVE, EXPRESSION_TYPE } = require('../constants')

const numericPrimitive = ({ value }) => {

  if (typeof value !== "number") {
    throw new Error("Value should be a number");
  }

  return {
    result: () => value,
    toString: () => value.toString(),
    [EXPRESSION_TYPE]: NUMERIC_PRIMITIVE,
  };
};

module.exports = numericPrimitive;