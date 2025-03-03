<template>
  <v-card class="mx-auto border" color="#252529">
    <v-img
      v-if="item.image"
      height="200px"
      :src="`http://127.0.0.1:8080/static/${item.image}`"
      cover
    />

    <v-card-title>
      <div class="d-flex justify-space-between align-center">
        {{ item.name }}
        <v-checkbox-btn
          v-if="isAdmin"
          :model-value="props.selectedId === item.id ? true : false"
          :disabled="!!selectedId && selectedId !== item.id"
          @update:model-value="
            () => {
              selected = !selected
              emit('selected', item, selected)
            }
          "
        />
      </div>
    </v-card-title>

    <v-card-actions>
      <v-chip-group>
        <v-chip
          v-for="chip in item.tags"
          :key="chip.id"
          :style="{ backgroundColor: chip.color }"
          :prepend-icon="`mdi-${chip.icon}`"
          :ripple="false"
          rounded="sm"
          variant="text"
        >
          {{ windowWidth < chipCompactState(item.tags!.length).value ? '' : chip.name }}
        </v-chip>
      </v-chip-group>

      <v-spacer />
      <DFBtn
        v-if="item.introduction"
        :tooltip="`${expand ? $t('action.close') : $t('action.open')} ${$t('entity.project.fields.introduction')}`"
        :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @on-click="expand = !expand"
      />
      <DFBtn
        :tooltip="`${$t('action.inspect')} ${$t('entity.project.name')}`"
        icon="mdi-magnify-expand"
        @on-click="router.push(`/project/${item.id}`)"
      />
    </v-card-actions>

    <v-expand-transition>
      <div v-show="expand">
        <v-divider />

        <v-card-text> {{ item.introduction }} </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { ProjectOut } from '../api'
import { useLoginStore } from '../stores/loginStore'
import router from '../router'
import DFBtn from '../components/DFBtn.vue'

const loginStore = useLoginStore()
const isAdmin = computed((): boolean => loginStore.isAdmin)

const expand = ref<boolean>(false)
const selected = ref<boolean>(false)
const windowWidth = ref(window.innerWidth)

const chipCompactState = (n_tags: number) => computed(() => 1000 + 200 * n_tags)

const props = defineProps<{
  item: ProjectOut
  selectedId?: string
}>()

const emit = defineEmits(['selected'])

const updateWindowSize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWindowSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize)
})
</script>
