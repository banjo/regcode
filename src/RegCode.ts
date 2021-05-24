import { RegexDefinitions } from "./helpers/regexDefinitions";
import { Splitters } from "./helpers/splitters";
import { appendQuantifier, getQuantifier } from "./services/quantifierService";
import { getDefinition, handleDefinition } from "./services/definitionService";
import { handleOr } from "./services/statementService";
import { RegexHelpers } from "./helpers/regexHelpers";

// statement:         oneOf([number]){3}[or][letter]{3}
// definition:        [number], oneOf()
// value:             [number]
// method:            oneOf()

export class RegCode {
    // TODO: positive/negative lookbehind?
    // TODO: use or within parameters
    // TODO: add short (greedy) to quantifiers
    // TODO: add error handling
    // TODO: check if valid regex, in methods and in general

    convert(regex: string): string {
        return this.handleRegex(regex);
    }

    private result = "";
    private placeholder = "PLACEHOLDERFOREARLYORSTATEMENT";

    private handleRegex(regex: string): string {
        const statements = regex.split(Splitters.divider);
        let orQuantifier = null;
        let usedOrStatement = false;

        for (let statement of statements) {
            ({ statement, usedOrStatement, orQuantifier } =
                handleOr(statement));

            // temporarily remove [or] within functions
            let orParameter = statement.match(
                RegexHelpers.methodParameterWithOr
            );
            if (orParameter) {
                orParameter?.forEach((m) => {
                    statement = statement.replace(m, this.placeholder);
                });
            }

            const parts = statement.split(Splitters.or);

            // set full or statement in brackets
            if (usedOrStatement) this.result += "(";

            let index = -1;
            let orPlaceholderIndex = 0;
            for (let part of parts) {
                index++;

                // replace placeholder with actual value
                if (part.includes(this.placeholder)) {
                    part = part.replace(
                        this.placeholder,
                        orParameter![orPlaceholderIndex]
                    );
                }

                const definition = getDefinition(part);
                const quantifier = getQuantifier(part);

                const hasQuantifier = !!quantifier;
                this.result += handleDefinition(definition, hasQuantifier);
                this.result += appendQuantifier(quantifier);

                const shouldAddOrSymbol =
                    usedOrStatement && index < parts.length - 1;
                if (shouldAddOrSymbol) this.result += RegexDefinitions.or;
            }

            // close brackets for full statement
            if (usedOrStatement) this.result += ")";
            if (orQuantifier) this.result += orQuantifier;
        }

        return this.result;
    }
}
