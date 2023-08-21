<script setup>
import { ref, computed, watch } from 'vue'
import { CdxDialog, CdxTextInput } from '@wikimedia/codex'
import { useWikiStore } from '@/stores'

const wiki = useWikiStore()

const isOpen = ref(false)
const open = () => (isOpen.value = true)
const form = ref({ name: '', description: '' })
const resetForm = () => (form.value = { name: '', description: '' })
watch(isOpen, (updatedIsOpen) => {
  if (!updatedIsOpen) {
    resetForm()
  }
})

const primaryAction = computed(() => ({
  label: 'OK',
  actionType: 'progressive',
  disabled: !form.value.name,
}))

const defaultAction = { label: 'Cancel' }

const onCreate = () => {
  wiki.createList(form.value)
  isOpen.value = false
}

defineExpose({ open })
</script>

<template>
  <cdx-dialog
    v-model:open="isOpen"
    title="Create new list"
    close-button-label="Close"
    :primary-action-disabled="isOpen"
    :primary-action="primaryAction"
    :default-action="defaultAction"
    @primary="onCreate"
    @default="isOpen = false"
  >
    <form>
      <cdx-text-input v-model="form.name" placeholder="My reading list" />
      <cdx-text-input v-model="form.description" placeholder="Description (optional)" />
    </form>
  </cdx-dialog>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
