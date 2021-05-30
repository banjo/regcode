import { RegCode } from 'regcode'

export default (context, inject) => {
  inject('regcode', RegCode)
}
