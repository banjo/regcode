import { Methods } from "../helpers/methods";
import { RegexHelpers } from "../helpers/regexHelpers";
import {
    convertDefinitionToValues,
    getValueFromDefinition,
} from "./valueService";
import { addEscapeToEscapers, replaceAll } from "./statementService";
import { Splitters } from "../helpers/splitters";
import { RegexDefinitions } from "../helpers/regexDefinitions";
import { handleQuantifier, getInlineQuantifiers } from "./quantifierService";
import { IllegalCombinations } from "../helpers/illegalCombinations";
import { Placeholders } from "../helpers/placeholders";

function handleMethod(definition: string, hasQuantifier: boolean) {
    definition = replaceAll(definition, Splitters.or, Placeholders.mainOr);
    return useMethod(definition, hasQuantifier);
}

function useMethod(definition: string, hasQuantifier: boolean): string | null {
    const methodName = getMethodName(definition);
    if (!methodName) return null;

    const method = Methods[methodName];

    if (!method) {
        console.error(`Method ${definition} does not exist`);
        return null;
    }

    let parameter = getMethodParameter(definition);

    if (!parameter) return null;
    if (parameter.length === 0) return null;

    // handle combination that does not work
    for (const combination of IllegalCombinations) {
        if (
            method.name === combination.method &&
            parameter.includes(combination.valueDefinition)
        ) {
            console.error(
                `Illegal combination: cannot combine method ${method.name} and definition ${combination.valueDefinition}`
            );

            return null;
        }
    }

    let result;
    if (method.name === Methods.regex.name) {
        if (parameter.includes(Placeholders.mainOr)) {
            console.error("Cannot include or statement in regex definition.");
            return null;
        }
        result = method(parameter);
    } else if (
        method.name === Methods.oneOf.name ||
        method.name === Methods.notOneOf.name
    ) {
        let modifiedParameters = handleParameters(parameter);
        if (!modifiedParameters) return null;

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
        if (!modifiedParameters) return null;

        result = method(modifiedParameters);
    }

    return hasQuantifier ? `(${result})` : result;
}

function handleParameters(parameter: string): string | null {
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
    let parametersWithValues = convertDefinitionToValues(modifiedParameters);
    if (!parametersWithValues) return null;
    modifiedParameters = parametersWithValues;

    // restore placeholders for or brackets
    modifiedParameters = modifiedParameters
        .replace(Placeholders.leftBracket, "(")
        .replace(Placeholders.rightBracket, ")");

    // add or part
    modifiedParameters = replaceAll(
        modifiedParameters,
        Placeholders.mainOr,
        RegexDefinitions.or
    );

    // convert quantifiers
    let oldQuantifiers = getInlineQuantifiers(modifiedParameters);

    if (oldQuantifiers) {
        oldQuantifiers.forEach(q => {
            let newQuantifier = handleQuantifier(q);
            if (!newQuantifier) return null;

            modifiedParameters = modifiedParameters.replace(
                `{${q}}`,
                newQuantifier
            );
        });
    }

    return modifiedParameters;
}

function braceInlineOr(modifiedParameters: string) {
    let matches = modifiedParameters.split(Placeholders.mainOr);

    let noOrStatement = matches.length === 1;
    if (noOrStatement) {
        return modifiedParameters;
    }

    modifiedParameters = handleBeforeOr(modifiedParameters, matches);
    modifiedParameters = handleAfterOr(modifiedParameters, matches);

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
            `${valueDefintionAfterOr}${Placeholders.rightBracket}`
        );
    } else {
        let firstChar = lastStatement[0];
        let newStatement = lastStatement.replace(
            firstChar,
            `${firstChar}${Placeholders.rightBracket}`
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
            `${Placeholders.leftBracket}${valueDefinitionBeforeOr}`
        );
    } else {
        let lastChar = firstStatement[firstStatement.length - 1];
        let index = firstStatement.lastIndexOf(lastChar);
        let statementWithoutLast = firstStatement.slice(0, index);
        let newStatement = `${statementWithoutLast}${Placeholders.leftBracket}${lastChar}`;
        parameters = parameters.replace(firstStatement, newStatement);
    }

    return parameters;
}

function setPlaceholdersForParameters(parameter: string) {
    let placeholderValues: string[] = [];

    let parameters: RegExpMatchArray = [];

    const allCurrentValues = parameter.match(
        RegexHelpers.squareBracketsWithOptionalQuantifier
    );

    if (allCurrentValues) parameters = [...allCurrentValues];

    const quantifiers = parameter.match(RegexHelpers.quantifier);

    if (quantifiers) parameters = [...parameters, ...quantifiers];

    let index = -1;
    if (parameters.length > 0) {
        for (const parameterValue of parameters) {
            index++;

            placeholderValues.push(parameterValue);

            parameter = parameter.replace(
                parameterValue,
                Placeholders.parameter(index)
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
        let toReplace = Placeholders.parameter(index);
        result = result.replace(toReplace, value);
    }

    return result;
}

function getMethodParameter(definition: string): string | null {
    let methodName = getMethodName(definition);

    if (!methodName) {
        console.error(
            `Method parameter cannot be found for definition: ${definition}`
        );
        return null;
    }

    return definition.replace(methodName, "").slice(0, -1).slice(1);
}

function getMethodName(definition: string) {
    const match = definition.match(RegexHelpers.untilMethodStart);
    if (!match) {
        console.error(
            `Could not get method name from definition ${definition}`
        );
        return null;
    }

    return match[0];
}

export { handleMethod, getMethodParameter };
