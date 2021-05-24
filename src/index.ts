import { RegCode } from "./RegCode";

const statement = process.argv[2];
if (statement) console.log(new RegCode().convert(statement));

export { RegCode };

const regexConvert = new RegCode();
const regexCode = "regex(ab)c) exact(ab)c)";
const result = regexConvert.convert(regexCode);
console.log(result);
