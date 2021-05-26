import { RegexDefinitions } from "../helpers/regexDefinitions";
import { RegexHelpers } from "../helpers/regexHelpers";

function convertDefinitionToValues(definition: string) {
    const allValues = definition.match(
        RegexHelpers.allInsideSquareBracketsIncludingBrackets
    );

    if (allValues) {
        for (const parameterValue of allValues) {
            let parameterIsValueDefinition = false;
            Object.keys(RegexDefinitions).forEach(key => {
                let keyAsDefinition = `[${key}]`;
                if (keyAsDefinition === parameterValue) {
                    parameterIsValueDefinition = true;
                }
            });

            if (!parameterIsValueDefinition) {
                continue;
            }

            const value = getValueFromDefinition(parameterValue);

            if (!value) {
                console.error(`Invalid value in ${parameterValue}`);
                process.exit(1);
            }

            const regexExpression = RegexDefinitions[value.toLowerCase()];
            definition = definition.replace(parameterValue, regexExpression);
        }
    }

    return definition;
}

function getValueFromDefinition(definition: string): string | null {
    const match = definition.match(RegexHelpers.allInsideSquareBrackets);

    if (match === null) {
        console.error("Could not find value in definition " + definition);
        process.exit(1);
    }

    return match[0];
}

function isValue(definition: string) {
    if (definition.startsWith("[") && definition.endsWith("]")) {
        return true;
    }
}

export { convertDefinitionToValues, getValueFromDefinition, isValue };
