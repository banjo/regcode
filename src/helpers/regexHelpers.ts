export const RegexHelpers = {
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
    methodParameterWithOr: /\(.*?\[or\].*?\)/gm,
};
