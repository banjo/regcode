interface IMethods {
    normal: Function;
    exact: Function;
    regex: Function;
    oneOf: Function;
    notOneOf: Function;
    endsWith: Function;
    startsWith: Function;
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
    endsWith: (parameter: string): string => {
        return `(${parameter})$`;
    },
    startsWith: (parameter: string): string => {
        return `^(${parameter})`;
    },
};

export { Methods };
