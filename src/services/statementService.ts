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
    const usedOrStatement = statement.includes(Splitters.or);
    let orQuantifier = null;

    const orQuantifierMatch = statement.match(
        RegexHelpers.orSplitterWithParameter
    );

    if (orQuantifierMatch && usedOrStatement) {
        const match = orQuantifierMatch[0];
        const quantifier = match.match(
            RegexHelpers.insideSquiglyBracketsIncludingBrackets
        )![0];

        const oldQuantifier = getQuantifier(quantifier);
        let newQuantifier = handleQuantifier(oldQuantifier);
        if (!newQuantifier) return null;

        newQuantifier = newQuantifier.replace(
            `{${oldQuantifier}}`,
            newQuantifier
        );

        if (quantifier) orQuantifier = newQuantifier;
        statement = statement.replace(match, ""); // remove or quantifer from statement
    }

    return { statement, usedOrStatement, orQuantifier };
}

function replaceAll(toReplace: string, oldString: string, newString: string) {
    return toReplace.split(oldString).join(newString);
}

export { addEscapeToEscapers, handleOr, replaceAll };
