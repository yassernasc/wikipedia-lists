<script setup>
import { ref } from 'vue'
import { CdxMenu, useGeneratedId } from '@wikimedia/codex'
import { onClickOutside } from '@vueuse/core'

defineProps(['items'])
const emit = defineEmits(['click'])

const menu = ref()
const menuId = useGeneratedId('menu')
const isOpen = ref(false)

const open = () => (isOpen.value = true)
onClickOutside(menu, (event) => (isOpen.value = false))

const onSelect = ({ value }) => emit('click', value)

defineExpose({ open })
</script>

<template>
  <CdxMenu
    class="menu"
    ref="menu"
    v-model:expanded="isOpen"
    :id="menuId"
    :menu-items="items"
    @menu-item-click="onSelect"
  />
</template>

<style scoped>
.menu {
  width: 100px;
  right: 0;
  left: auto;
}
</style>
