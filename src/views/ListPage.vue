<script setup>
import { CdxIcon } from '@wikimedia/codex'
import { cdxIconArrowPrevious as prevIcon } from '@wikimedia/codex-icons'

import { createTab } from '@/extension'
import { useWikiStore } from '@/stores'

const wiki = useWikiStore()

const menuItems = [
  { label: 'Select', value: 'select', disabled: true },
  { label: 'Move', value: 'move', disabled: true },
  { label: 'Delete', value: 'delete' },
]

const onClick = ({ project, title }) => {
  const url = `${project}/wiki/${title}`
  createTab(url)
}
const onMenuClick = ({ item, operation }) => {
  if (operation === 'delete') {
    const { id: articleId, listId } = item
    wiki.deleteArticle({ articleId, listId })
  }
}
</script>

<template>
  <Header :title="wiki.selectedListName">
    <template v-slot:icon>
      <span class="icon" @click="wiki.deselectList">
        <cdx-icon :icon="prevIcon" />
      </span>
    </template>
  </Header>
  <List
    :items="wiki.articles"
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
