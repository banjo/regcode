---
title: Syntax
description: 'Docs on how to understand RegCode - master Regular Expression easily with english like syntax'
position: 2
category: 'getting started'
features:
---

What makes `Regcode` special is the simple syntax. Anyone with basic knowledge of coding and English will have no problems in understanding and creating *Regcode expressions*.

## Elements

A Regcode expression contains several definitions that will be held separate with whitespaces. These contain definitions like `methods`, `flags`, `quantifiers` and `values`. It looks something like this.

```
<flag> method(parameter)[or][value] [value]{quantifier}
```

Tihs simple syntax allows you to create your own expression in a matter of minutes. The example below will match `the boy` or `the girl`, in which the first letter `t`'s casing does not matter.

```ts
// regcode
<matchAll> [start] normal(T[or]the) [whitespace]{1,2} exact(boy)[or]exact(girl) [end]

// regex
/^(T|t)he\s{1,2}((boy)|(girl))$/g
```

### Flags

<alert type="info">

`<matchAll>`, `<unicode>`, `<multiline>` and more...

</alert>

Flags allow you to modify the settings of your search. This is often placed in the beginning of a Regcode statement.

### Values

<alert type="info">

`[number]`, `[character]`, `[whitespace]`, `[start]` and more...

</alert>

One of the most important part of regcode. Represents the base values you can use in a statement. It is possible to place them directly in the code or as arguments to methods.
### Methods

<alert type="info">

`normal()`, `exact()`, `regex()`, `oneOf()` and more...

</alert>

Methods lets you pass in your own data to use. All different method does different thing with your arguments. Most methods will escape characters (like `.`) for you as well, so you don't have to worry about it.

### Quantifiers

<alert type="info">

`{3}`, `{any}`, `{optional}`, `{optional-short}` and more...

</alert>

A quantifer can be appended to most types, as it quantifies how many times it can occur. There are several different ways to write them. The most important part is that you place them directly after the statement, without space.

* `[number]{3}` - a number 3 times.
* `[number]{2,4}` - a number 2 to 4 times.
* `[number]{optional}` - a number exactly 0 or 1 time.
* `[number]{any}` - a number 0 or more times.
* `[number]{oneOrMore}` - a number 1 or more times.

The three quantifiers `optional`, `any` and `oneOrMore` will as a standard match the longest sentence it will find. If you want to find the shortest match instead, use the `shortest` (or `short` or `shorter`) appended to the end.

* `[number]{optional-shortest}` - a number exactly 0 or 1 time.
* `[number]{any-shortest}` - a number 0 or more times.
* `[number]{oneOrMore-shortest}` - a number 1 or more times.


### Or

<alert type="info">

`[or]` and `[or{2}]`

</alert>

Or will let you choose to match between two or more alternatives. It can be used both directly in the statement or as method parameters. 

All or-statements needs to be chained together without whitespace, like so:

```txt
[number][or]oneOf(abc)
```

In case you want to use a quantifier on a full or-statement, use the `[or{quantifer}]` syntax.

```txt
[number][or]oneOf(abc)[or{3}]
```
