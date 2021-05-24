import { Escapers } from "./helpers/escapers";
import { Methods } from "./helpers/methods";
import { Quantifiers } from "./helpers/quantifiers";
import { RegexDefinitions } from "./helpers/regexDefinitions";
import { RegexHelpers } from "./helpers/regexHelpers";
import { Splitters } from "./helpers/splitters";
import { getValueFromDefinition } from "./services/valueService";
import { handleMethod } from "./services/methodService";
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

    private result = "";

    convert(regex: string): string {
        return this.handleRegex(regex);
    }

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
