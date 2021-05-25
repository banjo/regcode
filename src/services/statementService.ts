import { Escapers } from "../helpers/escapers";
import { RegexHelpers } from "../helpers/regexHelpers";
import { Splitters } from "../helpers/splitters";
import { getQuantifier, handleQuantifier } from "./quantifierService";

function addEscapeToEscapers(parameters: string) {
    let result = parameters;
    Escapers.split("").forEach(e => {
        result = result.replace(e, "\\" + e);
    });

    return result;
}

function handleOr(statement: string) {
    let usedOrStatement = statement.includes(Splitters.or);
    let orQuantifier = null;

    let orQuantifierMatch = statement.match(
        RegexHelpers.orSplitterWithParameter
    );

    if (orQuantifierMatch && usedOrStatement) {
        let match = orQuantifierMatch[0];
        let quantifier = match.match(
            RegexHelpers.insideSquiglyBracketsIncludingBrackets
        )![0];

        let oldQuantifier = getQuantifier(quantifier);
        let newQuantifier = handleQuantifier(oldQuantifier);

        newQuantifier = newQuantifier.replace(
            `{${oldQuantifier}}`,
            newQuantifier
        );

        if (quantifier) orQuantifier = newQuantifier;
        statement = statement.replace(match, ""); // remove or quantifer from statement
    }

    return { statement, usedOrStatement, orQuantifier };
}

export { addEscapeToEscapers, handleOr };
