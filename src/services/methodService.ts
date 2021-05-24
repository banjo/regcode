import { Methods } from "../helpers/methods";
import { RegexHelpers } from "../helpers/regexHelpers";
import { convertDefinitionToValues } from "./valueService";
import { addEscapeToEscapers } from "./statementService";

function handleMethod(definition: string, hasQuantifier: boolean) {
    definition = convertDefinitionToValues(definition);

    return useMethod(definition, hasQuantifier);
}

function useMethod(definition: string, hasQuantifier: boolean) {
    const methodName = getMethodName(definition);

    const method = Methods[methodName];

    if (!method) {
        console.error(`Method ${definition} does not exist`);
        process.exit(1);
    }

    const parameter = getMethodParameter(definition);
    if (parameter.length === 0) {
        console.error(`${methodName} method expects at least one argument`);
        process.exit(1);
    }

    if (method.name === Methods.regex.name) {
        return method(parameter, hasQuantifier);
    }

    const escapedParameter = addEscapeToEscapers(parameter);

    return method(escapedParameter, hasQuantifier);
}

function getMethodParameter(definition: string) {
    let methodName = getMethodName(definition);

    if (!methodName) {
        console.error(
            `Method parameter cannot be found for definition: ${definition}`
        );
        process.exit(1);
    }

    return definition.replace(methodName, "").slice(0, -1).slice(1);
}

function getMethodName(definition: string) {
    const match = definition.match(RegexHelpers.untilMethodStart);
    if (!match) {
        console.error(
            `Could not get method name from definition ${definition}`
        );
        process.exit(1);
    }

    return match[0];
}

export { handleMethod, getMethodParameter };
