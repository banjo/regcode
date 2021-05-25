import { Methods } from "../helpers/methods";
import { RegexHelpers } from "../helpers/regexHelpers";
import {
    convertDefinitionToValues,
    getValueFromDefinition,
} from "./valueService";
import { addEscapeToEscapers } from "./statementService";
import { Splitters } from "../helpers/splitters";
import { RegexDefinitions } from "../helpers/regexDefinitions";
import { handleQuantifier, getQuantifier } from "./quantifierService";

const PLACEHOLDER_FOR_OR = "PLACEHOLDERFORORSTATEMENT";
const PLACEHOLDER_FOR_PARAMETERS = (int: number) =>
    `PLACEHOLDERFORPARAMETER${int}END`;

function handleMethod(definition: string, hasQuantifier: boolean) {
    definition = definition.replace(Splitters.or, PLACEHOLDER_FOR_OR);
    return useMethod(definition, hasQuantifier);
}

function useMethod(definition: string, hasQuantifier: boolean) {
    const methodName = getMethodName(definition);

    const method = Methods[methodName];

    if (!method) {
        console.error(`Method ${definition} does not exist`);
        process.exit(1);
    }

    let parameter = getMethodParameter(definition);
    if (parameter.length === 0) {
        console.error(`${methodName} method expects at least one argument`);
        process.exit(1);
    }

    let result;
    if (method.name === Methods.regex.name) {
        result = method(parameter);
    } else {
        // save placerholders
        let placeholderValues: string[];
        ({ parameter, placeholderValues } =
            setPlaceholdersForParameters(parameter));

        // escape parameters
        let escapedParameter = addEscapeToEscapers(parameter);

        // restore placeholers
        escapedParameter = setParametersForPlaceholder(
            escapedParameter,
            placeholderValues
        );

        // convert to normal values
        escapedParameter = convertDefinitionToValues(escapedParameter);

        // add or part
        escapedParameter = escapedParameter.replace(
            PLACEHOLDER_FOR_OR,
            RegexDefinitions.or
        );

        // convert quantifiers
        let oldQuantifier = getQuantifier(escapedParameter);
        let newQuantifier = handleQuantifier(oldQuantifier);

        escapedParameter = escapedParameter.replace(
            `{${oldQuantifier}}`,
            newQuantifier
        );

        result = method(escapedParameter);
    }

    return hasQuantifier ? `(${result})` : result;
}

function setPlaceholdersForParameters(parameter: string) {
    let placeholderValues: string[] = [];

    const allCurrentValues = parameter.match(
        RegexHelpers.squareBracketsWithOptionalQuantifier
    );

    if (allCurrentValues) {
        let index = -1;
        for (const parameterValue of allCurrentValues) {
            index++;

            placeholderValues.push(parameterValue);

            parameter = parameter.replace(
                parameterValue,
                PLACEHOLDER_FOR_PARAMETERS(index)
            );
        }
    }

    return { parameter, placeholderValues };
}

function setParametersForPlaceholder(
    parameterWithPlaceholders: string,
    placeholderValues: string[]
) {
    let result = parameterWithPlaceholders;
    let index = -1;
    for (const value of placeholderValues) {
        index++;
        let toReplace = PLACEHOLDER_FOR_PARAMETERS(index);
        result = result.replace(toReplace, value);
    }

    return result;
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
