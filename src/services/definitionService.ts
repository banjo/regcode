import { RegexDefinitions } from "../helpers/regexDefinitions";
import { RegexHelpers } from "../helpers/regexHelpers";
import { handleMethod } from "./methodService";
import { getValueFromDefinition } from "./valueService";

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

function handleDefinition(definition: string) {
    const value = getValueFromDefinition(definition);

    if (value) {
        // @ts-ignore: currently any type on return
        return RegexDefinitions[value.toLowerCase()];
    }

    return handleMethod(definition);
}

export { handleDefinition, getDefinition };
