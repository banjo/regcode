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
        /[a-zA-ZäöüßÄÖÜ]*?PLACEHOLDERFOREARLYOR1STATEMENTEND({.*?})?/gm,
    fullValueDefinitionWithQuantifier: /\[[a-zA-ZäöüßÄÖÜ]*\]({.*})?/gm,
    fullMethodWithPlaceholderOrFullValue:
        /(\[[a-zA-ZäöüßÄÖÜ]*\])({.*})?|[a-zA-ZäöüßÄÖÜ]*?PLACEHOLDERFOREARLYOR1STATEMENTEND({.*?})?/gm,
    inlineOrBeforeAndAfter: /[^\\]\|./gm,
    placeHolders: /PLACEHOLDERFOR(PARAMETER)*?\d+END/gm,
    quantifier:
        /\{((\d+)|(\d+,)|(\d+?,\d+?)|(oneOrMore|any|optional))(-(shortest|shorter|short))?\}/gm,
    flagBrackets: /<(ignoreCase|matchAll|multiline|dotAll|unicode)>/gm,
};
