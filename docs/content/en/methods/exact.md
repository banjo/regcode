---
title: "exact()"
description: 'Docs on how to understand the exact method in regcode'
position: 21
category: 'methods'
features:
---

The `exact` method works almost the same as the `normal` method, except it wraps your statement into brackets `()`, so it will match exactly what's in them. Often the `normal` method is better.

`exact` will escape characters for you automatically.

## Usage

`exact(PARAMETERS)`

## Example

```ts
const word = "Joee";
const code = "exact(Joe)"
// Match: "Joe"

const word = "21-01-01 is same as 21/01/01";
const code = "exact([number]{2}-[number]{2}-[number]{2})"
// Match: "21-01-01"

```

## Regex

`exact` will just plainly translate into regex. `A` will be `a`, however, some characters will be escaped, like `.` which will become `\.`.
