<template>
  <div class="pa-4 text-center">
    <v-dialog :model-value="props.showDialog" max-width="600">
      <v-card>
        <v-card-text>
          {{ 'Are you sure you want to delete this item?' }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="emit('close')"></v-btn>

          <v-btn color="primary" text="Confirm" variant="tonal" @click="emit('confirm')"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  showDialog: boolean
}>()

const emit = defineEmits(['close', 'confirm'])
</script>
