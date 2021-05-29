---
title: <multiline>
description: 'Docs on how to understand the multiline flag in regcode'
position: 1
category: 'flags'
features:
---

The multiline mode only affects the behaviour of the `[start]` and `[end]` values. In multiline mode they match not only the beginning and ending of a string, they also match the start or end of a line.

## Usage

`<multiline>`

## Example

```ts
const wordToMatch = `1st: Dave
2nd: Joe
3nd: Anne
`;
const codeWithoutFlag = "<matchAll> [start] [number]";
const codeWithFlag = "<multiline><matchAll> [start] [number]";

regCode.match(codeWithoutFlag, wordToMatch);    // "1"
regCode.match(codeWithFlag, wordToMatch);       // "1", "2", "3"
```

## Regex

```regex
//m
```
