---
title: Introduction
description: 'Docs on how to understand RegCode - master Regular Expression easily with English like syntax'
position: 1
category: 'getting started'
features:
  - Create Regular Expressions with code
  - English-like syntax that is easy to read
  - Easy to learn, easy to read
  - Simple API
  - Convert to Regex or match directly to a string
  - Get started in minutes
  - No need to learn Regex to create an expression
---

Create Regular Expressions easily with code. By using a simple, English-like syntax, you can create any expression you want without actually knowing Regular Expressions. Use the `Regcode API` to match against a string directly or convert it to Regex.

<img src="/regcode-light.svg" class="light-img" width="1280" height="640" alt=""/>
<img src="/regcode-dark.svg" class="dark-img" width="1280" height="640" alt=""/>

<alert type="info">

You can try it out yourself [here](https://www.regcodejs.com).

</alert>

## Features

<list :items="features"></list>

## Regcode Example

To show the simplicity of Regcode, here is a basic example of what you could do without any effort. As well as the much more advanced regex it will generate. This is regcode for a simple URL.

`hasBefore(https://) normal(www.) [character]{any} normal(.com)[or]normal(.net)`

By running this using the **Regcode API**, you will generate a fully working Regex code that you can use anywhere.

`/(?<=https:\/\/)www\.[A-Za-z\u00C0-\u017F]*(?:\.com|\.net)/`

This can then be used to match with a string. For example, this string.

`The url is https://www.regcodejs.com, here you go!`

By running the regex (or regcode) statement on this string, it will return all matches it has found, resulting in the line below.

`www.regcodejs.com`

## API Example

This exact example can be demonstrated using the `Regcode API`.


```ts
const regCode = new RegCode();
const code = "hasBefore(https://) normal(www.) [character]{any} normal(.com)[or]normal(.net)";
const sentenceToMatch = "The url is https://www.regcodejs.com, here you go!";

// look for matches
const match = regCode.match(code, sentenceToMatch);

// or convert to regex and match the normal way
const regex = regCode.convert(code);
const match = sentenceToMatch.match(regex);
```

## Explanation


The example above is a very simple one. The `convert` method will return a regex statement that you can use any way you like. If you only want to find a match directly, you can do that using the `match` method.

The match for this particular regcode looks like this.

<img src="/syntax-explanation-light.png" class="light-img" width="1280" height="640" alt=""/>
<img src="/syntax-explanation-dark.png" class="dark-img" width="1280" height="640" alt=""/>

* `hasBefore(https://)` - the match has to have `https://` before, but it will not be included in the match.
* `normal(www.)` - will look for `www.` in a row.
* `[character]{any}` - will look for any international character, 0 or any times.
* `normal(.com)[or]normal(.net)` - will match either `.com` or `.net`.
