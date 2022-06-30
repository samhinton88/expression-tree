const tree = (first) => {
    return { result: () => first, toString: () => first.toString() }
}

module.exports = tree;