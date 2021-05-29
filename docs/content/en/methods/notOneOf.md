---
title: "notOneOf()"
description: 'Docs on how to understand the notOneOf method in regcode'
position: 24
category: 'methods'
features:
---

The `notOneOf` method will match anything but one of any character, number, or symbol you pass in as arguments.

`notOneOf` will escape characters for you automatically.

## Usage

`notOneOf(PARAMETERS)`

## Example

```ts
const word = "What's the time?";
const code = "<matchAll> notOneOf([number][character][whitespace])"
// Match: "'", "?"
```

## Regex

`notOneOf` will just plainly translate into regex. `A` will be `a`, however, some characters will be escaped, like `.` which will become `\.`.
