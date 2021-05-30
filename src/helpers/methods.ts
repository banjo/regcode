interface IMethods {
    normal: (parameter: string) => string;
    exact: (parameter: string) => string;
    regex: (parameter: string) => string;
    oneOf: (parameter: string) => string;
    notOneOf: (parameter: string) => string;
    // lastOccurrenceOfWord: (parameter: string) => string;
    // matchUpTo: (parameter: string) => string;
    word: (parameter: string) => string;
    hasAfter: (parameter: string) => string;
    hasBefore: (parameter: string) => string;
    notAfter: (parameter: string) => string;
    notBefore: (parameter: string) => string;
    [method: string]: (parameter: string) => string;
}

const Methods: IMethods = {
    normal: (parameter: string): string => {
        return parameter;
    },
    exact: (parameter: string): string => {
        return `(?:${parameter})`;
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
    // lastOccurrenceOfWord: (parameter: string): string => {
    //     return String.raw`(\b${parameter}\b)(?!.*\b\1\b)`;
    // },
    word: (parameter: string): string => {
        return String.raw`\b${parameter}\b`;
    },
    // matchUpTo: (parameter: string): string => {
    //     return String.raw`^(.*?)(${parameter})`;
    // },
    hasAfter: (parameter: string): string => {
        return String.raw`(?=${parameter})`;
    },
    hasBefore: (parameter: string): string => {
        return String.raw`(?<=${parameter})`;
    },
    notAfter: (parameter: string): string => {
        return String.raw`(?!${parameter})`;
    },
    notBefore: (parameter: string): string => {
        return String.raw`(?<!${parameter})`;
    },
};

export { Methods };
