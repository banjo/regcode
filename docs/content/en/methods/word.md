---
title: "word()"
description: 'Docs on how to understand the word method in regcode'
position: 29
category: 'methods'
features:
---

The `word` method will match the word you put in as parameter. Meaning it must be surrounded by whitespaces.

`word` will escape characters for you automatically.

## Usage

`word(PARAMETERS)`

## Example

```ts
const word = "Is this rule3 or rule4?";
const code = "<matchAll> word(rule[number])"
// Match: "rule3", "rule4"
```

## Regex

`word` will just plainly translate into regex. `A` will be `a`, however, some characters will be escaped, like `.` which will become `\.`.
