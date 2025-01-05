<template>
  <DFFormDialog
    :title="selectedCard ? 'Edit Project' : 'Create Project'"
    :show-dialog="formDialogVisible"
    :representation="ProjectRepresentation"
    :model-value="selectedCard ? selectedCard : ProjectDataModel"
    :loading="loading"
    @cancel="formDialogVisible = false"
    @submit="handleSubmit"
  />

  <DFConfirmDialog
    :item="selectedCard"
    :show-dialog="confirmDialogVisible"
    :loading="loading"
    @close="
      () => {
        confirmDialogVisible = false
      }
    "
    @confirm="handleDelete"
  />

  <div>
    <v-sheet class="border" rounded>
      <v-btn icon="mdi-arrow-left" variant="text" @click="loginStore.resetAuth" />
      <template v-if="isAdmin">
        <v-btn
          icon="mdi-plus"
          variant="text"
          :disabled="enabled"
          @click="formDialogVisible = true"
        />
        <v-btn
          icon="mdi-pencil"
          variant="text"
          :disabled="true"
          @click="formDialogVisible = true"
        />
        <v-btn
          color="red"
          icon="mdi-delete"
          variant="text"
          :disabled="!enabled"
          @click="confirmDialogVisible = true"
        />
      </template>

      <v-container fluid>
        <v-row>
          <v-col v-for="[key, card] in Object.entries(projectStore.items)" :key="key" :cols="4">
            <DFCard
              :item="card"
              :action="undefined"
              :selected-id="selectedCard ? selectedCard.id : null"
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
import DFCard from '../components/DFCard.vue'
import DFConfirmDialog from '../components/DFConfirmDialog.vue'
import DFFormDialog from '../components/DFFormDialog.vue'

const projectStore = useProjectStore()
const loginStore = useLoginStore()
const isAdmin = computed((): boolean => loginStore.isAdmin)

const loading = ref<boolean>(false)
const formDialogVisible = ref<boolean>(false)
const confirmDialogVisible = ref<boolean>(false)
const enabled = ref<boolean>(false)
const selectedCard = ref<any>(null)

onMounted(async () => {
  loading.value = true
  try {
    await projectStore.listProjects()
  } finally {
    loading.value = false
  }
})

const handleSubmit = async (formData: ProjectCreate | ProjectPatch) => {
  loading.value = true
  try {
    if (selectedCard.value) {
      await projectStore.editProject(selectedCard.value.id, formData)
    } else {
      await projectStore.createProject(formData)
    }
  } finally {
    loading.value = false
    formDialogVisible.value = false
    await projectStore.listProjects()
  }
}

const handleDelete = async () => {
  loading.value = true
  try {
    if (selectedCard.value) await projectStore.deleteProjectById(selectedCard.value.id)
  } finally {
    enabled.value = false
    selectedCard.value = null
    loading.value = false
    confirmDialogVisible.value = false
    await projectStore.listProjects()
  }
}
</script>
