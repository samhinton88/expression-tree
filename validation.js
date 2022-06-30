const { EXPRESSION_TYPE } = require("./constants");

const isObject = (candidate) =>
  typeof candidate === "object" && candidate !== null;

const isSubNode = (candidate) =>
  isObject(candidate) && EXPRESSION_TYPE in candidate;

const isSubNodeOrNumber = (candidate) => 
  isSubNode(candidate) || typeof candidate === 'number';

module.exports = { isObject, isSubNode, isSubNodeOrNumber };
