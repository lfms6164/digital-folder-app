import { defineStore } from 'pinia'
import { ApiCall } from '../helpers/API'
import { ref } from 'vue'
import { TagCreate, TagOut, TagPatch } from '../api'

export const useTagStore = defineStore('tagStore', () => {
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
      await ApiCall.post('/api/tags/create', tag)
    } catch (error) {
      console.warn(error)
    }
  }

  const editTag = async (tagId: string, tag: TagPatch) => {
    try {
      await ApiCall.patch(`/api/tags/patch/${tagId}`, tag)
    } catch (error) {
      console.warn(error)
    }
  }

  const deleteTagById = async (tagId: string) => {
    try {
      await ApiCall.delete(`/api/tags/delete/${tagId}`)
    } catch (error) {
      console.warn(error)
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
