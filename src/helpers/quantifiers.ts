interface IQuantifiers {
    oneOrMore: string;
    any: string;
    optional: string;
    shortest: string;
    short: string;
    shorter: string;
    [key: string]: string;
}

const Quantifiers: IQuantifiers = {
    oneOrMore: `+`,
    any: `*`,
    optional: `?`,
    shortest: "?",
    shorter: "?",
    short: "?",
};

const modelQuantifier = (quantifier: string) => `{${quantifier}}`;

export { Quantifiers, modelQuantifier };
