<script setup>
import { ref, onMounted } from 'vue'
import { CdxIcon, CdxButton } from '@wikimedia/codex'
import { cdxIconArrowPrevious as prevIcon } from '@wikimedia/codex-icons'

import SelectList from '@/components/SelectList.vue'
import { createTab, getCurrentTabUrl } from '@/extension'
import { useWikiStore } from '@/stores'

const wiki = useWikiStore()
const currentTabIsWikipedia = ref(false)
const dialogRef = ref()

onMounted(async () => {
  const url = await getCurrentTabUrl()
  if (url.includes('wikipedia') && url.includes('/wiki/')) {
    currentTabIsWikipedia.value = true
  }
})

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

const onAddCurrentUrl = async () => {
  await wiki.addCurrentUrl()
  currentTabIsWikipedia.value = false
}
</script>

<template>
  <Header :title="wiki.selectedListName">
    <template v-slot:icon>
      <span class="icon" @click="wiki.deselectList">
        <cdx-icon :icon="prevIcon" />
      </span>
    </template>

    <template v-slot:actions v-if="currentTabIsWikipedia">
      <cdx-button class="add-button" action="progressive" weight="quiet" @click="onAddCurrentUrl"
        >Add current tab</cdx-button
      >
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

.add-button {
  margin-left: auto;
  margin-right: -10px;
  transform: scale(0.85);
}
</style>
