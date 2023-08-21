<script setup>
import { ref, computed, watch } from 'vue'
import { CdxDialog, CdxSelect } from '@wikimedia/codex'
import { useWikiStore } from '@/stores'

const wiki = useWikiStore()

const isOpen = ref(false)
const list = ref({})

const title = computed(() => `Delele ${list.value.name} list?`)
const primaryAction = { label: 'Yes', actionType: 'destructive' }
const defaultAction = { label: 'Cancel' }

const open = (listData) => {
  list.value = listData
  isOpen.value = true
}

const onPrimary = () => {
  isOpen.value = false
  wiki.deleteList(list.value.id)
}

watch(isOpen, (updatedIsOpen) => {
  if (!updatedIsOpen) {
    list.value = {}
  }
})

defineExpose({ open })
</script>

<template>
  <cdx-dialog
    v-model:open="isOpen"
    close-button-label="Close"
    :title="title"
    :stacked-actions="true"
    :primary-action="primaryAction"
    :default-action="defaultAction"
    @primary="onPrimary"
    @default="isOpen = false"
  />
</template>
