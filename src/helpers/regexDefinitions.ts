interface IRegexDefinitions {
    number: string;
    letter: string;
    whitespace: string;
    any: string;
    or: string;
    special: string;
    [key: string]: string;
}

export const RegexDefinitions: IRegexDefinitions = {
    number: String.raw`\d`,
    letter: String.raw`[a-zA-ZäöüßÄÖÜ]`,
    whitespace: String.raw`\s`,
    any: String.raw`.`,
    or: "|",
    special: String.raw`!#$%&'*+-/=?^_\`{|}~`,
};
