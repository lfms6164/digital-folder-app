<template>
  <v-layout>
    <v-app-bar v-if="visible">
      <v-btn icon="mdi-apps" readonly />
      {{ 'Admin Panel' }}
      <v-divider class="mx-3 align-self-center" length="40" thickness="3" vertical></v-divider>

      <v-btn
        icon="mdi-home-outline"
        :disabled="route.path === '/projects'"
        @click="router.push('/projects')"
      />
      <v-divider class="mx-3 align-self-center" length="40" thickness="3" vertical></v-divider>

      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-format-list-bulleted-square" />
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in adminActions"
            :key="i"
            :append-icon="item.icon"
            :title="item.name"
            :disabled="route.path === item.path"
            @click="router.push(item.path)"
          />
        </v-list>
      </v-menu>

      <v-divider class="mx-3 align-self-center" length="40" thickness="3" vertical></v-divider>

      <v-btn icon="mdi-api" @click="openUrl('http://127.0.0.1:8080')" />
    </v-app-bar>

    <v-main>
      <div
        style="width: 868px; margin: auto; margin-top: 15px; border: 3px solid; border-radius: 8px"
      >
        <v-banner
          bg-color="#f7e477"
          lines="one"
          rounded
          style="display: flex; justify-content: center; align-items: center"
        >
          <!-- <v-icon :icon="viewMode == 'ADMIN' ? 'mdi-account-cog' : 'mdi-account'" /> -->
          <strong>{{ viewMode }}</strong>
        </v-banner>
      </div>

      <div class="pa-4 pb-8 h-100">
        <RouterView />
      </div>
    </v-main>

    <v-footer app height="40">
      <v-btn
        v-ripple="false"
        variant="text"
        :icon="visible ? 'mdi-shield-lock-open-outline' : 'mdi-shield-lock-outline'"
        :disabled="!isAdmin"
        @click="visible = !visible"
      />
      <v-spacer />
      <v-btn
        v-for="(icon, i) in footerIcons"
        :key="i"
        :icon="icon.icon"
        v-ripple="false"
        variant="text"
        @click="openUrl(icon.url)"
      ></v-btn>
    </v-footer>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useLoginStore } from '../stores/loginStore'
import router from '../router'

const route = useRoute()
const loginStore = useLoginStore()
const isAdmin = computed((): boolean => loginStore.isAdmin)
const viewMode = isAdmin.value ? 'ADMIN' : 'GUEST'
const visible = ref<boolean>(false)

const adminActions = [
  {
    name: 'Tags',
    icon: 'mdi-tag-multiple',
    path: '/tags'
  }
]

const footerIcons = [
  {
    icon: 'mdi-github',
    url: 'https://github.com/lfms6164'
  },
  {
    icon: 'mdi-linkedin',
    url: 'https://www.linkedin.com/in/leonardo-silva-663a9719a/'
  }
]

const openUrl = (url: string) => {
  window.open(url, '_blank')
}
</script>
