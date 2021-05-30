import { RegCode } from 'regcode'

export function getMatches(code, textToMatch) {
  const regexValue = regCode.convert(code)

  // TODO: handle regex
  if (!regexValue) {
    console.log('No regex value')
    return
  }

  this.regex = regexValue.toString()
  const matches = textToMatch.match(regexValue)

  // TODO: handle matches
  if (!matches) {
    console.log('no matches')
    return
  }

  return matches
}
