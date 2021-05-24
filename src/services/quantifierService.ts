import { Quantifiers } from "../helpers/quantifiers";

function getQuantifier(part: string) {
    const endsWithQualifier = part.endsWith("}");

    if (!endsWithQualifier) return null;

    let quantifier = part.split("{").pop()!.slice(0, -1);

    return quantifier;
}

function appendQuantifier(quantifier: string | null): string {
    let result = "";
    if (quantifier) {
        // @ts-ignore: currently any type on return
        const customQuantifier = Quantifiers[quantifier];

        if (customQuantifier) {
            result += customQuantifier;
        } else {
            result += Quantifiers.model(quantifier);
        }
    }

    return result;
}

export { getQuantifier, appendQuantifier };
