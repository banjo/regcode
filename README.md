
<h1 align="center">
  <br>
  <a href="http://www.regcodejs.com"><img src="https://raw.githubusercontent.com/banjo/regcode/main/docs/static/regcode-logo-text.svg" alt="Regcode logo" width="200"></a>
</h1>

<h4 align="center">Create regular expressions easily with code</h4>

<p align="center">
  <a href="https://badge.fury.io/js/regcode">
    <img src="https://badge.fury.io/js/regcode.svg"
         alt="npm">
  </a>
</p>


<p align="center">
  <a href="https://docs.regcodejs.com" target="_blank">Docs</a> •
  <a href="https://www.regcodejs.com" target="_blank">Demo</a> •
  <a href="#heavy_check_mark-features">Features</a> •
  <a href="#examples">Examples</a> •
  <a href="#cloud-api-example">API</a> •
  <a href="#license">License</a>
</p>

---


![screenshot](https://raw.githubusercontent.com/banjo/regcode/main/docs/static/regcode-light.svg)


## :heavy_check_mark: Features

* Create Regular Expressions with code
* English-like syntax that is easy to read
* Easy to learn, easy to read
* Simple API
* Convert to Regex or match directly to a string
* Get started in minutes
* No need to learn Regex to create an expression

## :clipboard: Examples

These are some basic examples, there are many more examples over at our [docs](https://docs.regcodejs.com) page. You can also try it interactively [here](https://www.regcodejs.com).


```ts
// use values
const code = "[character]"
const regex = "/[A-Za-z\u00C0-\u017F]/"

// use logic
const code = "[character]{oneOrMore}][or][number]"
const regex = "/(?:[A-Za-z\u00C0-\u017F]+|\d)/"

// use methods
const code = "normal(H[or]hello) [whitespace] [character]{oneOrMore}"
const regex = "/(?:H|h)ello\s[A-Za-z\u00C0-\u017F]+/"
```

## :cloud: API Example

Install Regcode with NPM or Yarn.

```bash
# npm
npm install regcode --save

# yarn
yarn add regcode

```

Simply create the class and begin using it.

```ts
import { RegCode } from "regcode";

const regCode = new RegCode();
const code = "hasBefore(https://) normal(www.) [character]{any} normal(.com)[or]normal(.net)";
const sentenceToMatch = "The URL is https://www.regcodejs.com, here you go!";

// look for matches
const match = regCode.match(code, sentenceToMatch); // ["www.regcodejs.com"]

// or convert to regex and match the normal way
const regex = regCode.convert(code);
const match = sentenceToMatch.match(regex);         // ["www.regcodejs.com"]
```

## License

MIT
