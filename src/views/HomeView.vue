<template>
  <div>
    <cdx-button action="progressive" weight="primary">Click me</cdx-button>
  </div>
</template>

<script>
import "../base.css"

import { defineComponent } from 'vue'
import { CdxButton } from '@wikimedia/codex'

export default defineComponent({ components: { CdxButton } })
</script>
