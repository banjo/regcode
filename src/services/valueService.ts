import { RegexDefinitions } from "../helpers/regexDefinitions";
import { RegexHelpers } from "../helpers/regexHelpers";

function convertDefinitionToValues(definition: string) {
    const allValues = definition.match(
        RegexHelpers.allInsideSquareBracketsIncludingBrackets
    );

    if (allValues) {
        for (const parameterValue of allValues) {
            const value = getValueFromDefinition(parameterValue);

            // @ts-ignore: currently any type on return
            const regexExpression = RegexDefinitions[value.toLowerCase()];
            definition = definition.replace(parameterValue, regexExpression);
        }
    }

    return definition;
}

function getValueFromDefinition(definition: string): string | null {
    if (definition.startsWith("[") && definition.endsWith("]")) {
        return definition.slice(1).slice(0, -1);
    }

    return null;
}

export { convertDefinitionToValues, getValueFromDefinition };
