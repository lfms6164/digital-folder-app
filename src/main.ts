import { clearTokenOnReload } from './helpers/removeTokenOnReload'
import { createApp, ref } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import App from './App.vue'
import en from './i18n/en.json'
import router from './router'
import vuetify from './plugins/vuetify'

export const showSplashScreen = ref<boolean>(true)

clearTokenOnReload()

const i18n = createI18n({
  locale: 'en',
  messages: { en }
})

const app = createApp(App)
app.use(createPinia())
app.use(i18n)
app.use(vuetify)

app.mount('#app')

setTimeout(() => {
  app.use(router)
  showSplashScreen.value = false
  router.push('/login')
}, 2000)
