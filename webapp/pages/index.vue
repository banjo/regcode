<template>
  <div class="container">
    <div class="sub">
      <info />

      <label for="regcode-input" class="form-label">Regcode</label>
      <div class="input-group mb-3 input">
        <input
          type="text"
          class="form-control"
          :placeholder="placeholder"
          id="regcode-input"
          aria-label="Regcode"
          aria-describedby="button-addon2"
          @change="convertToRegex($event)"
          v-model="regCode"
          :class="{
            'is-invalid': regCodeError && regCodeSubmitted,
            'is-valid': !regCodeError && regCodeSubmitted,
          }"
        />
        <div class="error-message" v-if="regCodeError">{{ regCodeError }}</div>
      </div>

      <label for="regex-result" class="form-label">Regex</label>
      <div class="input-group input mb-3">
        <input
          type="text"
          class="form-control"
          id="regex-result"
          aria-label="Regex"
          aria-describedby="button-addon2"
          v-model="regex"
          readonly
          value="Mark"
        />
      </div>

      <label for="regex-text" class="form-label">Text</label>
      <div class="input regex-text mb-3">
        <textarea
          id="regex-text"
          class="form-control"
          contenteditable="true"
          v-model="textToMatch"
          @input="convertToRegex($event)"
        ></textarea>
      </div>

      <div v-if="matches">
        <label for="match-group" class="form-label" v-if="matches.length !== 0">
          {{ matches.length > 1 ? 'Matches' : 'Match' }}
        </label>
        <label for="match-group" class="form-label" v-if="matches.length === 0">
          No matches
        </label>
        <div class="match-group">
          <div
            class="match-card"
            v-for="(match, index) in matches"
            :key="index"
          >
            {{ match }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RegCode } from 'regcode'
import Vue from 'vue'
import Info from '../components/Info.vue'

const regCode = new RegCode()

export default Vue.extend({
  components: { Info },
  data: function () {
    return {
      regCode: '',
      regCodeError: '',
      regCodeSubmitted: false,
      regex: '',
      placeholder: '<matchAll> hasBefore(https://) normal(www.) [character]{any} normal(.com)[or]normal(.net)' as string,
      textToMatch: 'The URL is https://www.regcodejs.com, here you go!',
      matches: [] as string[],
    }
  },
  methods: {
    convertToRegex: function (event: Event) {
      if (this.regCode.length === 0) {
        this.regCodeSubmitted = false
      } else {
        this.regCodeSubmitted = true
      }

      if (this.regCode === '') {
        this.regCode = this.placeholder
      }

      const matches = this.getMatches(this.regCode)

      if (matches == null) {
        this.matches = []
        this.regex = ''
        return
      }

      this.matches = matches
    },
    getMatches(code: string): string[] | undefined {
      let regexValue
      try {
        regexValue = regCode.convert(code)
        this.regCodeError = ''
      } catch (error) {
        this.regCodeError = error.message
        return
      }

      if (!regexValue) {
        console.error('No regex value')
        return
      }

      this.regex = regexValue.toString()
      const matches = this.textToMatch.match(regexValue)

      if (matches == null) {
        return []
      }

      return matches
    },
  },
  mounted() {
    const matches = this.getMatches(this.placeholder)

    if (matches) {
      this.matches = matches
    }
  },
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.sub {
  width: 100%;
  display: grid;
  place-items: center;
}

body {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.input {
  font-size: 14px !important;
  width: 80% !important;
}

.match-group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 50rem;
}

.match-card {
  margin: 0.4rem 1rem;
  color: #155724;
  padding: 0.5rem;
  border-radius: 0.2rem;
  background-color: #c3e6cb;
}

.error-message {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
</style>
