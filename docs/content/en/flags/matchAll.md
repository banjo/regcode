---
title: <matchAll>
description: 'Docs on how to understand the matchAll flag in regcode'
position: 32
category: 'flags'
features:
---

The matchAll flag allows you to look for multiple occurrences of a match, instead of just one. 

## Usage

`<matchAll>`

## Example

```ts
const wordToMatch = "I am 25 years old";
const codeWithoutFlag = "[number]";
const codeWithFlag = "<matchAll> [number]";

regCode.match(codeWithoutFlag, wordToMatch);    // 2
regCode.match(codeWithFlag, wordToMatch);       // 25
```

## Regex

```regex
//g
```
