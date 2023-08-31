<script setup>
import { ref } from 'vue'
import { CdxIcon, CdxMenu, useGeneratedId } from '@wikimedia/codex'
import { cdxIconEllipsis as dotsIcon } from '@wikimedia/codex-icons'
import Menu from '@/components/Menu.vue'

defineProps(['item', 'emit', 'menuItems'])

const menuRef = ref()
const openMenu = () => menuRef.value.open()
</script>

<template>
  <div class="card">
    <div class="text-container" @click="emit('item-select', item)">
      <h2 class="card-title">{{ item.title ?? item.name }}</h2>
    </div>
    <cdx-icon class="icon" :icon="dotsIcon" @click="openMenu" />
  </div>
  <Menu
    ref="menuRef"
    :items="menuItems"
    @click="(operation) => emit('menu-click', { operation, item })"
  />
</template>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--background-color-interactive);
}

.card-title {
  font-weight: var(--font-weight-semi-bold);
  line-height: var(--line-height-small);
}

.text-container {
  width: 100%;
  cursor: pointer;
}

.text-container h2 {
  padding: 15px 10px 15px 25px;
}

.icon {
  margin-right: 10px;
}
</style>
