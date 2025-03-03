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
    secondary: '#acaabd',
    info: '#1e6a94',
    success: '#41941e',
    // warning: '#1d7696',
    error: '#941e1e'
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
