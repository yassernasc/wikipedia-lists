<script setup>
import { CdxIcon } from '@wikimedia/codex'
import { cdxIconArrowPrevious as PrevIcon } from '@wikimedia/codex-icons'

import { useWikiStore } from '@/stores'

const store = useWikiStore()

const onClick = ({ project, title }) => {
  const url = `${project}/wiki/${title}`
  chrome.tabs.create({ url })
}
</script>

<template>
  <Header :title="store.selectedListName">
    <template v-slot:icon>
      <span class="icon" @click="store.deselectList">
        <CdxIcon :icon="PrevIcon" />
      </span>
    </template>
  </Header>
  <List :items="store.articles" :callback="onClick" />
</template>

<style scoped>
.icon {
  margin-right: 15px;
  cursor: pointer;
}
</style>
