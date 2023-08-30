<script setup>
import Card from '@/components/Card.vue'

defineProps(['items', 'menuItems'])
const emit = defineEmits(['item-select', 'menu-click'])
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item.id">
      <Card :item="item" :emit="emit" :menuItems="menuItems" />
    </li>
  </TransitionGroup>
</template>

<style scoped>
.list-move,
.list-enter-active {
  transition: all var(--transition-duration-base) var(--transition-timing-function-user);
}

.list-leave-active {
  transition: all var(--transition-duration-medium) var(--transition-timing-function-user);
}

.list-leave-to {
  opacity: 0;
}
</style>
