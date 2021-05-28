---
title: Introduction
description: 'Docs on how to understand RegCode - master Regular Expression easily with English like syntax'
position: 1
category: 'getting started'
features:
  - Create Regular Expressions without any effort
  - English-like syntax that is easy to read
  - Simple API
  - Convert to Regex or match directly
  - Get started in minutes
---

Create Regular Expressions easily with `RegCode`, using a simple, English-like, syntax. Use the `RegCode API` to match against a string directly or convert it to Regex.

## Features

<list :items="features"></list>


## Example

```ts
const regCode = new RegCode();
const code =
    "hasBefore(https://) normal(www.) [character]{any} normal(.com)[or]normal(.net)";
const sentenceToMatch = "The url is https://www.regcodejs.com, here you go!";

// look for matches
const match = regCode.match(code, sentenceToMatch);

// or convert to regex and match the normal way
const regex = regCode.convert(code);
const match = sentenceToMatch.match(regex);
```

#### Regcode
`hasBefore(https://) normal(www.) [character]{any} normal(.com)[or]normal(.net)`

#### Regex
`/(?<=https:\/\/)www\.[A-Za-z\u00C0-\u017F]*(\.com|\.net)/`

#### Match
`["www.regcodejs.com"]`

## Explanation


The example above is a very simple one. The `convert` method will return a regex statement that you can use any way you like. If you only want to find a match directly, you can do that using the `match` method.


<img src="/syntax-explanation-light.png" class="light-img" width="1280" height="640" alt=""/>
<img src="/syntax-explanation-dark.png" class="dark-img" width="1280" height="640" alt=""/>

* `hasBefore(https://)` - the match has to have `https://` before, but it will not be included in the match.
* `normal(www.)` - will look for `www.` in a row.
* `[character]{any}` - will look for any international character, 0 or any times.
* `normal(.com)[or]normal(.net)` - will match either `.com` or `.net`.