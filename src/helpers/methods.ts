interface IMethods {
    normal: Function;
    exact: Function;
    regex: Function;
    oneOf: Function;
    notOneOf: Function;
    lastOccurrenceOfWord: Function;
    matchUpTo: Function;
    word: Function;
    hasAfter: Function;
    hasBefore: Function;
    notAfter: Function;
    notBefore: Function;

    // endsWith: Function;
    // startsWith: Function;
    [method: string]: Function;
}

const Methods: IMethods = {
    normal: (parameter: string): string => {
        return parameter;
    },
    exact: (parameter: string): string => {
        return `(${parameter})`;
    },
    regex: (parameter: string): string => {
        return parameter;
    },
    oneOf: (parameter: string): string => {
        return `[${parameter}]`;
    },
    notOneOf: (parameter: string): string => {
        return `[^${parameter}]`;
    },
    // endsWith: (parameter: string): string => {
    //     return `(${parameter})$`;
    // },
    // startsWith: (parameter: string): string => {
    //     return `^(${parameter})`;
    // },
    lastOccurrenceOfWord: (parameter: string): string => {
        return String.raw`(\b${parameter}\b)(?!.*\b\1\b)`;
    },
    word: (parameter: string): string => {
        return String.raw`\b${parameter}\b`;
    },
    matchUpTo: (parameter: string): string => {
        return String.raw`^(.*?)(${parameter})`;
    },
    hasAfter: (parameter: string): string => {
        return String.raw`(?=${parameter})`;
    },
    hasBefore: (parameter: string): string => {
        return String.raw`(?<=${parameter})`;
    },
    notAfter: (parameter: string): string => {
        return String.raw`(?!${parameter}) `;
    },
    notBefore: (parameter: string): string => {
        return String.raw`(?<!${parameter})`;
    },
};

export { Methods };
