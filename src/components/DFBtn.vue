<template>
  <v-tooltip :text="tooltip" location="top">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="tooltip ? props : null"
        v-ripple="false"
        :color="color"
        :icon="icon"
        :disabled="disabled"
        :readonly="readonly"
        variant="text"
        @click="emit('onClick')"
      />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
defineProps<{
  tooltip?: string
  color?: string
  icon?: string
  disabled?: boolean
  readonly?: boolean
}>()

const emit = defineEmits(['onClick'])
</script>
