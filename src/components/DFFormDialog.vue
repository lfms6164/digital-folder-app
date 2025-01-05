<template>
  <v-dialog
    :model-value="props.showDialog"
    class="d-flex flex-column justify-center"
    persistent
    transition="dialog-bottom-transition"
    max-width="400"
  >
    <v-sheet :elevation="24" rounded="xl" class="pa-6">
      <h2 class="text-h5 text-center mb-4">{{ props.title }}</h2>
      <DFForm
        :representation="props.representation"
        :model-value="props.modelValue"
        :loading="loading"
        @cancel="handleCancel"
        @submit="handleSubmit"
      />
    </v-sheet>
  </v-dialog>
</template>

<script setup lang="ts">
import { GenericRepresentation } from '../models/Generic'
import DFForm from '../components/DFForm.vue'
const props = defineProps<{
  title: string
  showDialog: boolean
  representation: GenericRepresentation<any>
  modelValue: any
  loading: boolean
}>()

const emit = defineEmits(['cancel', 'submit'])

const handleCancel = () => {
  emit('cancel')
}

const handleSubmit = (formData: any) => {
  emit('submit', formData)
}
</script>
