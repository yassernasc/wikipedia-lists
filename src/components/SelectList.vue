<script setup>
import { ref, computed, watch } from 'vue'
import { CdxDialog, CdxSelect } from '@wikimedia/codex'
import { useWikiStore } from '@/stores'

const wiki = useWikiStore()

const isOpen = ref(false)
const articleId = ref(null)
const selectedList = ref(null)

const open = (id) => {
  articleId.value = id
  isOpen.value = true
}

const onPrimary = () => {
  isOpen.value = false

  wiki.moveArticle({
    articleId: articleId.value,
    currentListId: wiki.selectedList,
    newListId: selectedList.value,
  })
}

watch(isOpen, (updatedIsOpen) => {
  if (!updatedIsOpen) {
    selectedList.value = null
  }
})

const menuItems = computed(() =>
  wiki.lists.map((l) => ({
    label: l.name,
    value: l.id,
    disabled: l.id === wiki.selectedList,
  })),
)

const primaryAction = computed(() => ({
  label: 'OK',
  actionType: 'progressive',
  disabled: !selectedList.value,
}))

const defaultAction = { label: 'Cancel' }

defineExpose({ open })
</script>

<template>
  <cdx-dialog
    v-model:open="isOpen"
    close-button-label="Close"
    title="Move to.."
    :primary-action-disabled="isOpen"
    :primary-action="primaryAction"
    :default-action="defaultAction"
    @primary="onPrimary"
    @default="isOpen = false"
  >
    <cdx-select
      v-model:selected="selectedList"
      default-label="Choose a list"
      :menu-config="{ visibleItemLimit: 6 }"
      :menu-items="menuItems"
    />
  </cdx-dialog>
</template>
