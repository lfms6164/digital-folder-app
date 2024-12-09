<template>
  <v-form ref="Form" @submit.prevent="submit">
    <div v-for="[key, field] in Object.entries(representation)" :key="key">
      <v-row class="mb-4" v-if="field.formRepresentation.component !== 'Hidden'">
        <component
          :is="formComponentsMap[field.formRepresentation.component]"
          v-model="localModelValue[key]"
          :label="field.label"
          :type="field.formRepresentation.type"
          :rules="field.formRepresentation.rule"
          outlined
          clearable
          density="compact"
          variant="outlined"
        />
      </v-row>
    </div>

    <v-row justify="end" class="form-actions">
      <v-btn text="Cancel" @click="emit('cancel')" />
      <v-btn text="Submit" type="submit" />
      <!-- Removed @click="submit" cos apparently not needed -->
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { GenericRepresentation } from '../models/Generic'
import { cloneDeep } from 'lodash'

const props = defineProps<{
  representation: GenericRepresentation<any>
  modelValue: any
}>()

const localModelValue = ref(cloneDeep(props.modelValue))

const emit = defineEmits(['update:modelValue', 'cancel', 'submit'])

watch(
  () => localModelValue.value,
  () => {
    emit('update:modelValue', localModelValue.value)
  },
  { deep: true }
)

const formComponentsMap = {
  Autocomplete: 'v-autocomplete',
  CheckBox: 'v-checkbox',
  ColorPicker: 'v-color-picker',
  InputValue: 'v-text-field'
}

const submit = async (event: any) => {
  const form = await event
  if (form.valid) emit('submit', localModelValue.value)
}
</script>
