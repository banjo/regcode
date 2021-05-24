import { Methods } from "../helpers/methods";
import { RegexHelpers } from "../helpers/regexHelpers";
import { convertDefinitionToValues } from "./valueService";
import { addEscapeToEscapers } from "./statementService";

function handleMethod(definition: string) {
    let result = "";

    definition = convertDefinitionToValues(definition);

    // handle regex first as it is the only one that does not add escape to characters
    if (isMethod(definition, Methods.regex)) {
        const match = getMethodParameter(definition);
        result += match;
        return;
    }

    definition = addEscapeToEscapers(definition);

    if (isMethod(definition, Methods.exact)) {
        const match = getMethodParameter(definition);

        result += `(${match})`;
    } else if (isMethod(definition, Methods.oneOf)) {
        const match = getMethodParameter(definition);

        if (match.length === 0) {
            return;
        }

        result += `[${match}]`;
    } else if (isMethod(definition, Methods.notOneOf)) {
        const match = getMethodParameter(definition);

        if (match.length === 0) {
            return;
        }

        result += `[^${match}]`;
    } else {
        console.error("Could not find method or value");
    }

    return result;
}

function isMethod(definition: string, helper: string) {
    return definition.startsWith(helper + "(");
}

function getMethodParameter(definition: string) {
    let methodNameMatch = definition.match(RegexHelpers.untilMethodStart);

    if (!methodNameMatch) {
        console.error(
            `Method parameter cannot be found for definition: ${definition}`
        );
        process.exit(1);
    }

    const methodName = methodNameMatch[0];
    return definition.replace(methodName, "").slice(0, -1).slice(1);
}

export { handleMethod, getMethodParameter };
