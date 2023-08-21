<script setup>
import { ref } from 'vue'
import { CdxIcon } from '@wikimedia/codex'
import { cdxIconAdd as addIcon, cdxIconReload as reloadIcon } from '@wikimedia/codex-icons'
import { useWikiStore } from '@/stores'
import CreateList from '@/components/CreateList.vue'

const wiki = useWikiStore()

const dialogRef = ref()

const menuItems = [
  { label: 'Select', value: 'select', disabled: true },
  { label: 'Update', value: 'update', disabled: true },
  { label: 'Delete', value: 'delete' },
]

const onCreate = () => dialogRef.value.open()
const onSelect = (list) => wiki.selectList(list.id)
const onMenuClick = ({ item, operation }) => {
  if (operation === 'delete') {
    wiki.deleteList(item.id)
  }
}
</script>

<template>
  <Header>
    <template v-slot:actions>
      <div class="actions" @click="wiki.deselectList">
        <cdx-icon class="icon" :icon="reloadIcon" @click="wiki.reloadLists" />
        <cdx-icon class="icon" :icon="addIcon" @click="onCreate" />
      </div>
    </template>
  </Header>
  <List
    :items="wiki.lists"
    :menuItems="menuItems"
    @item-select="onSelect"
    @menu-click="onMenuClick"
  />
  <CreateList ref="dialogRef" />
</template>

<style scoped>
.actions {
  margin-left: auto;
  margin-right: 4px;
  display: flex;
  gap: 7px;
}
</style>
