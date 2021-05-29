---
title: "regex()"
description: 'Docs on how to understand the regex method in regcode'
position: 22
category: 'methods'
features:
---

The `regex` allows you to pass in your own regular expressions directly.

`regex` will **NOT** escape characters for you automatically.

## Usage

`regex(PARAMETERS)`

## Example

```ts
const word = "123";
const code = String.raw`regex(\d{3})`
// Match: "123"

const word = "Everything will be included";
const code = String.raw`regex(.*)`
// Match: "Everything will be included"

```

## Regex

`regex` will just copy over your parameters, as it expects valid regex as input.
