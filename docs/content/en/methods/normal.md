---
title: "normal()"
description: 'Docs on how to understand the normal method in regcode'
position: 20
category: 'methods'
features:
---

The `normal` method is probably the one you will use the most. It just matches anything within it. It will escape characters for you as well, meaning you don't have to think about writing `\` before `*`.

## Usage

`normal(PARAMETERS)`

## Example

```ts
const word = "Joee";
const code = "normal(Joe)"
// Match: "Joe"

const word = "regcode.com";
const code = "normal(regcode.[character]{2,3})"
// Match: "regcode.com"

const word = "Sweden";
const code = "normal(S[or]sweden)"
// Match: "Sweden"
```

## Regex

`normal` will just plainly translate into regex. `A` will be `a`, however, some characters will be escaped, like `.` which will become `\.`.
