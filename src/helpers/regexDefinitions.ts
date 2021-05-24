interface IRegexDefinitions {
    number: string;
    letter: string;
    whitespace: string;
    any: string;
    or: string;
    [key: string]: string;
}

export const RegexDefinitions: IRegexDefinitions = {
    number: String.raw`\d`,
    letter: String.raw`(\p{L}\p{M}*+)`,
    whitespace: String.raw`\s`,
    any: String.raw`.`,
    or: "|",
};
