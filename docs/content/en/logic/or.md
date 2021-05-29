---
title: "Or"
description: 'Docs on how to understand the or statement in regcode'
position: 6
category: 'logic'
features:
---

Or is used when you have multiple values and you want to match at least with one of them.

## Usage

`STATEMENT[or]STATEMENT[or{3}]`

## Example

```ts
const word = "abc123";
const code = "[character][or][number][or{6}]"    
// Match: "abc123"

const word = "Phone: 123";
const code = "normal(Phone: [number]{2,4}[or][number]{7})" 
// Match: "Phone: 123"

const word = "The boy";
const code = "normal(T[or]the boy)" 
// Match: "The boy"             

const word = "This is the 1st time with abc for me."
const code = "<matchAll> [number][or]normal(abc)[or]normal(def)"
// Match: "1", "abc"

```

## Information

Everything that you want to be included in an or-statement must be **WITHOUT** whitespaces (`[number][or][character]`). 

Or can be used outside of methods, and will wrap everything into one big statement. (`[number][or][character][or]normal(123)`)

It can also be used within method parameters. Take this example: 

```
normal([number][or]hello)
```

It will only wrap `[number]` on the left side and `h` on the right side. Meaning `number or h, followed by ello`. 

Or-statements have their own quantifiers (`[or{...}]`), so that you can allow for how many times that particular match can occur. It needs to be wrapped at the end of the statement.

```
[number][or][character][or{4}]
```

## Regex

```regex
|
```
