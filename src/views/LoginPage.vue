<script setup>
import { CdxButton } from '@wikimedia/codex'
import { createTab } from '@/extension'

const wikipediaLoginURL = 'https://en.wikipedia.org/w/index.php?title=Special:UserLogin'
const repoURL = 'https://github.com/yassernasc/wikipedia-lists'

const openLoginPage = () => createTab(wikipediaLoginURL, true)
const openRepo = () => createTab(repoURL)
</script>

<template>
  <div class="container">
    <h1>Log in Needed</h1>

    <h2>Please go to the official Wikipedia website and Log in.</h2>

    <p>
      <span class="bold"> How this works? </span> <br />
      Once logged-in, session tokens will be stored in your browser which can be used by the
      extension. But don't worry, it's all safe, no information about you will be stored anywhere,
      and the extension is open-source.
    </p>

    <cdx-button
      class="login-btn"
      action="progressive"
      weight="primary"
      size="large"
      @click="openLoginPage"
    >
      Go to Log-in page
    </cdx-button>

    <cdx-button weight="quiet" @click="openRepo"> Extension code </cdx-button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
}

h1 {
  font-size: var(--font-size-xx-large);
  font-family: var(--font-family-serif);
  margin-bottom: 10px;
}

h2 {
  font-size: var(--font-size-large);
  text-align: center;
}

p {
  color: var(--color-placeholder);
  margin-top: 4px;
}

.login-btn {
  margin-top: 14px;
  margin-bottom: -10px;
}

.bold {
  color: var(--color-base);
  font-weight: bold;
}
</style>
