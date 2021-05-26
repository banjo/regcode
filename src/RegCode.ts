import { RegexDefinitions } from "./helpers/regexDefinitions";
import { Splitters } from "./helpers/splitters";
import { handleQuantifier, getQuantifier } from "./services/quantifierService";
import { getDefinition, handleDefinition } from "./services/definitionService";
import { handleOr } from "./services/statementService";
import { RegexHelpers } from "./helpers/regexHelpers";
import { isValid } from "./services/regexService";
import { Placeholders } from "./helpers/placeholders";

// statement:         oneOf([number]){3}[or][character]{3}
// definition:        [number], oneOf()
// value:             [number]
// method:            oneOf()

export class RegCode {
    // TODO: flags

    convert(regCode: string): string {
        let regex = this.handleRegex(regCode);

        if (!isValid(regex)) {
            console.error("Regex is not valid");
            process.exit(1);
        }

        return regex;
    }

    match(regCode: string, toMatch: string): RegExpMatchArray | null {
        const regex = this.convert(regCode);
        return toMatch.match(regex);
    }

    hasMatch(regCode: string, toMatch: string): boolean {
        const regex = this.convert(regCode);
        const match = toMatch.match(regex);
        return !!match;
    }

    private result = "";

    private handleRegex(regex: string): string {
        const statements = regex.split(Splitters.divider);
        let orQuantifier = null;
        let usedOrStatement = false;

        for (let statement of statements) {
            // temporarily remove all method parameters within functions
            let allMethodParameters = statement.match(
                RegexHelpers.methodParameter
            );
            if (allMethodParameters) {
                allMethodParameters?.forEach(m => {
                    statement = statement.replace(m, Placeholders.mainOr);
                });
            }

            ({ statement, usedOrStatement, orQuantifier } =
                handleOr(statement));

            const orParts = statement.split(Splitters.or);

            // set full or statement in brackets
            if (usedOrStatement) this.result += "(";

            let index = -1;
            let orPlaceholderIndex = 0;
            for (let part of orParts) {
                index++;

                // split parts
                let allDefinitions = part.match(
                    RegexHelpers.fullMethodWithPlaceholderOrFullValue
                );

                if (!allDefinitions) {
                    console.error(
                        "Could not find any definitions in part " + part
                    );
                    process.exit(1);
                }

                for (let partDefinition of allDefinitions) {
                    // replace placeholder with actual value
                    if (partDefinition.includes(Placeholders.mainOr)) {
                        partDefinition = partDefinition.replace(
                            Placeholders.mainOr,
                            allMethodParameters![orPlaceholderIndex]
                        );
                        orPlaceholderIndex++;
                    }

                    const definition = getDefinition(partDefinition);
                    const quantifier = getQuantifier(partDefinition);

                    const hasQuantifier = !!quantifier;
                    this.result += handleDefinition(definition, hasQuantifier);
                    this.result += handleQuantifier(quantifier);
                }

                const shouldAddOrSymbol =
                    usedOrStatement && index < orParts.length - 1;
                if (shouldAddOrSymbol) this.result += RegexDefinitions.or;
            }

            // close brackets for full statement
            if (usedOrStatement) this.result += ")";
            if (orQuantifier) this.result += orQuantifier;
        }

        let finalResult = this.result;
        this.result = "";
        return finalResult;
    }
}
