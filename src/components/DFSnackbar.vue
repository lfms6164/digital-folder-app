<template>
  <div>
    <v-snackbar
      v-for="snackbar in snackbarStore.snackbars"
      :key="snackbar.id"
      v-model="snackbar.visible"
      :color="snackbar.color"
      variant="elevated"
    >
      <v-icon class="me-2">{{ `mdi-${snackbar.icon}` }}</v-icon>

      {{ snackbar.text }}

      <template v-slot:actions>
        <v-btn icon="mdi-close" variant="plain" @click="snackbarStore.hideSnackBar(snackbar.id)" />
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { useSnackbarStore } from '../stores/snackbarStore'

const snackbarStore = useSnackbarStore()
</script>
