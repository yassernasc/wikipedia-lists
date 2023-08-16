<script setup>
import { useWikiStore } from '@/stores'

const store = useWikiStore()
store.loadLists()
</script>

<template>
  <List :items="store.lists" />
</template>
