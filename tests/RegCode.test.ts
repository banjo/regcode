import { modelQuantifier, Quantifiers } from "../src/helpers/quantifiers";
import { RegexDefinitions } from "../src/helpers/regexDefinitions";
import { RegCode } from "../src/RegCode";

const regCode = new RegCode();

describe("values", () => {
    it("[number]", () => {
        let code = "[number]";
        let expected = `${RegexDefinitions.number}`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[number][or][letter]", () => {
        let code = "[number][or][letter]";
        let expected = `(${RegexDefinitions.number}${RegexDefinitions.or}${RegexDefinitions.letter})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[number][or][letter][or{${quantifier}}]", () => {
        let quantifier = 3;
        let code = `[number][or][letter][or{${quantifier}}]`;
        let expected = `(${RegexDefinitions.number}${RegexDefinitions.or}${
            RegexDefinitions.letter
        })${modelQuantifier(quantifier.toString())}`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[number]{3}[or][letter]", () => {
        let quantifier = 3;
        let code = `[number]{${quantifier}}[or][letter]`;
        let expected = `(${RegexDefinitions.number}${modelQuantifier(
            quantifier.toString()
        )}${RegexDefinitions.or}${RegexDefinitions.letter})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[number]{3}[or][letter]", () => {
        let quantifier = 3;
        let code = `[number]{${quantifier}}[or][letter]`;
        let expected = `(${RegexDefinitions.number}${modelQuantifier(
            quantifier.toString()
        )}${RegexDefinitions.or}${RegexDefinitions.letter})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[whitespace]{oneOrMore}[or][letter]{any}", () => {
        let code = `[whitespace]{oneOrMore}[or][letter]{any}`;
        let expected = `(${RegexDefinitions.whitespace}${Quantifiers.oneOrMore}${RegexDefinitions.or}${RegexDefinitions.letter}${Quantifiers.any})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[whitespace]{oneOrMore}[or][letter]{any}[or][letter]{optional}", () => {
        let code = `[whitespace]{oneOrMore}[or][letter]{any}[or][letter]{optional}`;
        let expected = `(${RegexDefinitions.whitespace}${Quantifiers.oneOrMore}${RegexDefinitions.or}${RegexDefinitions.letter}${Quantifiers.any}${RegexDefinitions.or}${RegexDefinitions.letter}${Quantifiers.optional})`;
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

    it("exact([letter])", () => {
        let code = "exact([letter])";
        let expected = `(${RegexDefinitions.letter})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("exact([letter]{3})", () => {
        let code = "exact([letter]{3})";
        let expected = `(${RegexDefinitions.letter}{3})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("exact([letter]{3}[or][number])", () => {
        let code = "exact([letter]{3}[or][number])";
        let expected = `(${RegexDefinitions.letter}{3}${RegexDefinitions.or}${RegexDefinitions.number})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("oneOf(a[or]b[or]c)", () => {
        let code = "oneOf(a[or]b[or]c)";
        let expected = `[a${RegexDefinitions.or}b${RegexDefinitions.or}c]`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("normal(a[or]b[or]c)", () => {
        let code = "normal(a[or]b[or]c)";
        let expected = `a${RegexDefinitions.or}b${RegexDefinitions.or}c`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("normal(a[or]b[or]c)[or]startsWith([number])", () => {
        let code = "startsWith(a[or]b[or]c)[or]startsWith([number])";
        let expected = `(^(a${RegexDefinitions.or}b${RegexDefinitions.or}c)|^(${RegexDefinitions.number}))`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });
});
