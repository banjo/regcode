---
title: <ignoreCase>
description: 'Docs on how to understand the ignoreCase flag in regcode'
position: 1
category: 'flags'
features:
---

Using the ignoreCase flag, your search will be case-insensetive. There will, for example, be no difference between `A` and `a`. 

## Example

```ts
const wordToMatch = "My name is Joe";
const codeWithoutFlag = "normal(joe)";
const codeWithFlag = "<ignoreCase> normal(joe)";

regCode.match(codeWithoutFlag, wordToMatch);    // null
regCode.match(codeWithFlag, wordToMatch);       // "Joe"
```

## Regex

```regex
//i
```

## Usage

`<ignoreCase>`
