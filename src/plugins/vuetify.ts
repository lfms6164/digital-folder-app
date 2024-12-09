import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const customTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#D0D7D9',
    surface: '#1b2224',
    primary: '#aab8bd',
    secondary: '#aab8bd'
    // info: '#aab8bd',
    // success: '#aab8bd'
    // warning: '#aab8bd'
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customTheme',
    themes: { customTheme }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})
