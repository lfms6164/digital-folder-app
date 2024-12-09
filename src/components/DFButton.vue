<template>
  <v-btn :icon="icon" :text="text" />
</template>

<script setup lang="ts">
defineProps<{ icon?: string; text?: string }>()
</script>
