// combinations that does not work

import { Methods } from "./methods";
import { RegexDefinitions } from "./regexDefinitions";

interface IIllegalCombination {
    method: string;
    valueDefinition: string;
}

export const IllegalCombinations: IIllegalCombination[] = [
    {
        method: Methods.notOneOf.name,
        valueDefinition: nameOf(RegexDefinitions.notCharacter),
    },
    {
        method: Methods.oneOf.name,
        valueDefinition: nameOf(RegexDefinitions.notCharacter),
    },
];

function nameOf(definition: string) {
    const all = Object.keys(RegexDefinitions);
    let result = "";
    all.forEach(d => {
        if (RegexDefinitions[d] === definition) {
            result = d;
        }
    });
    return result;
}
