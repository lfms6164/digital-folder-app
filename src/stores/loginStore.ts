import { defineStore } from 'pinia'
import { ApiCall } from '../helpers/API'
import { AuthArgs } from '../api'
import { computed, ref } from 'vue'
import router from '../router'

export const useLoginStore = defineStore('loginStore', () => {
  const accessToken = ref(localStorage.getItem('accessToken'))

  const isAdmin = computed((): boolean => !!accessToken.value)

  const authenticate = async (user: AuthArgs) => {
    try {
      const response = await ApiCall.post('/api/auth/login', user)
      if (response.status === 200) {
        accessToken.value = response.data.access_token // Update the reactive state
        localStorage.setItem('accessToken', response.data.access_token)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const resetAuth = async () => {
    localStorage.removeItem('accessToken')
    accessToken.value = null
    router.push('/login')
  }

  return {
    authenticate,
    resetAuth,
    isAdmin
  }
})
