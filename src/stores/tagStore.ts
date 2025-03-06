import { defineStore } from 'pinia'
import { ApiCall } from '../helpers/API'
import { ref } from 'vue'
import { TagCreate, TagOut, TagPatch } from '../api'
import { useSnackbarStore } from './snackbarStore'

export const useTagStore = defineStore('tagStore', () => {
  const snackbarStore = useSnackbarStore()

  const items = ref<TagOut[]>([])
  const itemsCount = ref<number>(0)

  const listTags = async () => {
    try {
      const response = await ApiCall.get('/api/tags/list')
      items.value = response.data
      itemsCount.value = response.data.length
    } catch (error) {
      console.warn(error)
    }
  }

  const createTag = async (tag: TagCreate) => {
    try {
      const response = await ApiCall.post('/api/tags/create', tag)
      snackbarStore.showSnackBar(response.status, `Tag ${tag.name} created`)
    } catch (error: any) {
      console.warn(error)
      snackbarStore.showSnackBar(error.status, error.response.data.detail)
    }
  }

  const editTag = async (tagPreUpdate: TagOut, tagUpdated: TagPatch) => {
    try {
      const response = await ApiCall.patch(`/api/tags/patch/${tagPreUpdate.id}`, tagUpdated)
      snackbarStore.showSnackBar(
        response.status,
        `Tag ${tagUpdated.name ?? tagPreUpdate.name} edited`
      )
    } catch (error: any) {
      console.warn(error)
      snackbarStore.showSnackBar(error.status, error.response.data.detail)
    }
  }

  const deleteTagById = async (tag: TagOut) => {
    try {
      const response = await ApiCall.delete(`/api/tags/delete/${tag.id}`)
      snackbarStore.showSnackBar(response.status, `Tag ${tag.name} deleted`)
    } catch (error: any) {
      console.warn(error)
      snackbarStore.showSnackBar(error.status, error.response.data.detail)
    }
  }

  return {
    items,
    itemsCount,
    createTag,
    editTag,
    deleteTagById,
    listTags
  }
})
