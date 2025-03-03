<template>
  <DFFormDialog
    :title="`${$t(selectedCard ? 'action.edit' : 'action.create')} ${$t('entity.project.name')}`"
    :show-dialog="formDialogVisible"
    :representation="ProjectRepresentation"
    :model-value="selectedCard ?? ProjectDataModel"
    :loading="dialogLoading"
    @cancel="formDialogVisible = false"
    @submit="handleSubmit"
  />

  <DFConfirmDialog
    :item="selectedCard"
    :show-dialog="confirmDialogVisible"
    :loading="dialogLoading"
    @close="confirmDialogVisible = false"
    @confirm="handleDelete"
  />

  <div>
    <v-sheet class="border" rounded>
      <DFBtn :tooltip="$t('action.back')" icon="mdi-arrow-left" @on-click="loginStore.resetAuth" />
      <template v-if="isAdmin">
        <DFBtn
          :tooltip="`${$t('action.create')} ${$t('entity.project.name')}`"
          icon="mdi-plus"
          :disabled="enabled"
          @on-click="formDialogVisible = true"
        />
        <DFBtn
          :tooltip="`${$t('action.edit')} ${$t('entity.project.name')}`"
          icon="mdi-pencil"
          :disabled="!enabled"
          @on-click="formDialogVisible = true"
        />
        <DFBtn
          :tooltip="`${$t('action.delete')} ${$t('entity.project.name')}`"
          color="red"
          icon="mdi-delete"
          :disabled="!enabled"
          @on-click="confirmDialogVisible = true"
        />
      </template>

      <h2 class="text-h5 text-center mx-auto">{{ $t('entity.project.name', 2) }}</h2>
      <v-container fluid>
        <v-row>
          <v-col v-for="project in projectStore.items" :key="project.id" :cols="4">
            <v-skeleton-loader v-if="loading" type="card" />
            <DFCard
              v-else
              :item="project"
              :selected-id="selectedCard?.id ?? null"
              @selected="
                (item, selected) => {
                  enabled = selected
                  selectedCard = enabled ? item : null
                }
              "
            />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useLoginStore } from '../stores/loginStore'
import { useProjectStore } from '../stores/projectStore'
import { ProjectCreate, ProjectPatch } from '../api'
import { ProjectRepresentation, ProjectDataModel } from '../models/Project'
import DFBtn from '../components/DFBtn.vue'
import DFCard from '../components/DFCard.vue'
import DFConfirmDialog from '../components/DFConfirmDialog.vue'
import DFFormDialog from '../components/DFFormDialog.vue'

const projectStore = useProjectStore()
const loginStore = useLoginStore()
const isAdmin = computed((): boolean => loginStore.isAdmin)

const loading = ref<boolean>(false)
const dialogLoading = ref<boolean>(false)
const formDialogVisible = ref<boolean>(false)
const confirmDialogVisible = ref<boolean>(false)
const enabled = ref<boolean>(false)
const selectedCard = ref<any>(null)

const getModifiedFields = (original: ProjectPatch, updated: ProjectPatch) => {
  return Object.keys(updated).reduce((modifiedFields, key) => {
    if (JSON.stringify((original as any)[key]) !== JSON.stringify((updated as any)[key])) {
      modifiedFields[key as keyof ProjectPatch] = (updated as any)[key]
    }
    return modifiedFields
  }, {} as Partial<ProjectPatch>)
}

onMounted(async () => {
  await loadItems()
})

const loadItems = async () => {
  loading.value = true

  try {
    await projectStore.listProjects()
  } finally {
    loading.value = false
  }
}

const handleSubmit = async (formData: ProjectCreate) => {
  dialogLoading.value = true

  try {
    if (selectedCard.value) {
      let modifiedData = getModifiedFields(selectedCard.value, formData)
      if (Object.keys(modifiedData).length) {
        await projectStore.editProject(selectedCard.value, modifiedData)
      }
    } else {
      await projectStore.createProject(formData)
    }
  } finally {
    enabled.value = false
    selectedCard.value = null
    dialogLoading.value = false
    formDialogVisible.value = false
    await loadItems()
  }
}

const handleDelete = async () => {
  dialogLoading.value = true

  try {
    if (selectedCard.value) await projectStore.deleteProjectById(selectedCard.value)
  } finally {
    enabled.value = false
    selectedCard.value = null
    dialogLoading.value = false
    confirmDialogVisible.value = false
    await loadItems()
  }
}
</script>
