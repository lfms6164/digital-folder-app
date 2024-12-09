<template>
  <v-dialog
    v-model="formDialogVisible"
    class="d-flex flex-column justify-center"
    persistent
    transition="dialog-bottom-transition"
    max-width="400"
  >
    <v-sheet :elevation="24" rounded="xl" class="pa-6">
      <h2 class="text-h5 text-center mb-4">{{ selectedTag ? 'Edit Tag' : 'Create Tag' }}</h2>
      <DFForm
        :representation="TagRepresentation"
        :model-value="selectedTag ? selectedTag : TagDataModel"
        @cancel="
          () => {
            formDialogVisible = false
            selectedTag = null
          }
        "
        @submit="handleSubmit"
      ></DFForm>
    </v-sheet>
  </v-dialog>

  <DFConfirmDialog
    :show-dialog="confirmDialogVisible"
    @close="
      () => {
        confirmDialogVisible = false
        selectedTag = null
      }
    "
    @confirm="handleDelete"
  />

  <div>
    <v-sheet class="border" rounded>
      <v-data-table
        :headers="headers"
        :group-by="groupBy"
        :items="tagStore.items"
        :loading="loading"
        hide-default-header
      >
        <template v-slot:top>
          <v-toolbar flat color="#414861">
            <v-btn text="Create" @click="formDialogVisible = true" />
          </v-toolbar>
        </template>

        <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
          <tr>
            <td :colspan="columns.length">
              <v-chip
                :style="{ backgroundColor: item.items[0].raw.color }"
                :prepend-icon="`mdi-${item.items[0].raw.icon}`"
                rounded="sm"
                @click="toggleGroup(item)"
              >
                {{ item.value }}
              </v-chip>
              <v-btn
                :icon="isGroupOpen(item) ? 'mdi-folder-open' : 'mdi-folder'"
                :readonly="true"
                size="small"
                variant="text"
              />
            </td>
          </tr>
        </template>

        <template v-slot:item.icon="{ item }">
          <v-icon :icon="`mdi-${item.icon}`" />
        </template>

        <template v-slot:item.color="{ item }">
          <v-chip :style="{ backgroundColor: item.color }">
            {{ item.color }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            icon="mdi-pencil"
            variant="text"
            @click="
              () => {
                formDialogVisible = true
                selectedTag = item
              }
            "
          />
          <v-btn
            icon="mdi-delete"
            variant="text"
            color="red"
            @click="
              () => {
                confirmDialogVisible = true
                selectedTag = item
              }
            "
          />
        </template>
      </v-data-table>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TagCreate, TagPatch } from '../api'
import { TagDataModel, TagRepresentation } from '../models/Tag'
import { useTagStore } from '../stores/tagStore'
import DFConfirmDialog from '../components/DFConfirmDialog.vue'
import DFForm from '../components/DFForm.vue'

const tagStore = useTagStore()
const loading = ref<boolean>(false)
const formDialogVisible = ref<boolean>(false)
const confirmDialogVisible = ref<boolean>(false)

const selectedTag = ref<any>(null)

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Icon', value: 'icon' },
  { text: 'Color', value: 'color' },
  { text: 'Actions', value: 'actions', sortable: false }
]

const groupBy = [
  {
    key: 'name'
  }
]

onMounted(async () => {
  loading.value = true
  try {
    await tagStore.listTags()
  } finally {
    loading.value = false
  }
})

const handleSubmit = async (formData: TagCreate | TagPatch) => {
  loading.value = true
  try {
    if (selectedTag.value) {
      await tagStore.editTag(selectedTag.value.id, formData)
    } else {
      await tagStore.createTag(formData)
    }
  } finally {
    loading.value = false
    formDialogVisible.value = false
    selectedTag.value = null
    await tagStore.listTags()
  }
}

const handleDelete = async () => {
  loading.value = true
  try {
    await tagStore.deleteTagById(selectedTag.value.id)
  } finally {
    loading.value = false
    confirmDialogVisible.value = false
    selectedTag.value = null
    await tagStore.listTags()
  }
}
</script>
