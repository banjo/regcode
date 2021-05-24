import { RegCode } from "./RegCode";

const statement = process.argv[2];
if (statement) console.log(new RegCode().convert(statement));

export { RegCode };

const regexConvert = new RegCode();
const regexCode = "startsWith(a[or]b[or]c)[or]startsWith([number])";
const result = regexConvert.convert(regexCode);
console.log(result);
