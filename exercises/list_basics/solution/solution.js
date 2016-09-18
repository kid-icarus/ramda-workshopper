exports.double = xs => xs.map(x => x * 2)

exports.isEven = xs => xs.filter(x => x % 2 === 0)

exports.sum = xs => xs.reduce((p, k) => p + k)

exports.hasCat = xs => xs.some(x => x === 'cat')
