---
title: Examples
description: 'Examples to easily get you started with regcode'
position: 3
category: 'getting started'
features:
---

Below are some simple examples that show you how simple `Regcode` is to yse, both for the one creating it, but also the one reading it. They are at a basic level, but will still showcase the difference between `Regcode` and `Regex`.

## Simple email

Matching email with Regex is no easy task, and this should be no means be used to match emails in production. But it gets the job done with basic email addresses. And the syntax is much easier to understand than the regex statement.

**Regcode**

```ts
// regcode
<matchAll><multiline> [character][or][number][or]oneOf(._+-)[or{any}] normal(@) [character]{any} normal(.) [character]{2,6}

// regex
/([A-Za-z\u00C0-\u017F]|\d|[\._\+\-])*@[A-Za-z\u00C0-\u017F]*\.[A-Za-z\u00C0-\u017F]{2,6}/gm
```


**String to search**

```txt
hello@regcodejs.com is a valid email, so is admin@regcodejs.com. But not hello123@regcodejs.c. 
```

**Match**

```ts
[
    "hello@regcodejs.com",
    "admin@regcodejs.com"
]
```

## URL

Say that you want to grab a somewhat specific URL. Regcodes make that easy for you. We want to match the URL `regcodejs.com` with the subdomain, which might be something like `docs` or `staging`. 

Besides that, we don't want to include the `https://` before or the `.<whatever>` that comes after.

**Regcode**

```ts
// regcode
<matchAll> hasBefore(https://) [character]{any} normal(.) [character]{any} hasAfter(.[character]{2,6});

// regex
/(?<=https:\/\/)[A-Za-z\u00C0-\u017F]*\.[A-Za-z\u00C0-\u017F]*(?=\.[A-Za-z\u00C0-\u017F]{2,6})/g
```


**String to search**

```txt
We are looking for the URL https://docs.regcodejs.com. But we don't want to include https://regcodejs.com.
```

**Match**

```ts
[
    "docs.regcodejs",
]
```

## Date

This partcilar regcode will accept two date formats: `2021-01-01` or `21-01-01`.

**Regcode**

```ts
// regcode
<matchAll> exact([number]{4}-[number]{2}-[number]{2})[or]exact([number]{2}-[number]{2}-[number]{2})

// regex
/((\d{4}-\d{2}-\d{2})|(\d{2}-\d{2}-\d{2}))/g
```

**String to search**

```txt
2021-05-02 or 20-05-02, but not 2020/05/02.```
```

**Match**

```ts
[
    "2021-05-02",
    "20-05-02"
]
```
