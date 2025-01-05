<template>
  <DFFormDialog
    title="Authentication"
    :show-dialog="dialogVisible"
    :representation="AuthRepresentation"
    :model-value="AuthDataModel"
    :loading="loading"
    @cancel="dialogVisible = false"
    @submit="handleSubmit"
  />

  <div class="d-flex flex-column h-100">
    <v-sheet
      class="d-flex align-center justify-center mx-auto mt-16"
      elevation="24"
      :height="200"
      :width="400"
      rounded="xl"
    >
      <v-row justify="center">
        <v-btn
          prepend-icon="mdi-account-cog"
          text="Admin"
          variant="text"
          stacked
          density="comfortable"
          rounded="lg"
          @click="dialogVisible = true"
        />
        <v-btn
          prepend-icon="mdi-account"
          text="Guest"
          variant="text"
          stacked
          density="comfortable"
          rounded="lg"
          @click="router.push('/front')"
        />
      </v-row>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AuthArgs } from '../api'
import { AuthDataModel, AuthRepresentation } from '../models/Auth'
import { useLoginStore } from '../stores/loginStore'
import router from '../router'
import DFFormDialog from '../components/DFFormDialog.vue'

const loginStore = useLoginStore()

const dialogVisible = ref<boolean>(false)
const loading = ref<boolean>(false)

const handleSubmit = async (formData: AuthArgs) => {
  loading.value = true
  try {
    await loginStore.authenticate(formData)
    if (localStorage.getItem('accessToken')) router.push('/front')
  } finally {
    loading.value = false
  }
}
</script>
