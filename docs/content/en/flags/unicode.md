---
title: <unicode>
description: 'Docs on how to understand the unicode flag in regcode'
position: 1
category: 'flags'
features:
---

Enables full Unicode support in the search.This is not widely supported in regcode yet as no particular values have been added that uses Unicode. However, it is possible to use it with the `regex()` method.

For example, `\p{...}` (where dots can be anything), allows you to match for different Unicode properties. You can read more about that [here](https://javascript.info/regexp-unicode). For example, `\p{L}` allows you to match for all letters in Unicode.

## Usage

`<unicode>`


## Example

This example is used in the link about Unicode above.

```ts
const wordToMatch = "ბㄱ";
const codeWithoutFlag = "regex(\p{L}){any}";
const codeWithFlag = "<unicode> regex(\p{L}){any}";

regCode.match(codeWithoutFlag, wordToMatch);    // null
regCode.match(codeWithFlag, wordToMatch);       // "ბㄱ"
```

## Regex

```regex
//u
```
