<script setup>
import { useWikiStore } from '@/stores'

const store = useWikiStore()

const onSelect = (list) => store.selectList(list.id)
if (store.lists.length === 0) {
  store.loadLists()
}
</script>

<template>
  <Header />
  <List :items="store.lists" :callback="onSelect" />
</template>
