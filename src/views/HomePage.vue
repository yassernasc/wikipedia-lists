<script setup>
import { ref } from 'vue'
import { CdxIcon } from '@wikimedia/codex'
import { cdxIconAdd as addIcon, cdxIconReload as reloadIcon } from '@wikimedia/codex-icons'
import { useWikiStore } from '@/stores'
import ListForm from '@/components/ListForm.vue'
import DeleteList from '@/components/DeleteList.vue'
import iconURL from '../../assets/icon_48x48.png'

const wiki = useWikiStore()
const formRef = ref()
const deleteRef = ref()

const menuItems = [
  { label: 'Update', value: 'update' },
  { label: 'Delete', value: 'delete' },
]

const onCreate = () => formRef.value.open()
const onSelect = (list) => wiki.selectList(list.id)
const onMenuClick = ({ item, operation }) => {
  if (operation === 'update') {
    formRef.value.open(item)
  }

  if (operation === 'delete') {
    deleteRef.value.open(item)
  }
}
</script>

<template>
  <Header>
    <template v-slot:icon>
      <img :src="iconURL" />
    </template>
    <template v-slot:actions>
      <div class="actions" @click="wiki.deselectList">
        <cdx-icon class="icon" :icon="reloadIcon" @click="wiki.reloadLists" />
        <cdx-icon class="icon" :icon="addIcon" @click="onCreate" />
      </div>
    </template>
  </Header>
  <List
    :items="wiki.sortedLists"
    :menuItems="menuItems"
    @item-select="onSelect"
    @menu-click="onMenuClick"
  />
  <ListForm ref="formRef" />
  <DeleteList ref="deleteRef" />
</template>

<style scoped>
.actions {
  margin-left: auto;
  margin-right: 4px;
  display: flex;
  gap: 7px;
}

img {
  height: 26px;
  width: 26px;
  margin: 2px 10px 0 0;
}
</style>
