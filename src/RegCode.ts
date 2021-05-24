import { RegexDefinitions } from "./helpers/regexDefinitions";
import { Splitters } from "./helpers/splitters";
import { appendQuantifier, getQuantifier } from "./services/quantifierService";
import { getDefinition, handleDefinition } from "./services/definitionService";
import { handleOr } from "./services/statementService";

// statement:         oneOf([number]){3}[or][letter]{3}
// definition:        [number], oneOf()
// value:             [number]
// method:            oneOf()

export class RegCode {
    // TODO: positive/negative lookbehind?
    // TODO: method: startsWith, endsWith
    // TODO: do not embrace exact in brackets when no quantifier
    // TODO: change methods to methods in object
    // TODO: add error handling

    convert(regex: string): string {
        return this.handleRegex(regex);
    }

    private result = "";

    private handleRegex(regex: string): string {
        const statements = regex.split(Splitters.divider);
        let orQuantifier = null;
        let usedOrStatement = false;

        for (let statement of statements) {
            ({ statement, usedOrStatement, orQuantifier } =
                handleOr(statement));

            const parts = statement.split(Splitters.or);

            // set full or statement in brackets
            if (usedOrStatement) this.result += "(";

            let index = -1;
            for (const part of parts) {
                index++;
                const definition = getDefinition(part);
                const quantifier = getQuantifier(part);

                this.result += handleDefinition(definition);
                this.result += appendQuantifier(quantifier);

                const shouldAddOrSymol =
                    usedOrStatement && index < parts.length - 1;
                if (shouldAddOrSymol) this.result += RegexDefinitions.or;
            }

            // close brackets for full statement
            if (usedOrStatement) this.result += ")";
            if (orQuantifier) this.result += orQuantifier;
        }

        return this.result;
    }
}
