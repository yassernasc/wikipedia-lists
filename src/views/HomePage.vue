<script setup>
import { onMounted } from 'vue'
import { useWikiStore } from '@/stores'

const store = useWikiStore()

const menuItems = [
  { label: 'Select', value: 'select' },
  { label: 'Update', value: 'update' },
  { label: 'Delete', value: 'delete' },
]

const onSelect = (list) => store.selectList(list.id)
const onMenuClick = ({ item, operation }) => {
  console.log({ list: item.id, operation })
}

onMounted(() => {
  if (store.lists.length === 0) {
    store.loadLists()
  }
})
</script>

<template>
  <Header />
  <List
    :items="store.lists"
    @item-select="onSelect"
    :menuItems="menuItems"
    @menu-click="onMenuClick"
  />
</template>
