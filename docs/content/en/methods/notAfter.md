---
title: "notAfter()"
description: 'Docs on how to understand the notAfter method in regcode'
position: 26
category: 'methods'
features:
---

The `notAfter` method will match anything that does not have the input argument after.

`notAfter` will escape characters for you automatically.

## Usage

`notAfter(PARAMETERS)`

## Example

```ts
const word = "2$?! for 5?";
const code = "<matchAll> [number]{oneOrMore} notAfter($)"
// Match: "5"

```

## Regex

`notAfter` will just plainly translate into regex. `A` will be `a`, however, some characters will be escaped, like `.` which will become `\.`.
