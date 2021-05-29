---
title: <dotAll>
description: 'Docs on how to understand the dotAll flag in regcode'
position: 1
category: 'flags'
features:
---

The `[any]`value (or `.` in regex) in regcode matches almost anything, except for newlines (`[newline]` in regcode, `\n` in regex). the dotAll flag allows `[any]` to match newlines as well.

## Usage

`<dotAll>`

## Example

```ts
const wordToMatch = "A\nB";
const codeWithoutFlag = "normal(A[any]B)";
const codeWithFlag = "<dotAll> normal(A[any]B)";

regCode.match(codeWithoutFlag, wordToMatch);    // null
regCode.match(codeWithFlag, wordToMatch);       // "A\nB"
```

## Regex

```regex
//s
```
