export const RegexDefinitions = {
    number: String.raw`\d`,
    letter: String.raw`(\p{L}\p{M}*+)`,
    whitespace: String.raw`\s`,
    any: String.raw`.`,
    or: "|",
};