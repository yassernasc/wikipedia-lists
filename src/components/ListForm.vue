<script setup>
import { ref, computed, watch } from 'vue'
import { CdxDialog, CdxTextInput } from '@wikimedia/codex'
import { useWikiStore } from '@/stores'

const wiki = useWikiStore()

const isOpen = ref(false)
const itemId = ref(null)
const form = ref({ name: '', description: '' })

const resetForm = () => {
  form.value = { name: '', description: '' }
  itemId.value = null
}

const open = (item) => {
  if (item) {
    const { id, name, description } = item
    itemId.value = id
    form.value = { name, description }
  }

  isOpen.value = true
}

watch(isOpen, (updatedIsOpen) => {
  if (!updatedIsOpen) {
    resetForm()
  }
})

const onPrimary = () => {
  if (itemId.value) {
    wiki.updateList({ id: itemId.value, form: form.value })
  } else {
    wiki.createList(form.value)
  }

  isOpen.value = false
}

const primaryAction = computed(() => ({
  label: 'OK',
  actionType: 'progressive',
  disabled: !form.value.name,
}))

const defaultAction = { label: 'Cancel' }

defineExpose({ open })
</script>

<template>
  <cdx-dialog
    v-model:open="isOpen"
    close-button-label="Close"
    :title="itemId ? 'Update list' : 'Create new list'"
    :primary-action-disabled="isOpen"
    :primary-action="primaryAction"
    :default-action="defaultAction"
    @primary="onPrimary"
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
