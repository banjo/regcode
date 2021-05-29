---
title: "oneOf()"
description: 'Docs on how to understand the oneOf method in regcode'
position: 23
category: 'methods'
features:
---

The `oneOf` method will match one of any character, number, or symbol you pass in as arguments.

`oneOf` will escape characters for you automatically.

## Usage

`oneOf(PARAMETERS)`

## Example

```ts
const word = "Two is 2";
const code = "oneOf(123)"
// Match: "2"

const word = "Dave should save";
const code = "oneOf(Ds) normal(ave)"
// Match: "Dave"
```

## Regex

`oneOf` will just plainly translate into regex. `A` will be `a`, however, some characters will be escaped, like `.` which will become `\.`.
