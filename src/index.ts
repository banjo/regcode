import { RegCode } from "./RegCode";

// example
const regCode = new RegCode();
const code =
    "hasBefore(https://) normal(www.) [character]{any} normal(.com)[or]normal(.net)";
const regex = regCode.convert(code);
console.log(regex);

const stringToMatch = "https://www.regcodejs.com";
const match = regCode.match(code, stringToMatch);
console.log(match);

export { RegCode };
