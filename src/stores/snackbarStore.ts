import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbarStore', () => {
  const snackbars = ref<Array<any>>([])

  const statusColorIconMap: Record<number, Record<string, string>> = {
    1: {
      color: 'warning',
      icon: 'information-slab-symbol'
    },
    200: {
      color: 'success',
      icon: 'check-circle-outline'
    },
    400: {
      color: 'error',
      icon: 'alert-circle-outline'
    }
  }

  const showSnackBar = (status: number = 1, text: string = 'Default Snackbar Text') => {
    const newSnackbar = {
      id: Date.now(),
      color: statusColorIconMap[status].color,
      icon: statusColorIconMap[status].icon,
      text: text,
      visible: true
    }

    snackbars.value.push(newSnackbar)

    setTimeout(() => {
      hideSnackBar(newSnackbar.id)
    }, 5000)
  }

  const hideSnackBar = (id: number) => {
    snackbars.value = snackbars.value.filter((snackbar) => snackbar.id !== id)
  }

  return { snackbars, showSnackBar, hideSnackBar }
})
