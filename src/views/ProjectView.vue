<template>
  <DFBtn :tooltip="$t('action.back')" icon="mdi-arrow-left" @on-click="router.push('/projects')" />

  <h2 class="text-h4 text-center">{{ item?.name }}</h2>
  <v-img
    v-if="item?.image"
    height="200px"
    :src="`http://127.0.0.1:8080/static/${item.image}`"
    cover
  />

  <p>{{ item?.introduction }}</p>
  <v-divider />
  <p>{{ item?.description }}</p>

  <v-chip-group>
    <v-chip
      v-for="chip in item?.tags"
      :key="chip.id"
      :style="{ backgroundColor: chip.color }"
      :prepend-icon="`mdi-${chip.icon}`"
      :ripple="false"
      rounded="sm"
      variant="text"
    >
      {{ chip.name }}
    </v-chip>
  </v-chip-group>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ProjectOut } from '../api'
import { useProjectStore } from '../stores/projectStore'
import DFBtn from '../components/DFBtn.vue'
import router from '../router'

const projectStore = useProjectStore()

const loading = ref<boolean>(false)
const item = ref<ProjectOut>()

const props = defineProps<{
  id: string
}>()

onMounted(async () => {
  loading.value = true

  try {
    item.value = await projectStore.getProjectById(props.id)
    console.log(item.value)
  } finally {
    loading.value = false
  }
})
</script>
