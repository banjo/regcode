import { modelQuantifier, Quantifiers } from "../helpers/quantifiers";

function getQuantifier(part: string) {
    const endsWithQualifier = part.endsWith("}");

    if (!endsWithQualifier) return null;

    let quantifier = part.split("{").pop()!.slice(0, -1);

    return quantifier;
}

function appendQuantifier(quantifier: string | null): string {
    let result = "";
    if (quantifier) {
        if (quantifier.includes("-")) {
            let quantifiers = quantifier.split("-");

            quantifiers.forEach((q) => {
                const customQuantifier = Quantifiers[q];

                if (customQuantifier) {
                    result += customQuantifier;
                } else {
                    console.error("Could not load quantifier " + q);
                }
            });

            return result;
        }

        const customQuantifier = Quantifiers[quantifier];

        if (customQuantifier) {
            result += customQuantifier;
        } else {
            result += modelQuantifier(quantifier);
        }
    }

    return result;
}

export { getQuantifier, appendQuantifier };
