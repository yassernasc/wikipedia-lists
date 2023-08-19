<script setup>
import { useAuthStore } from '@/stores'

const auth = useAuthStore()
auth.authenticate()
</script>

<template>
  <p>Loading...</p>
</template>
