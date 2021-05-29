---
title: "hasAfter()"
description: 'Docs on how to understand the hasAfter method in regcode'
position: 25
category: 'methods'
features:
---

The `hasAfter` method will match anything before what you write as input argument, and it **WILL NOT** include the argument in the search.

`hasAfter` will escape characters for you automatically.

## Usage

`hasAfter(PARAMETERS)`

## Example

```ts
const word = "hello@gmail.com";
const code = "[character]{any} hasAfter(@gmail.com)"
// Match: "hello"

```

## Regex

`hasAfter` will just plainly translate into regex. `A` will be `a`, however, some characters will be escaped, like `.` which will become `\.`.
