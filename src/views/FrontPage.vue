<template>
  <div>
    <v-sheet class="border" rounded>
      <v-btn icon="mdi-arrow-left" variant="text" @click="resetAuth" />
      <v-btn icon="mdi-plus" variant="text" @click="console.log('create')" />
      <v-container fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card.id" :cols="card.size">
            <DFCard :title="card.title" :text="card.text" :action="card.action"></DFCard>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '../router'
import DFCard from '../components/DFCard.vue'

const cards = ref([
  {
    id: 1,
    title: 'Test1',
    text: 'Text1',
    size: 6
  },
  {
    id: 2,
    title: 'Test2',
    text: 'Text2',
    size: 6,
    action: '/projects'
  }
])

const resetAuth = async () => {
  localStorage.removeItem('accessToken')
  router.push('/login')
}
</script>
