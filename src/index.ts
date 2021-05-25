import { RegCode } from "./RegCode";

const statement = process.argv[2];
if (statement) console.log(new RegCode().convert(statement));

export { RegCode };

const regexConvert = new RegCode();
const regexCode = "[letter][or]exact([number]){3}exact(abc){5}[letter]";
const result = regexConvert.convert(regexCode);
console.log(result);
