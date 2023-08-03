<script setup>
import { ref, onMounted, defineComponent } from 'vue'
import { CdxButton } from '@wikimedia/codex'
import { useCounterStore } from '@/stores'
import { getLists } from '@/api'

const lists = ref([])

onMounted(() => {
  const loadLists = async () => (lists.value = await getLists())
  loadLists()
})

const counter = useCounterStore()
</script>

<template>
  <div>
    <div>
      <h1>Reading Lists</h1>
      <p>{{ counter.count }}</p>
    </div>
    <ul>
      <li v-for="list in lists">
        {{ list.name }}
      </li>
    </ul>
  </div>
</template>
