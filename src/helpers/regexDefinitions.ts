interface IRegexDefinitions {
    number: string;
    character: string;
    notNumber: string;
    notCharacter: string;
    whitespace: string;
    notWhitespace: string;
    any: string;
    or: string;
    special: string;
    tab: string;
    // linebreak: string;
    newline: string;
    // return: string;
    start: string;
    end: string;
    [key: string]: string;
}

export const RegexDefinitions: IRegexDefinitions = {
    number: String.raw`\d`,
    character: String.raw`[A-Za-z\u00C0-\u017F]`,
    notNumber: String.raw`\D`,
    notCharacter: String.raw`[^A-Za-z\u00C0-\u017F]`,
    whitespace: String.raw`\s`,
    notWhitespace: String.raw`\S`,
    any: String.raw`.`,
    or: "|",
    special: String.raw`[!#$%&'*+-/=?^_\`{|}~]`,
    tab: String.raw`\t`,
    // linebreak: String.raw`\r\n`,
    newline: String.raw`(\r\n|\r|\n)`,
    // return: String.raw`\r`,
    start: String.raw`^`,
    end: String.raw`$`,
};
