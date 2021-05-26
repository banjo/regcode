import { RegexDefinitions } from "../helpers/regexDefinitions";
import { RegexHelpers } from "../helpers/regexHelpers";
import { handleMethod } from "./methodService";
import { getValueFromDefinition, isValue } from "./valueService";

function getDefinition(part: string) {
    const isValue = part.startsWith("[");
    const endsWithQualifier = part.endsWith("}");

    // handle value
    if (isValue && endsWithQualifier) {
        return part.match(RegexHelpers.beforeSquiglyBrackets)![0];
    } else if (isValue) {
        return part;
    }

    // handle method
    let method: string;
    if (endsWithQualifier) {
        let splitArray = part.split("{");
        splitArray.pop(); // remove quantifier
        method = splitArray.join("{");
    } else {
        method = part;
    }

    return method;
}

function handleDefinition(
    definition: string,
    hasQuantifier: boolean
): string | null {
    if (isValue(definition)) {
        const value = getValueFromDefinition(definition);

        if (value === null) {
            console.error("no value for definition " + definition);
            return null;
        }

        return RegexDefinitions[value!.toLowerCase()];
    }

    return handleMethod(definition, hasQuantifier);
}

export { handleDefinition, getDefinition };
