<script setup>
defineProps(['items', 'menuItems'])
const emit = defineEmits(['item-select', 'menu-click'])
</script>

<template>
  <Card v-for="item in items" :key="item.id" :item="item" :emit="emit" :menuItems="menuItems" />
</template>
