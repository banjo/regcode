import { RegCode } from "./RegCode";

const statement = process.argv[2];
if (statement) console.log(new RegCode().convert(statement));

export { RegCode };

const regexConvert = new RegCode();
// TODO: fix endsWith bug, or symbol gets escaped
const regexCode =
    "startsWith([number][or]josse)[or][number] endsWith(erik[or]kalle)";
const result = regexConvert.convert(regexCode);
console.log(result);
