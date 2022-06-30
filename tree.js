const tree = (first) => {
    if (typeof first !== 'number') {
        throw new Error('Value should be a number')
    }

    return { result: () => first, toString: () => first.toString() }
}

module.exports = tree;