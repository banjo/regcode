import { RegCode } from "./RegCode";

const statement = process.argv[2];
if (statement) console.log(new RegCode().convert(statement));

export { RegCode };

const regexConvert = new RegCode();
const regexCode = "normal(tjena)normal(3) normal(2)";
// const regexCode = "normal(hej)";
console.log(regexCode);
const result = regexConvert.convert(regexCode);
console.log(result);

// const hasMatch = regexConvert.hasMatch(regexCode, "33r3");
// console.log(hasMatch);

// const match = regexConvert.match(regexCode, "33r3");
// console.log(match);
