<template>
  <div class="pa-4 text-center">
    <v-dialog
      :model-value="props.showDialog"
      class="d-flex flex-column justify-center"
      persistent
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <v-card>
        <v-card-text>
          {{
            $t('dialog.text', {
              action: $t('action.delete').toLowerCase(),
              entity: item?.name ?? 'this item'
            })
          }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" :disabled="loading" @click="emit('close')"></v-btn>

          <v-btn
            color="primary"
            text="Confirm"
            variant="tonal"
            :disabled="loading"
            :loading="loading"
            @click="emit('confirm')"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: any
  showDialog: boolean
  loading: boolean
}>()

const emit = defineEmits(['close', 'confirm'])
</script>
