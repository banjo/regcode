interface IQuantifiers {
    oneOrMore: string;
    any: string;
    optional: string;
    [key: string]: string;
}

const Quantifiers: IQuantifiers = {
    oneOrMore: `+`,
    any: `*`,
    optional: `?`,
};

const modelQuantifier = (quantifier: string) => `{${quantifier}}`;

export { Quantifiers, modelQuantifier };
