interface IRegexDefinitions {
    number: string;
    letter: string;
    whitespace: string;
    any: string;
    or: string;
    special: string;
    tab: string;
    linebreak: string;
    return: string;
    start: string;
    end: string;
    [key: string]: string;
}

export const RegexDefinitions: IRegexDefinitions = {
    number: String.raw`\d`,
    wordCharacter: String.raw`\w`,
    letter: String.raw`[a-zA-ZäöüßÄÖÜ]`,
    whitespace: String.raw`\s`,
    any: String.raw`.`,
    or: "|",
    special: String.raw`!#$%&'*+-/=?^_\`{|}~`,
    tab: String.raw`\t`,
    linebreak: String.raw`\r\n`,
    return: String.raw`\r`,
    start: String.raw`^`,
    end: String.raw`$`,
};
