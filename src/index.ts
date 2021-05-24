import { RegCode } from "./RegCode";

export {}; // fix bug with result variable

const regCode = new RegCode();
let result = regCode.convert("[number]");
console.log(result);
