---
title: Syntax
description: 'Docs on how to understand RegCode - master Regular Expression easily with english like syntax'
position: 2
category: 'getting started'
features:
---

What makes `RegCode` special is the very simple syntax. Anyone with basic knowledge of coding and English will have no problems in understanding and creating *RegCode expressions*.

## Elements

A RegCode expression contains several definitions that will be held separate with a whitespace. The only not to use whitespace in between definitions is when you want to use a quantifier `{any}` or the or statement `[or]`.

Below, we will create a simple regcode that will match `the boy` or `the girl`, in which the first letter `t`'s casing does not matter.

```ts
// regcode
<matchAll> [start] normal(T[or]the) [whitespace]{1,2} exact(boy)[or]exact(girl) [end]

// regex
/^(T|t)he\s{1,2}((boy)|(girl))$/g
```



* **Flag** (e.g. `<matchAll>`): flags allow you to modify the settings of your search. This is often placed in the beginning of a RegCode statement.
* **Values** (e.g. `[start], [whitespace]`): represents different values, such as a whitespace, character, number or symbol. It can also be the start or end of a match.
* **Or** (e.g. `[or], [or{3}]`): or will let you choose between several values. In the case above, it will accept both `t` and `T` in `the`. When used in a function, it will only take the first character or value, not the whole sentence.
* **Method** (e.g. `normal(), exact()`): methods lets you pass in your own data to use. Most methods except for `regex()` will escape all characters for you as well.
* **Quantifiers** (e.g. `{1,2}`): how many times a value or method can occur. If no quantifier is specified, `1` will be standard. This particular quantifier means 1 to 2 times.
