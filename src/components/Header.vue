<script setup>
defineProps({ title: { type: String, default: 'Reading Lists' } })
</script>

<template>
  <header>
    <slot name="icon"></slot>
    <h1>{{ title }}</h1>
    <slot name="actions"></slot>
  </header>
</template>

<style scoped>
header {
  align-items: center;
  background-color: var(--background-color-base);
  border-bottom: var(--border-base);
  display: flex;
  height: var(--spacing-400);
  padding: 0 8px 0 24px;
  position: sticky;
  top: 0;
}

header h1 {
  font-family: var(--font-family-serif);
  font-size: var(--font-size-x-large);

  text-overflow: ellipsis;
  white-space: nowrap;
  width: 140px;
  overflow: hidden;
}
</style>
