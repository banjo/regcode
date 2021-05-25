export const RegexHelpers = {
    insideSquareBrackets: /(?<=\[)[^\][]*(?=])/m,
    lastOccurenceOfWord: /(\bWORD\b)(?!.*\1)/gm,
    allInsideSquareBrackets: /(?<=\[)[^\][]*(?=])/gm,
    allInsideSquareBracketsIncludingBrackets: /\[(?<=\[)[^\][]*(?=])\]/gm,
    squareBracketsWithOptionalQuantifier: /\[(?<=\[)[^\][]*(?=])\](\{.*\})?/gm,
    insideSquiglyBrackets: /(?<=\{)[^\][]*(?=})/m,
    insideSquiglyBracketsIncludingBrackets: /\{(?<=\{)[^\][]*(?=})\}/m,
    beforeSquiglyBrackets: /(?:(?!\{).)*/m,
    insideBrackets: /(?<=\()[^\][]*(?=\))/m,
    beforeBrackets: /(?:(?!\().)*/m,
    orSplitterWithParameter: /\[or(\{.*\})\]/m,
    untilMethodStart: /[^(]*/m,
    methodParameterWithOr: /\(.*?\[or\].*?\)/gm,
    methodParameter: /\(.*?\)/gm,
    fullMethodWithPlaceholderWithQuantifier:
        /[a-zA-ZäöüßÄÖÜ]*?PLACEHOLDERFOREARLYORSTATEMENT({.*?})?/gm,
    fullValueDefinitionWithQuantifier: /\[[a-zA-ZäöüßÄÖÜ]*\]({.*})?/gm,
    fullMethodWithPlaceholderOrFullValue:
        /(\[[a-zA-ZäöüßÄÖÜ]*\])({.*})?|[a-zA-ZäöüßÄÖÜ]*?PLACEHOLDERFOREARLYORSTATEMENT({.*?})?/gm,
};
