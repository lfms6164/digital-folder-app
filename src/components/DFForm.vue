<template>
  <v-form ref="Form" @submit.prevent="submit">
    <div v-for="[row, fields] in groupedFormFieldsByRow" :key="row">
      <v-row>
        <v-col v-for="{ key, field } in fields" :key="key" :cols="12 / fields.length">
          <template v-if="field.formRepresentation.component !== 'Hidden'">
            <template v-if="field.formRepresentation.component === 'FileInput'">
              <v-file-input
                v-model="fileInputValue[key]"
                accept="image/*"
                clearable
                density="compact"
                variant="solo-filled"
                :label="$t(field.label)"
                :prepend-icon="(field.formRepresentation as FileInputProperties).icon"
                @update:modelValue="handleFileUpdate($event, key)"
              />
            </template>

            <template v-else>
              <component
                :is="formComponentsMap[field.formRepresentation.component]"
                v-model="localModelValue[key]"
                :label="$t(field.label)"
                :type="(field.formRepresentation as InputValueProperties).type"
                :rules="field.formRepresentation.rule"
                :items="autocompleteItems"
                :item-title="'name'"
                :item-value="(item: any) => item"
                :multiple="true"
                :chips="true"
                :closable-chips="true"
                outlined
                clearable
                hide-canvas
                hide-inputs
                :modes="['hex']"
                density="compact"
                variant="outlined"
                :disabled="loading"
              />
            </template>
          </template>
        </v-col>
      </v-row>
    </div>

    <v-row justify="end" class="form-actions">
      <v-btn
        :text="$t('dialog.action.cancel')"
        variant="plain"
        :disabled="loading"
        @click="emit('cancel')"
      />
      <v-btn
        :text="$t('dialog.action.submit')"
        variant="tonal"
        :disabled="loading"
        :loading="loading"
        type="submit"
      />
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  AutocompleteProperties,
  FileInputProperties,
  GenericProperties,
  GenericRepresentation,
  InputValueProperties
} from '../models/Generic'
import { cloneDeep } from 'lodash'

const props = defineProps<{
  representation: GenericRepresentation<any>
  modelValue: any
  loading: boolean
}>()

const emit = defineEmits(['update:modelValue', 'cancel', 'submit'])

const localModelValue = ref(cloneDeep(props.modelValue))
const autocompleteItems = ref<any[]>([])

const formComponentsMap = {
  Autocomplete: 'v-autocomplete',
  CheckBox: 'v-checkbox',
  ColorPicker: 'v-color-picker',
  FileInput: 'v-file-input',
  InputValue: 'v-text-field',
  TextArea: 'v-textarea'
}

const groupedFormFieldsByRow = computed(() => {
  /*
Output:
[
  [
    "0",
    [
      { key: "name", field: { formRepresentation: { row: 1, component: "InputValue" } } },
      { key: "icon", field: { ... } }
    ]
  ],
  [
    "1",
    [
      { key: "color", field: { ... } }
    ]
  ]
]
*/
  const rows: Record<number, { key: string; field: GenericProperties }[]> = {}

  Object.entries(props.representation).forEach(([key, field]) => {
    const row = field.formRepresentation.row
    rows[row] = rows[row] ?? []
    rows[row].push({ key, field })
  })

  return Object.entries(rows).sort(([x], [y]) => Number(x) - Number(y))
})

watch(
  () => localModelValue.value,
  () => {
    emit('update:modelValue', localModelValue.value)
  },
  { deep: true }
)

const findAutocompleteInForm = () => {
  for (const key in props.representation) {
    const formRepresentation = props.representation[key].formRepresentation
    if (formRepresentation.component === 'Autocomplete') {
      return key
    }
  }
  return null
}

onMounted(async () => {
  const field = findAutocompleteInForm()

  if (field) {
    const formRepresentation = props.representation[`${field}`]
      .formRepresentation as AutocompleteProperties

    try {
      const response = await formRepresentation.listItems()
      autocompleteItems.value = response
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }
})

const fileInputValue = computed(() => {
  return Object.keys(localModelValue.value).reduce((result: any, key) => {
    result[key] =
      typeof localModelValue.value[key] === 'string' &&
      props.representation[key].formRepresentation.component === 'FileInput'
        ? { name: localModelValue.value[key] }
        : localModelValue.value[key]
    return result
  }, {})
})

const handleFileUpdate = (event: any, key: any) => {
  fileInputValue.value[key] = event ?? null // Update file object
  localModelValue.value[key] = event ?? null // Sync with modelValue
}

const submit = async (event: any) => {
  const form = await event
  if (form.valid) emit('submit', localModelValue.value)
}
</script>
