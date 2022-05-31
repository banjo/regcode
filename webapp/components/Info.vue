<template>
  <div>
    <img class="logo" src="regcode-logo-text.svg" alt="regcode logo" />

    <!-- <h1 class="title">regcode</h1> -->
    <h2 class="subtitle">Create regular expressions easily with code</h2>

    <div class="links">
      <a
        href="https://regcode-docs.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        class="btn primary-color"
      >
        Docs
      </a>
      <a
        href="https://regcode-docs.netlify.app/introduction/examples"
        target="_blank"
        rel="noopener noreferrer"
        class="btn secondary-color"
      >
        Examples
      </a>

      <a
        href="https://github.com/banjo/regcode"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-secondary"
      >
        GitHub
      </a>
      <a
        href="https://www.npmjs.com/package/regcode"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-outline-danger"
      >
        NPM
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 700;
  font-size: 40px;
  color: #00aeef;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 20px;
  color: #526488;
  word-spacing: 3px;
  padding-bottom: 5px;
}

.links {
  padding-top: 5px;
  padding-bottom: 20px;
}

.logo {
  width: 250px;
}

.primary-color {
  background-color: #00aeef;
  color: white;
}

.primary-color:hover {
  color: white;
  background-color: #098cbb;
}

.secondary-color {
  background-color: #2e3192;
  color: white;
}

.secondary-color:hover {
  background-color: #23256b;
  color: white;
}
</style>
