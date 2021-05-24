export class RegCode {
    // TODO: positive/negative lookbehind?
    // TODO: method: startsWith, endsWith, normal
    // TODO: change methods to methods in object
    // TODO: add error handling
    // TODO: refactor
    // TODO: escape characters in exact

    private result = "";

    convert(regex: string): string {
        return this.handleRegex(regex);
    }

    private handleRegex(regex: string): string {
        const statements = regex.split(this.splitters.divider);
        let orQuantifier = null;

        for (let statement of statements) {
            let usedOrStatement = statement.includes(this.splitters.or);

            let orQuantifierMatch = statement.match(
                this.regexHelpers.orSplitterWithParameter
            );

            if (orQuantifierMatch && usedOrStatement) {
                let match = orQuantifierMatch[0];
                let quantifier = match.match(
                    this.regexHelpers.insideSquiglyBracketsIncludingBrackets
                )![0];

                if (quantifier) orQuantifier = quantifier;
                statement = statement.replace(match, ""); // remove or quantifer from statement
            }

            const parts = statement.split(this.splitters.or);

            if (parts.length > 1) {
                usedOrStatement = true;
            }

            // set full or statement in brackets
            if (usedOrStatement) this.result += "(";

            let index = -1;
            for (const part of parts) {
                index++;
                const definition = this.getDefinition(part);
                const quantifier = this.getQuantifier(part);

                this.handleDefinition(definition);
                this.appendQuantifier(quantifier);

                const shouldAddOrSymol =
                    usedOrStatement && index < parts.length - 1;
                if (shouldAddOrSymol) this.result += this.definitions.or;
            }

            // close brackets for full statement
            if (usedOrStatement) this.result += ")";
            if (orQuantifier) this.result += orQuantifier;
        }

        return this.result;
    }

    private escapers = ".^$*+-?()[]{}|";

    private addEscapeToEscapers(statement: string) {
        let methodName = statement.split("(")[0];
        let result = this.getMethodParameter(statement);

        this.escapers.split("").forEach((e) => {
            result = result.replace(e, "\\" + e);
        });

        return `${methodName}(${result})`;
    }

    private helpers = {
        exact: "exact",
        regex: "regex",
        oneOf: "oneOf",
        notOneOf: "notOneOf",
    };

    private splitters = {
        or: "[or]",
        divider: " ",
    };

    private regexHelpers = {
        insideSquareBrackets: /(?<=\[)[^\][]*(?=])/m,
        lastOccurenceOfWord: /(\bWORD\b)(?!.*\1)/gm,
        allInsideSquareBrackets: /(?<=\[)[^\][]*(?=])/gm,
        allInsideSquareBracketsIncludingBrackets: /\[(?<=\[)[^\][]*(?=])\]/gm,
        insideSquiglyBrackets: /(?<=\{)[^\][]*(?=})/m,
        insideSquiglyBracketsIncludingBrackets: /\{(?<=\{)[^\][]*(?=})\}/m,
        beforeSquiglyBrackets: /(?:(?!\{).)*/m,
        insideBrackets: /(?<=\()[^\][]*(?=\))/m,
        beforeBrackets: /(?:(?!\().)*/m,
        orSplitterWithParameter: /\[or(\{.*\})\]/m,
        untilMethodStart: /[^(]*/m,
    };

    private definitions = {
        number: String.raw`\d`,
        letter: String.raw`(\p{L}\p{M}*+)`,
        whitespace: String.raw`\s`,
        any: String.raw`.`,
        or: "|",
    };

    private quantifiers = {
        model: (quantifier: string) => `{${quantifier}}`,
        oneOrMore: `+`,
        any: `*`,
        optional: `?`,
    };

    private getQuantifier(part: string) {
        const endsWithQualifier = part.endsWith("}");

        if (!endsWithQualifier) return null;

        let quantifier = part.split("{").pop()!.slice(0, -1);

        return quantifier;
    }

    private getDefinition(part: string) {
        const isValue = part.startsWith("[");
        const endsWithQualifier = part.endsWith("}");

        // handle value
        if (isValue && endsWithQualifier) {
            return part.match(this.regexHelpers.beforeSquiglyBrackets)![0];
        } else if (isValue) {
            return part;
        }

        // handle method
        let method: string;
        if (endsWithQualifier) {
            let splitArray = part.split("{");
            splitArray.pop(); // remove quantifier
            method = splitArray.join("{");
        } else {
            method = part;
        }

        return method;
    }

    private appendQuantifier(quantifier: string | null) {
        if (quantifier) {
            // @ts-ignore: currently any type on return
            const customQuantifier = this.quantifiers[quantifier];

            if (customQuantifier) {
                this.result += customQuantifier;
            } else {
                this.result += this.quantifiers.model(quantifier);
            }
        }
    }

    private useHelper(definition: string, helper: string) {
        return definition.startsWith(helper + "(");
    }

    private getValueFromDefinition(definition: string): string | null {
        if (definition.startsWith("[") && definition.endsWith("]")) {
            return definition.slice(1).slice(0, -1);
        }

        return null;
    }

    private getMethodParameter(definition: string) {
        let methodNameMatch = definition.match(
            this.regexHelpers.untilMethodStart
        );

        if (!methodNameMatch) {
            console.error(
                `Method parameter cannot be found for definition: ${definition}`
            );
            process.exit(1);
        }

        const methodName = methodNameMatch[0];
        return definition.replace(methodName, "").slice(0, -1).slice(1);
    }

    private handleDefinition(definition: string) {
        // handle if it is a value
        const value = this.getValueFromDefinition(definition);

        if (value) {
            // @ts-ignore: currently any type on return
            this.result += this.definitions[value.toLowerCase()];
            return;
        }

        // handle if it is a method
        // convert all definitions in parameters to values
        const allDefinitions = definition.match(
            this.regexHelpers.allInsideSquareBracketsIncludingBrackets
        );

        if (allDefinitions) {
            for (const parameterDefinition of allDefinitions) {
                const value = this.getValueFromDefinition(parameterDefinition);
                // @ts-ignore: currently any type on return
                const regexExpression = this.definitions[value.toLowerCase()];
                definition = definition.replace(
                    parameterDefinition,
                    regexExpression
                );
            }
        }

        // handle regex first as it is the only one that does not add escape to characters
        if (this.useHelper(definition, this.helpers.regex)) {
            const match = this.getMethodParameter(definition);
            this.result += match;
            return;
        }

        definition = this.addEscapeToEscapers(definition);

        if (this.useHelper(definition, this.helpers.exact)) {
            const match = this.getMethodParameter(definition);

            this.result += `(${match})`;
        } else if (this.useHelper(definition, this.helpers.oneOf)) {
            const match = this.getMethodParameter(definition);

            if (match.length === 0) {
                return;
            }

            this.result += `[${match}]`;
        } else if (this.useHelper(definition, this.helpers.notOneOf)) {
            const match = this.getMethodParameter(definition);

            if (match.length === 0) {
                return;
            }

            this.result += `[^${match}]`;
        } else {
            console.error("Could not find method or value");
        }
    }
}

// const regexConvert = new RegCode();
// const regexCode =
// "[number]{any}[or][number]{5}[or][number]{3} exact(user){4} [letter]{2} regex(\\d) oneOf(abc) notOneOf([whitespace][letter])";
// const regexCode = "[number]{4}[or]regex(\\d)[or{3}]";
// const regexCode = "exact(ab)c) regex(\\d.)";
// const result = regexConvert.convert(regexCode);
// console.log(result);
