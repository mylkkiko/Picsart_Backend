const math = require('./utils/math');

console.log(math.add(5, 3));
console.log(math.subtract(5, 3));
console.log(math.multiply(5, 3));

const string = require('./utils/string');

console.log(string("hello"));
/* Объект, в котором данные закэшированных модулей math.js, string.js */
console.log(require.cache);