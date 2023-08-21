<script setup>
import { CdxIcon } from '@wikimedia/codex'
import { cdxIconArrowPrevious as prevIcon } from '@wikimedia/codex-icons'

import { createTab } from '@/extension'
import { useWikiStore } from '@/stores'

const store = useWikiStore()

const menuItems = [
  { label: 'Select', value: 'select', disabled: true },
  { label: 'Move', value: 'move', disabled: true },
  { label: 'Delete', value: 'delete', disabled: true },
]

const onClick = ({ project, title }) => {
  const url = `${project}/wiki/${title}`
  createTab(url)
}
const onMenuClick = ({ item, operation }) => {
  console.log({ list: item.id, operation })
}
</script>

<template>
  <Header :title="store.selectedListName">
    <template v-slot:icon>
      <span class="icon" @click="store.deselectList">
        <cdx-icon :icon="prevIcon" />
      </span>
    </template>
  </Header>
  <List
    :items="store.articles"
    @item-select="onClick"
    :menuItems="menuItems"
    @menu-click="onMenuClick"
  />
</template>

<style scoped>
.icon {
  margin-right: 15px;
}
</style>
