<template>
  <v-app>
    <SplashScreen v-if="showSplashScreen" />
    <RouterView v-else />
    <DFSnackbar />
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { showSplashScreen } from './main'
import DFSnackbar from './components/DFSnackbar.vue'
import SplashScreen from './views/SplashScreen.vue'
</script>
