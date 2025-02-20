<template>
  <v-card class="mx-auto border" color="#252529">
    <v-img v-if="item.image" height="200px" :src="item.image" cover />

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
      <v-chip-group v-for="chip in item.tags" :key="chip.id">
        <v-chip
          :style="{ backgroundColor: chip.color }"
          :prepend-icon="`mdi-${chip.icon}`"
          :ripple="false"
          rounded="sm"
          variant="text"
        >
          {{ item.tags.length > 5 ? '' : chip.name }}
        </v-chip>
      </v-chip-group>

      <v-spacer />
      <v-btn
        v-if="item.description"
        v-ripple="false"
        variant="text"
        :icon="expand ? 'mdi-folder-open' : 'mdi-folder'"
        @click="expand = !expand"
      />
      <v-btn
        v-ripple="false"
        variant="text"
        icon="mdi-magnify-expand"
        @click="router.push(`/project/${item.id}`)"
      />
    </v-card-actions>

    <v-expand-transition>
      <div v-show="expand">
        <v-divider />

        <v-card-text> {{ item.description }} </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import router from '../router'
import { useLoginStore } from '../stores/loginStore'

const loginStore = useLoginStore()
const isAdmin = computed((): boolean => loginStore.isAdmin)

const expand = ref<boolean>(false)
const selected = ref<boolean>(false)

const props = defineProps<{
  item: any
  selectedId?: string
}>()

const emit = defineEmits(['selected'])
</script>
