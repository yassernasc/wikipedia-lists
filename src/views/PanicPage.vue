<script setup>
import { useRoute } from 'vue-router'
import { CdxMessage } from '@wikimedia/codex'

const route = useRoute()
</script>

<template>
  <div class="container">
    <cdx-message type="error">
      <p><strong>An error has occurred.</strong></p>
      <p>{{ route.query.message }}</p>
      <p>Please send an error report.</p>
    </cdx-message>
  </div>
</template>

<style scoped>
strong {
  font-weight: bold;
}

.container {
  display: flex;
  align-items: center;

  margin: 14px;
  height: 55vh;
}
</style>
