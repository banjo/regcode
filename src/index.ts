import { RegCode } from "./RegCode";

const statement = process.argv[2];
if (statement) console.log(new RegCode().convert(statement));

export { RegCode };

// const regexConvert = new RegCode();
// const regexCode =
// "[number]{any}[or][number]{5}[or][number]{3} exact(user){4} [letter]{2} regex(\\d) oneOf(abc) notOneOf([whitespace][letter])";
// const regexCode = "[number]{4}[or]regex(\\d)[or{3}]";
// const regexCode = "exact(ab)c) regex(\\d.)";
// const result = regexConvert.convert(regexCode);
// console.log(result);
