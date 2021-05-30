import { RegexDefinitions } from "./helpers/regexDefinitions";
import { Splitters } from "./helpers/splitters";
import { handleQuantifier, getQuantifier } from "./services/quantifierService";
import { getDefinition, handleDefinition } from "./services/definitionService";
import { handleOr } from "./services/statementService";
import { RegexHelpers } from "./helpers/regexHelpers";
import { isValid } from "./services/regexService";
import { Placeholders } from "./helpers/placeholders";
import { logger } from "./config/logger";
import { Flags } from "./helpers/flags";

// statement:         oneOf([number]){3}[or][character]{3}
// definition:        [number], oneOf()
// value:             [number]
// method:            oneOf()
// flags:             <ignoreCase, matchAll, multiline, dotAll, unicode> separately

export class RegCode {
    private result = "";
    private flags = "";

    convert(regCode: string): RegExp | null {
        this.result = "";
        this.flags = "";

        const regex = this.handleRegex(regCode);
        if (!regex) return null;

        if (!isValid(regex)) {
            logger.error("Regex is not valid");
            return null;
        }

        return new RegExp(regex, this.flags);
    }

    match(regCode: string, toMatch: string): RegExpMatchArray | null {
        const regex = this.convert(regCode);

        if (!regex) return null;

        return toMatch.match(regex);
    }

    hasMatch(regCode: string, toMatch: string): boolean {
        const regex = this.convert(regCode);

        if (!regex) return false;

        const match = toMatch.match(regex);
        return !!match;
    }

    private handleRegex(regex: string): string | null {
        const statements = regex.split(Splitters.divider);
        let orQuantifier = null;
        let usedOrStatement = false;

        for (let statement of statements) {
            // temporarily remove all method parameters within functions
            const allMethodParameters = statement.match(
                RegexHelpers.methodParameter
            );
            if (allMethodParameters) {
                allMethodParameters?.forEach(m => {
                    statement = statement.replace(m, Placeholders.mainOr);
                });
            }

            // get flags
            const flags = statement.match(RegexHelpers.flagBrackets);
            if (flags) {
                for (const flag of flags) {
                    const flagWithoutBrackets = flag.slice(1).slice(0, -1);
                    const flagDefinition = Flags[flagWithoutBrackets];

                    if (!flagDefinition) {
                        logger.error(`Flag ${flag} not defined`);
                        return null;
                    }

                    if (!this.flags.includes(flagDefinition))
                        this.flags += flagDefinition;

                    statement = statement.replace(flag, "");
                }
            }

            if (statement.length === 0) continue;

            const orHandleResponse = handleOr(statement);
            if (!orHandleResponse) return null;
            ({ statement, usedOrStatement, orQuantifier } = orHandleResponse);

            const orParts = statement.split(Splitters.or);

            // set full or statement in brackets
            if (usedOrStatement) this.result += "(?:";

            let index = -1;
            let orPlaceholderIndex = 0;
            for (const part of orParts) {
                index++;

                // split parts
                const allDefinitions = part.match(
                    RegexHelpers.fullMethodWithPlaceholderOrFullValue
                );

                if (!allDefinitions) {
                    logger.error(`${part} is not a valid definition`);
                    return null;
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
                    const newDefinition = handleDefinition(
                        definition,
                        hasQuantifier
                    );

                    if (!newDefinition) return null;

                    this.result += newDefinition;
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

        return this.result;
    }
}
