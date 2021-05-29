import { RegCode } from "./RegCode";

// example
const regCode = new RegCode();
// const code =
//     "hasBefore(https://) normal(www.) [character]{any} normal(.com)[or]normal(.net)";
// const regex = regCode.convert(code);
// console.log(regex);

// const stringToMatch = "https://www.regcodejs.com";
// const match = regCode.match(code, stringToMatch);
// console.log(match);
const wordToMatch = "Phone: 123";
const codeWithoutFlag = `regex(\\p{L}){any}`;
const codeWithFlag = `normal(Phone: [number]{2,4}[or][number]{7})`;

let res1 = regCode.match(codeWithoutFlag, wordToMatch); // 2
let res2 = regCode.match(codeWithFlag, wordToMatch); // 25

console.log(res1, res2);

export { RegCode };
