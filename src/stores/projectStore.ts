import { defineStore } from 'pinia'
import { ApiCall } from '../helpers/API'
import { ref } from 'vue'
import { ProjectCreate, ProjectOut, ProjectPatch } from '../api'

export const useProjectStore = defineStore('projectStore', () => {
  const items = ref<ProjectOut[]>([])
  const itemsCount = ref<number>(0)

  const listProjects = async () => {
    try {
      const response = await ApiCall.get('/api/projects/list')
      items.value = response.data
      itemsCount.value = response.data.length
    } catch (error) {
      console.warn(error)
    }
  }

  const createProject = async (project: ProjectCreate) => {
    try {
      await ApiCall.post('/api/projects/create', project)
    } catch (error) {
      console.warn(error)
    }
  }

  const editProject = async (projectId: string, project: ProjectPatch) => {
    try {
      await ApiCall.patch(`/api/projects/patch/${projectId}`, project)
    } catch (error) {
      console.warn(error)
    }
  }

  const deleteProjectById = async (projectId: string) => {
    try {
      await ApiCall.delete(`/api/projects/delete/${projectId}`)
    } catch (error) {
      console.warn(error)
    }
  }

  return {
    items,
    itemsCount,
    listProjects,
    createProject,
    editProject,
    deleteProjectById
  }
})
