import { logger } from "../config/logger";
import { modelQuantifier, Quantifiers } from "../helpers/quantifiers";
import { RegexHelpers } from "../helpers/regexHelpers";

function getQuantifier(part: string) {
    const endsWithQualifier = part.endsWith("}");

    if (!endsWithQualifier) return null;

    const quantifier = part.split("{").pop()!.slice(0, -1);

    return quantifier;
}

function getInlineQuantifiers(part: string) {
    const matches = part.match(RegexHelpers.quantifier);
    if (!matches) return null;

    const quantifiers: string[] = [];
    matches.forEach(m => {
        const quantifier = m.slice(0, -1).slice(1);
        quantifiers.push(quantifier);
    });

    return quantifiers;
}

function handleQuantifier(quantifier: string | null): string | null {
    let result = "";
    if (quantifier) {
        if (quantifier.includes("-")) {
            const quantifiers = quantifier.split("-");

            for (const q of quantifiers) {
                const customQuantifier = Quantifiers[q];

                if (customQuantifier) {
                    result += customQuantifier;
                } else {
                    logger.error("Could not load quantifier " + q);
                    return null;
                }
            }

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

export { getQuantifier, handleQuantifier, getInlineQuantifiers };
