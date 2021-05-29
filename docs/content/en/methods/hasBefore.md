---
title: "hasBefore()"
description: 'Docs on how to understand the hasBefore method in regcode'
position: 27
category: 'methods'
features:
---

The `hasBefore` method will match anything after what you write as input argument, and it **WILL NOT** include the argument in the search.

`hasBefore` will escape characters for you automatically.

## Usage

`hasBefore(PARAMETERS)`

## Example

```ts
const word = "https://www.regcodejs.com";
const code = "hasBefore(https://) [character]{any} normal(.com)"
// Match: "www.regcodejs.com"

```

## Regex

`hasBefore` will just plainly translate into regex. `A` will be `a`, however, some characters will be escaped, like `.` which will become `\.`.
