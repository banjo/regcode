---
title: "notBefore()"
description: 'Docs on how to understand the notBefore method in regcode'
position: 28
category: 'methods'
features:
---

The `notBefore` method will match anything that does not have the input argument before.

`notBefore` will escape characters for you automatically.

## Usage

`notBefore(PARAMETERS)`

## Example

```ts
const word = "How about 5 for $7?";
const code = "<matchAll> notBefore($) [number]"
// Match: "5"

```

## Regex

`notBefore` will just plainly translate into regex. `A` will be `a`, however, some characters will be escaped, like `.` which will become `\.`.
