import { defineStore } from 'pinia'
import { ApiCall } from '../helpers/API'
import { ref } from 'vue'
import { ProjectCreate, ProjectOut, ProjectPatch } from '../api'
import { useSnackbarStore } from './snackbarStore'

export const useProjectStore = defineStore('projectStore', () => {
  const snackbarStore = useSnackbarStore()

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

  const getProjectById = async (projectId: string) => {
    try {
      const response = await ApiCall.get(`/api/projects/project/${projectId}`)
      return response.data
    } catch (error) {
      console.warn(error)
    }
  }

  const createProject = async (project: ProjectCreate) => {
    const uploadResponse = project.image ? await uploadFile(project.image) : null

    if (uploadResponse?.status === 200 || !uploadResponse) {
      try {
        const response = await ApiCall.post(
          '/api/projects/create',
          project.image
            ? {
                ...project,
                image: uploadResponse?.filename
              }
            : project
        )

        snackbarStore.showSnackBar(response.status, `Project ${project.name} created`)
      } catch (error: any) {
        console.warn(error)
        snackbarStore.showSnackBar(error.status, error.response.data.detail)
      }
    }
  }

  const editProject = async (
    projectPreUpdate: ProjectOut,
    projectUpdated: Partial<ProjectPatch>
  ) => {
    const uploadResponse = projectUpdated.image ? await uploadFile(projectUpdated.image) : null

    if (uploadResponse?.status === 200 || !uploadResponse) {
      try {
        const response = await ApiCall.patch(
          `/api/projects/patch/${projectPreUpdate.id}`,
          projectUpdated.image
            ? {
                ...projectUpdated,
                image: uploadResponse?.filename
              }
            : projectUpdated
        )

        snackbarStore.showSnackBar(
          response.status,
          `Project ${projectUpdated.name ?? projectPreUpdate.name} edited`
        )
      } catch (error: any) {
        console.warn(error)
        snackbarStore.showSnackBar(error.status, error.response.data.detail)
      }
    }
  }

  const deleteProjectById = async (project: ProjectOut) => {
    try {
      const response = await ApiCall.delete(`/api/projects/delete/${project.id}`)
      snackbarStore.showSnackBar(response.status, `Project ${project.name} deleted`)
    } catch (error: any) {
      console.warn(error)
      snackbarStore.showSnackBar(error.status, error.response.data.detail)
    }
  }

  const uploadFile = async (file: any) => {
    const formData = new FormData()
    if (file) formData.append('file', file)

    try {
      const uploadResponse = await ApiCall.post('/api/projects/upload_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      return { filename: uploadResponse.data.filename, status: uploadResponse.status }
    } catch (error: any) {
      console.warn(error)
      snackbarStore.showSnackBar(error.status, error.response.data.detail)
      return { status: error.status }
    }
  }

  return {
    items,
    itemsCount,
    listProjects,
    getProjectById,
    createProject,
    editProject,
    deleteProjectById
  }
})
