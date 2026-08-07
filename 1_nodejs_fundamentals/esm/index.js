import { add, subtract, multiply } from "./utils/math.js";
import capitalize from "./utils/string.js";

console.log(add(2, 3));
console.log(subtract(2, 3));
console.log(multiply(2, 3));
console.log(capitalize("hello"));

// в ESM отсутствуют __filename, __dirname, import.meta.url можно назвать заменой __filename, то есть она указывает путь к текущему файлу, также есть import.meta.filename, import.meta.dirname
console.log(import.meta.url);
