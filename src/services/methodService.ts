import { Methods } from "../helpers/methods";
import { RegexHelpers } from "../helpers/regexHelpers";
import {
    convertDefinitionToValues,
    getValueFromDefinition,
} from "./valueService";
import { addEscapeToEscapers, replaceAll } from "./statementService";
import { Splitters } from "../helpers/splitters";
import { RegexDefinitions } from "../helpers/regexDefinitions";
import { handleQuantifier, getQuantifier } from "./quantifierService";
import { IllegalCombinations } from "../helpers/illegalCombinations";

const PLACEHOLDER_FOR_OR = "PLACEHOLDERFOREARLYOR1STATEMENTEND";
const PLACEHOLDER_FOR_PARAMETERS = (int: number) =>
    `PLACEHOLDERFORPARAMETER${int}END`;
const PLACEHOLDER_FOR_LEFT_BRACKET = "PLACEHOLDERFORLEFTBRACKETEND";
const PLACEHOLDER_FOR_RIGHT_BRACKET = "PLACEHOLDERFORRIGHTBRACKETEND";

function handleMethod(definition: string, hasQuantifier: boolean) {
    definition = replaceAll(definition, Splitters.or, PLACEHOLDER_FOR_OR);
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

    // handle combination that does not work
    IllegalCombinations.forEach(combination => {
        if (
            method.name === combination.method &&
            parameter.includes(combination.valueDefinition)
        ) {
            console.error(
                `Illegal combination: cannot combine method ${method.name} and definition ${combination.valueDefinition}`
            );

            process.exit(1);
        }
    });

    let result;
    if (method.name === Methods.regex.name) {
        if (parameter.includes(PLACEHOLDER_FOR_OR)) {
            console.error("Cannot include or statement in regex definition.");
            process.exit(1);
        }
        result = method(parameter);
    } else if (
        method.name === Methods.oneOf.name ||
        method.name === Methods.notOneOf.name
    ) {
        let modifiedParameters = handleParameters(parameter);

        // remove [] from character definition
        let charactersWithoutBrackets = RegexDefinitions.character
            .slice(1)
            .slice(0, -1);

        if (modifiedParameters.includes(RegexDefinitions.character)) {
            modifiedParameters = replaceAll(
                modifiedParameters,
                RegexDefinitions.character,
                charactersWithoutBrackets
            );
        }

        result = method(modifiedParameters);
    } else {
        let modifiedParameters = handleParameters(parameter);
        result = method(modifiedParameters);
    }

    return hasQuantifier ? `(${result})` : result;
}

function handleParameters(parameter: string) {
    // save placeholders
    let placeholderValues: string[];
    ({ parameter, placeholderValues } =
        setPlaceholdersForParameters(parameter));

    let modifiedParameters = braceInlineOr(parameter);

    // escape parameters
    modifiedParameters = addEscapeToEscapers(modifiedParameters);

    // restore placeholders
    modifiedParameters = setParametersForPlaceholder(
        modifiedParameters,
        placeholderValues
    );

    // convert to normal values
    modifiedParameters = convertDefinitionToValues(modifiedParameters);

    // restore placeholders for or brackets
    modifiedParameters = modifiedParameters
        .replace(PLACEHOLDER_FOR_LEFT_BRACKET, "(")
        .replace(PLACEHOLDER_FOR_RIGHT_BRACKET, ")");

    // add or part
    modifiedParameters = replaceAll(
        modifiedParameters,
        PLACEHOLDER_FOR_OR,
        RegexDefinitions.or
    );

    // convert quantifiers
    let oldQuantifier = getQuantifier(modifiedParameters);
    let newQuantifier = handleQuantifier(oldQuantifier);

    modifiedParameters = modifiedParameters.replace(
        `{${oldQuantifier}}`,
        newQuantifier
    );
    return modifiedParameters;
}

function braceInlineOr(modifiedParameters: string) {
    let matches = modifiedParameters.split(PLACEHOLDER_FOR_OR);

    let noOrStatement = matches.length === 1;
    if (noOrStatement) {
        return modifiedParameters;
    }

    modifiedParameters = handleBeforeOr(modifiedParameters, matches);
    modifiedParameters = handleAfterOr(modifiedParameters, matches);

    // TODO: if not, do the normal way
    // const matches = modifiedParameters.match(
    //     RegexHelpers.inlineOrBeforeAndAfter
    // );

    // if (matches) {
    //     matches.forEach(m => {
    //         modifiedParameters = modifiedParameters.replace(m, `(${m})`);
    //     });
    // }

    return modifiedParameters;
}

function handleAfterOr(parameters: string, matches: string[]) {
    let lastStatement = matches[matches.length - 1];
    let valueDefintionAfterOr: null | string = null;
    let valueDefinitionsLast = lastStatement.match(RegexHelpers.placeHolders);

    if (valueDefinitionsLast) {
        let firstElement = valueDefinitionsLast[0];

        if (lastStatement.startsWith(firstElement)) {
            valueDefintionAfterOr = lastStatement;
        }
    }

    if (valueDefintionAfterOr) {
        parameters = parameters.replace(
            valueDefintionAfterOr,
            `${valueDefintionAfterOr}${PLACEHOLDER_FOR_RIGHT_BRACKET}`
        );
    } else {
        let firstChar = lastStatement[0];
        let newStatement = lastStatement.replace(
            firstChar,
            `${firstChar}${PLACEHOLDER_FOR_RIGHT_BRACKET}`
        );
        parameters = parameters.replace(lastStatement, newStatement);
    }

    return parameters;
}

function handleBeforeOr(parameters: string, matches: string[]) {
    let valueDefinitionBeforeOr: null | string = null;
    let firstStatement = matches[0];
    let valueDefinitions = firstStatement.match(RegexHelpers.placeHolders);

    if (valueDefinitions) {
        let lastElement = valueDefinitions[valueDefinitions.length - 1];
        if (firstStatement.endsWith(lastElement)) {
            valueDefinitionBeforeOr = lastElement;
        }
    }

    if (valueDefinitionBeforeOr) {
        parameters = parameters.replace(
            valueDefinitionBeforeOr,
            `${PLACEHOLDER_FOR_LEFT_BRACKET}${valueDefinitionBeforeOr}`
        );
    } else {
        let lastChar = firstStatement[firstStatement.length - 1];
        let index = firstStatement.lastIndexOf(lastChar);
        let statementWithoutLast = firstStatement.slice(0, index);
        let newStatement = `${statementWithoutLast}${PLACEHOLDER_FOR_LEFT_BRACKET}${lastChar}`;
        parameters = parameters.replace(firstStatement, newStatement);
    }

    return parameters;
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
