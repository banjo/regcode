import { RegCode } from "./RegCode";

const statement = process.argv[2];
if (statement) console.log(new RegCode().convert(statement));

export { RegCode };

const regexConvert = new RegCode();
const regexCode = "[letter][or][number]{3}[or{3}]";
const result = regexConvert.convert(regexCode);
console.log(result);
