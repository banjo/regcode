---
title: "Quantifers"
description: 'Docs on how to understand quantifiers in regcode'
position: 7
category: 'logic'
features:
---

A quantifer can be appended to most types, as it quantifies how many times it can occur. There are several different ways to write them. The most important part is that you place them directly after the statement, without space.
## Usage

`STATEMENT{any}`

## Example

```ts
const word = "Joee";
const code = "normal(Jo) normal(e){any}"
// Match: "Joee"

const word = "Joeee but with way too many e's";
const code = "normal(Jo) normal(e){any-shortest}" 
// Match: "Joe"

const word = "https://www.regcodejs.com is same as www.regcodejs.com";
const code = "<matchAll> normal(https://){optional} normal(www.regcodejs.com)" 
// Match: "https://www.regcodejs.com", "www.regcodejs.com"

const word = "123455555"
const code = "normal(1234) [number]{2,5}"
// Match: "123455555"

const word = "123455555"
const code = "normal(1234) [number]{2,5-shortest}"
// Match: "123455"
```

## Information

Quantifiers can be written both as numbers (`{3}, {2,3}`) or with code (`{any}, {optional}`)

* `[number]{3}` - a number 3 times.
* `[number]{2,4}` - a number 2 to 4 times.
* `[number]{optional}` - a number exactly 0 or 1 time.
* `[number]{any}` - a number 0 or more times.
* `[number]{oneOrMore}` - a number 1 or more times.

The three quantifiers `optional`, `any` and `oneOrMore` will as a standard match the longest sentence it will find. If you want to find the shortest match instead, use the `shortest` (or `short` or `shorter`) appended to the end.

* `[number]{optional-shortest}` - a number exactly 0 or 1 time.
* `[number]{any-shortest}` - a number 0 or more times.
* `[number]{oneOrMore-shortest}` - a number 1 or more times.


## Regex

Quantifiers can be showed in many different ways.
- `{2,4}` -> `{2,4}`
- `{3-shortest}` -> `{3}?` 
- `{any}` -> `*`
- `{optional}` -> `?`
