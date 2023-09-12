<script setup>
import { useSlots } from 'vue'

defineProps({ title: { type: String, default: 'Reading Lists' } })

const slots = useSlots()
</script>

<template>
  <header>
    <slot name="icon"></slot>
    <h1 :class="{ ellipsis: !!slots.actions }">{{ title }}</h1>
    <slot name="actions"></slot>
  </header>
</template>

<style scoped>
header {
  align-items: center;
  background-color: var(--background-color-base);
  box-shadow: var(--box-shadow-drop-small);
  display: flex;
  height: var(--spacing-400);
  padding: 0 8px 0 24px;
  position: sticky;
  top: 0;
}

header h1 {
  font-family: var(--font-family-serif);
  font-size: var(--font-size-x-large);
  text-transform: capitalize;
}

.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 130px;
  overflow: hidden;
}
</style>
