interface IFlags {
    matchAll: string;
    ignoreCase: string;
    dotAll: string;
    multiline: string;
    sticky: string;
    unicode: string;
    [key: string]: string;
}

export const Flags: IFlags = {
    matchAll: "g",
    ignoreCase: "i",
    dotAll: "s",
    multiline: "m",
    sticky: "y",
    unicode: "u",
};
