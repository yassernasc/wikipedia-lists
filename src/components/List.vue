<script setup>
defineProps(['items'])
</script>

<template>
  <div v-for="item in items" :key="item.id">
    <h2>{{ item.name }}</h2>
  </div>
</template>

<style scoped>
div {
  padding: 15px 25px;
  border-bottom: 1px solid var(--divider);
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
