<script setup>
import { ref } from 'vue'
import { CdxIcon } from '@wikimedia/codex'
import { cdxIconArrowPrevious as prevIcon } from '@wikimedia/codex-icons'

import SelectList from '@/components/SelectList.vue'
import { createTab } from '@/extension'
import { useWikiStore } from '@/stores'

const wiki = useWikiStore()
const dialogRef = ref()

const menuItems = [
  { label: 'Move', value: 'move' },
  { label: 'Delete', value: 'delete' },
]

const onClick = ({ project, title }) => {
  const url = `${project}/wiki/${title}`
  createTab(url)
}
const onMenuClick = ({ item, operation }) => {
  const { id: articleId, listId } = item

  if (operation === 'delete') {
    wiki.deleteArticle({ articleId, listId })
  }

  if (operation === 'move') {
    dialogRef.value.open(articleId)
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
  <SelectList ref="dialogRef" />
</template>

<style scoped>
.icon {
  margin-right: 15px;
}
</style>
