<template>
  <v-app>
    <SplashScreen v-if="showSplashScreen" />
    <RouterView v-else />
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { showSplashScreen } from './main'
import SplashScreen from './views/SplashScreen.vue'
</script>
