<template>
  <v-layout>
    <v-app-bar v-if="visible">
      <v-btn icon="mdi-apps" readonly />
      {{ $t('base_layout.admin_panel.name') }}
      <v-divider class="mx-3 align-self-center" length="40" thickness="3" vertical></v-divider>

      <DFBtn
        :tooltip="$t('base_layout.admin_panel.home')"
        icon="mdi-home-outline"
        :disabled="route.path === '/projects'"
        @on-click="router.push('/projects')"
      />
      <v-divider class="mx-3 align-self-center" length="40" thickness="3" vertical></v-divider>

      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-tooltip :text="$t('base_layout.admin_panel.actions.name')" location="bottom">
            <template v-slot:activator="{ props: tooltipProps }">
              <v-btn
                v-bind="{ ...props, ...tooltipProps }"
                icon="mdi-format-list-bulleted-square"
              />
            </template>
          </v-tooltip>
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

      <v-divider class="mx-3 align-self-center" length="40" thickness="3" vertical />

      <DFBtn
        :tooltip="$t('base_layout.admin_panel.api')"
        icon="mdi-api"
        @on-click="openUrl('http://127.0.0.1:8080')"
      />
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
          <v-icon :icon="isAdmin ? 'mdi-account-cog' : 'mdi-account'" />
          <strong>{{
            $t(`base_layout.banner.${isAdmin ? 'admin' : 'guest'}`).toUpperCase()
          }}</strong>
        </v-banner>
      </div>

      <div class="pa-4 pb-8 h-100">
        <RouterView />
      </div>
    </v-main>

    <v-footer app height="40">
      <DFBtn
        :tooltip="`${$t(`action.${visible ? 'hide' : 'show'}`)} ${$t('base_layout.admin_panel.name')}`"
        :icon="visible ? 'mdi-shield-lock-open-outline' : 'mdi-shield-lock-outline'"
        :disabled="!isAdmin"
        @on-click="visible = !visible"
      />
      <v-spacer />
      <DFBtn
        v-for="(btn, i) in footerBtns"
        :key="i"
        :tooltip="btn.tooltip"
        :icon="btn.icon"
        @on-click="openUrl(btn.url)"
      />
    </v-footer>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useLoginStore } from '../stores/loginStore'
import router from '../router'
import DFBtn from '../components/DFBtn.vue'

const route = useRoute()
const loginStore = useLoginStore()
const isAdmin = computed((): boolean => loginStore.isAdmin)
const visible = ref<boolean>(false)

const adminActions = [
  {
    name: 'Tags',
    icon: 'mdi-tag-multiple',
    path: '/tags'
  }
]

const footerBtns = [
  {
    icon: 'mdi-github',
    tooltip: 'GitHub',
    url: 'https://github.com/lfms6164'
  },
  {
    icon: 'mdi-linkedin',
    tooltip: 'LinkedIn',
    url: 'https://www.linkedin.com/in/leonardo-silva-663a9719a/'
  }
]

const openUrl = (url: string) => {
  window.open(url, '_blank')
}
</script>
