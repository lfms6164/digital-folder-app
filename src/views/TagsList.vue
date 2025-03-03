<template>
  <DFFormDialog
    :title="`${selectedTag ? $t('action.edit') : $t('action.create')} ${$t('entity.tag.name')}`"
    :show-dialog="formDialogVisible"
    :representation="TagRepresentation"
    :model-value="selectedTag ?? TagDataModel"
    :loading="dialogLoading"
    @cancel="
      () => {
        formDialogVisible = false
        selectedTag = null
      }
    "
    @submit="handleSubmit"
  />

  <DFConfirmDialog
    :item="selectedTag"
    :show-dialog="confirmDialogVisible"
    :loading="dialogLoading"
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
        :group-by="groupBy"
        :headers="headers"
        :items="tagStore.items"
        :items-length="tagStore.itemsCount"
        :items-per-page="tagStore.itemsCount * 2"
        :loading="loading"
        hide-default-header
      >
        <template v-slot:top>
          <div class="d-flex align-center justify-center">
            <h2 class="text-h5">{{ $t('entity.tag.name', 2) }}</h2>
            <DFBtn
              :tooltip="`${$t('action.create')} ${$t('entity.tag.name')}`"
              icon="mdi-plus"
              @on-click="formDialogVisible = true"
            />
          </div>
        </template>

        <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
          <tr>
            <td :colspan="columns.length">
              <v-chip
                :style="{ backgroundColor: item.items[0].raw.color }"
                :prepend-icon="`mdi-${item.items[0].raw.icon}`"
                rounded="sm"
                variant="text"
                @click="toggleGroup(item)"
              >
                {{ item.value }}
              </v-chip>
              <v-btn
                :icon="isGroupOpen(item) ? 'mdi-folder-open' : 'mdi-folder'"
                readonly
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
          <v-chip :style="{ backgroundColor: item.color }" variant="text">
            {{ item.color }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <DFBtn
            :tooltip="`${$t('action.edit')} ${$t('entity.tag.name')}`"
            icon="mdi-pencil"
            @on-click="
              () => {
                formDialogVisible = true
                selectedTag = item
              }
            "
          />

          <DFBtn
            :tooltip="`${$t('action.delete')} ${$t('entity.tag.name')}`"
            color="red"
            icon="mdi-delete"
            @on-click="
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
import DFBtn from '../components/DFBtn.vue'
import DFConfirmDialog from '../components/DFConfirmDialog.vue'
import DFFormDialog from '../components/DFFormDialog.vue'

const tagStore = useTagStore()
const loading = ref<boolean>(false)
const dialogLoading = ref<boolean>(false)
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
  await loadItems()
})

const loadItems = async () => {
  loading.value = true

  try {
    await tagStore.listTags()
  } finally {
    loading.value = false
  }
}

const handleSubmit = async (formData: TagCreate | TagPatch) => {
  dialogLoading.value = true
  try {
    if (selectedTag.value) {
      await tagStore.editTag(selectedTag.value, formData)
    } else {
      await tagStore.createTag(formData)
    }
  } finally {
    selectedTag.value = null
    dialogLoading.value = false
    formDialogVisible.value = false
    await loadItems()
  }
}

const handleDelete = async () => {
  dialogLoading.value = true
  try {
    await tagStore.deleteTagById(selectedTag.value)
  } finally {
    selectedTag.value = null
    dialogLoading.value = false
    confirmDialogVisible.value = false
    await loadItems()
  }
}
</script>
