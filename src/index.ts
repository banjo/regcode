import { RegCode } from "./RegCode";

const statement = process.argv[2];
if (statement) console.log(new RegCode().convert(statement));

export { RegCode };

const regexConvert = new RegCode();
const regexCode = "exact(ab)c){3} exact(abc)";
const result = regexConvert.convert(regexCode);
console.log(result);
