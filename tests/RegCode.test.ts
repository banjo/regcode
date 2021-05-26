import { modelQuantifier, Quantifiers } from "../src/helpers/quantifiers";
import { RegexDefinitions } from "../src/helpers/regexDefinitions";
import { RegCode } from "../src/RegCode";
import { isValid } from "../src/services/regexService";

const regCode = new RegCode();

describe("values", () => {
    it("[number]", () => {
        let code = "[number]";
        let expected = `${RegexDefinitions.number}`;
        let result = regCode.convert(code);

        // expect(isValid(result)).toBe(true);
        expect(result).toBe(expected);
    });

    it("[number][or][character]", () => {
        let code = "[number][or][character]";
        let expected = `(${RegexDefinitions.number}${RegexDefinitions.or}${RegexDefinitions.character})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[number][or][character][or{${quantifier}}]", () => {
        let quantifier = 3;
        let code = `[number][or][character][or{${quantifier}}]`;
        let expected = `(${RegexDefinitions.number}${RegexDefinitions.or}${
            RegexDefinitions.character
        })${modelQuantifier(quantifier.toString())}`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[number]{3}[or][character]", () => {
        let quantifier = 3;
        let code = `[number]{${quantifier}}[or][character]`;
        let expected = `(${RegexDefinitions.number}${modelQuantifier(
            quantifier.toString()
        )}${RegexDefinitions.or}${RegexDefinitions.character})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[number]{3}[or][character]", () => {
        let quantifier = 3;
        let code = `[number]{${quantifier}}[or][character]`;
        let expected = `(${RegexDefinitions.number}${modelQuantifier(
            quantifier.toString()
        )}${RegexDefinitions.or}${RegexDefinitions.character})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[whitespace]{oneOrMore}[or][character]{any}", () => {
        let code = `[whitespace]{oneOrMore}[or][character]{any}`;
        let expected = `(${RegexDefinitions.whitespace}${Quantifiers.oneOrMore}${RegexDefinitions.or}${RegexDefinitions.character}${Quantifiers.any})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[whitespace]{oneOrMore}[or][character]{any}[or][character]{optional}", () => {
        let code = `[whitespace]{oneOrMore}[or][character]{any}[or][character]{optional}`;
        let expected = `(${RegexDefinitions.whitespace}${Quantifiers.oneOrMore}${RegexDefinitions.or}${RegexDefinitions.character}${Quantifiers.any}${RegexDefinitions.or}${RegexDefinitions.character}${Quantifiers.optional})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[number]{3} [character]{any-shortest}", () => {
        let code = `[number]{3} [character]{any-shortest} [character]{optional-shortest}`;
        let expected = `${RegexDefinitions.number}{3}${RegexDefinitions.character}*?${RegexDefinitions.character}??`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });
});

describe("methods", () => {
    it(String.raw`regex(\()`, () => {
        let code = String.raw`regex(\()`;
        let expected = String.raw`\(`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it(String.raw`regex(\(dad)`, () => {
        let code = String.raw`regex(\(dad)`;
        let expected = String.raw`\(dad`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("exact(abc)", () => {
        let code = "exact(abc)";
        let expected = "(abc)";
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("exact([character])", () => {
        let code = "exact([character])";
        let expected = `(${RegexDefinitions.character})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("exact([character]{3})", () => {
        let code = "exact([character]{3})";
        let expected = `(${RegexDefinitions.character}{3})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("exact([character]{3}[or][number])", () => {
        let code = "exact([character]{3}[or][number])";
        let expected = `((${RegexDefinitions.character}{3}${RegexDefinitions.or}${RegexDefinitions.number}))`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("oneOf(a[or]b[or]c)", () => {
        let code = "oneOf(a[or]b[or]c)";
        let expected = `[(a${RegexDefinitions.or}b${RegexDefinitions.or}c)]`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("normal(a[or]b[or]c)", () => {
        let code = "normal(a[or]b[or]c)";
        let expected = `(a${RegexDefinitions.or}b${RegexDefinitions.or}c)`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("exact(a[or]b[or]c)[or][start]exact([number])", () => {
        let code = "exact(a[or]b[or]c)[or][start]exact([number])";
        let expected = `(((a${RegexDefinitions.or}b${RegexDefinitions.or}c))|^(${RegexDefinitions.number}))`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[start]exact(a[or]b[or]c)[or][start]exact([number])", () => {
        let code = "[start]exact(a[or]b[or]c)[or][start]exact([number])";
        let expected = `(^((a${RegexDefinitions.or}b${RegexDefinitions.or}c))|^(${RegexDefinitions.number}))`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });
});

describe("statements", () => {
    it("[start]exact(a[or]b[or]c)[or][start]exact([number]) exact(abc) [end]", () => {
        let code =
            "[start]exact(a[or]b[or]c)[or][start]exact([number]) exact(abc) [end]";
        let expected = `(^((a${RegexDefinitions.or}b${RegexDefinitions.or}c))|^(${RegexDefinitions.number}))(abc)$`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[character]{3} [number]{any} exact(abc) [end]", () => {
        let code = "[character]{3} [number]{any-shortest} exact(abc) [end]";
        let expected = `${RegexDefinitions.character}{3}${RegexDefinitions.number}${Quantifiers.any}${Quantifiers.shortest}(abc)$`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[character][or][number]{3}[or{any-shorter}]", () => {
        let code = "[character]{3} [number]{any-shortest} exact(abc) [end]";
        let expected = `${RegexDefinitions.character}{3}${RegexDefinitions.number}${Quantifiers.any}${Quantifiers.shortest}(abc)$`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("exact(abc)[or]exact(def)normal(hej)", () => {
        let code = "exact(abc)[or]exact(def)normal(hej)";
        let expected = `((abc)${RegexDefinitions.or}(def)hej)`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });
});
