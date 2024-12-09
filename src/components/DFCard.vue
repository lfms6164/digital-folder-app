<template>
  <v-card class="mx-auto border" :color="cardColor">
    <!-- <v-img v-if="cardImg" height="200px" :src="cardImg" cover></v-img> -->

    <v-card-title> {{ title }} </v-card-title>

    <v-card-actions>
      <v-btn
        v-ripple="false"
        variant="text"
        :icon="expand ? 'mdi-folder-open' : 'mdi-folder'"
        @click="expand = !expand"
      ></v-btn>

      <v-spacer />

      <DFButton v-if="action" icon="mdi-open-in-app" @click="router.push(action)" />
    </v-card-actions>

    <v-expand-transition>
      <div v-show="expand">
        <v-divider />

        <v-card-text> {{ text }} </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '../router'
import DFButton from './DFButton.vue'

const cardColor = ref<string>('#31414d')
const expand = ref<boolean>(false)

defineProps<{ title: string; text: string; cardImg?: string; action?: string }>()
</script>
