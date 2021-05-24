import { getMethodParameter } from "../services/methodService";

interface IMethods {
    exact: Function;
    regex: Function;
    oneOf: Function;
    notOneOf: Function;
    [method: string]: Function;
}

const Methods: IMethods = {
    exact: (parameter: string, hasQuantifier = false): string => {
        return hasQuantifier ? `(${parameter})` : parameter;
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
};

export { Methods };
