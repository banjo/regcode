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

    it("[number][or][allCharacters]", () => {
        let code = "[number][or][allCharacters]";
        let expected = `(${RegexDefinitions.number}${RegexDefinitions.or}${RegexDefinitions.letter})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[number][or][allCharacters][or{${quantifier}}]", () => {
        let quantifier = 3;
        let code = `[number][or][allCharacters][or{${quantifier}}]`;
        let expected = `(${RegexDefinitions.number}${RegexDefinitions.or}${
            RegexDefinitions.letter
        })${modelQuantifier(quantifier.toString())}`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[number]{3}[or][allCharacters]", () => {
        let quantifier = 3;
        let code = `[number]{${quantifier}}[or][allCharacters]`;
        let expected = `(${RegexDefinitions.number}${modelQuantifier(
            quantifier.toString()
        )}${RegexDefinitions.or}${RegexDefinitions.letter})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[number]{3}[or][allCharacters]", () => {
        let quantifier = 3;
        let code = `[number]{${quantifier}}[or][allCharacters]`;
        let expected = `(${RegexDefinitions.number}${modelQuantifier(
            quantifier.toString()
        )}${RegexDefinitions.or}${RegexDefinitions.letter})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[whitespace]{oneOrMore}[or][allCharacters]{any}", () => {
        let code = `[whitespace]{oneOrMore}[or][allCharacters]{any}`;
        let expected = `(${RegexDefinitions.whitespace}${Quantifiers.oneOrMore}${RegexDefinitions.or}${RegexDefinitions.letter}${Quantifiers.any})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[whitespace]{oneOrMore}[or][allCharacters]{any}[or][allCharacters]{optional}", () => {
        let code = `[whitespace]{oneOrMore}[or][allCharacters]{any}[or][allCharacters]{optional}`;
        let expected = `(${RegexDefinitions.whitespace}${Quantifiers.oneOrMore}${RegexDefinitions.or}${RegexDefinitions.letter}${Quantifiers.any}${RegexDefinitions.or}${RegexDefinitions.letter}${Quantifiers.optional})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[number]{3} [allCharacters]{any-shortest}", () => {
        let code = `[number]{3} [allCharacters]{any-shortest} [allCharacters]{optional-shortest}`;
        let expected = `${RegexDefinitions.number}{3}${RegexDefinitions.letter}*?${RegexDefinitions.letter}??`;
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

    it("exact([allCharacters])", () => {
        let code = "exact([allCharacters])";
        let expected = `(${RegexDefinitions.letter})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("exact([allCharacters]{3})", () => {
        let code = "exact([allCharacters]{3})";
        let expected = `(${RegexDefinitions.letter}{3})`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("exact([allCharacters]{3}[or][number])", () => {
        let code = "exact([allCharacters]{3}[or][number])";
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

    it("exact(a[or]b[or]c)[or][start]exact([number])", () => {
        let code = "exact(a[or]b[or]c)[or][start]exact([number])";
        let expected = `((a${RegexDefinitions.or}b${RegexDefinitions.or}c)|^(${RegexDefinitions.number}))`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[start]exact(a[or]b[or]c)[or][start]exact([number])", () => {
        let code = "[start]exact(a[or]b[or]c)[or][start]exact([number])";
        let expected = `(^(a${RegexDefinitions.or}b${RegexDefinitions.or}c)|^(${RegexDefinitions.number}))`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });
});

describe("statements", () => {
    it("[start]exact(a[or]b[or]c)[or][start]exact([number]) exact(abc) [end]", () => {
        let code =
            "[start]exact(a[or]b[or]c)[or][start]exact([number]) exact(abc) [end]";
        let expected = `(^(a${RegexDefinitions.or}b${RegexDefinitions.or}c)|^(${RegexDefinitions.number}))(abc)$`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[allCharacters]{3} [number]{any} exact(abc) [end]", () => {
        let code = "[allCharacters]{3} [number]{any-shortest} exact(abc) [end]";
        let expected = `${RegexDefinitions.letter}{3}${RegexDefinitions.number}${Quantifiers.any}${Quantifiers.shortest}(abc)$`;
        let result = regCode.convert(code);

        expect(result).toBe(expected);
    });

    it("[allCharacters][or][number]{3}[or{any-shorter}]", () => {
        let code = "[allCharacters]{3} [number]{any-shortest} exact(abc) [end]";
        let expected = `${RegexDefinitions.letter}{3}${RegexDefinitions.number}${Quantifiers.any}${Quantifiers.shortest}(abc)$`;
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
