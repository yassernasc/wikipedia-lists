<script setup>
import { ref, onMounted, defineComponent } from 'vue'
import { CdxButton } from '@wikimedia/codex'
import { getLists } from '@/api'

const lists = ref([])

onMounted(() => {
  const loadLists = async () => (lists.value = await getLists())
  loadLists()
})
</script>

<template>
  <Header />
  <List :items="lists" />
</template>
