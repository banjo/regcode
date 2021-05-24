import { RegCode } from "./RegCode";

export {}; // fix bug with result variable

const regCode = new RegCode();
let result = regCode.convert("[number][or][letter][or{4}] exact(he()lo)");
console.log(result);

// const regexConvert = new RegCode();
// const regexCode =
// "[number]{any}[or][number]{5}[or][number]{3} exact(user){4} [letter]{2} regex(\\d) oneOf(abc) notOneOf([whitespace][letter])";
// const regexCode = "[number]{4}[or]regex(\\d)[or{3}]";
// const regexCode = "exact(ab)c) regex(\\d.)";
// const result = regexConvert.convert(regexCode);
// console.log(result);
