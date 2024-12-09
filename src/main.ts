import { clearTokenOnReload } from './helpers/removeTokenOnReload'
import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

export const showSplashScreen = ref<boolean>(true)

clearTokenOnReload()

const app = createApp(App)
app.use(createPinia())
app.use(vuetify)

app.mount('#app')

setTimeout(() => {
  app.use(router)
  showSplashScreen.value = false
  router.push('/login')
}, 2000)
