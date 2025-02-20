import { ProjectCreate, ProjectOut } from '../api'
import { ApiCall } from '../helpers/API'
import { GenericRepresentation } from './Generic'

export const ProjectRepresentation: GenericRepresentation<ProjectOut> = {
  id: {
    label: '',
    tableRepresentation: '',
    formRepresentation: {
      component: 'Hidden',
      row: 0,
      rule: []
    }
  },
  name: {
    label: 'Name',
    tableRepresentation: '',
    formRepresentation: {
      component: 'InputValue',
      row: 1,
      rule: [
        (value: unknown) => {
          if (value) return true

          return 'Required field'
        }
      ]
    }
  },
  image: {
    label: 'Image',
    tableRepresentation: '',
    formRepresentation: {
      component: 'FileInput',
      icon: 'mdi-image',
      row: 2,
      rule: []
    }
  },
  description: {
    label: 'Description',
    tableRepresentation: '',
    formRepresentation: {
      component: 'InputValue',
      row: 3,
      rule: []
    }
  },
  tags: {
    label: 'Tags',
    tableRepresentation: '',
    formRepresentation: {
      component: 'Autocomplete',
      listItems: async () => {
        try {
          const response = await ApiCall.get('/api/tags/list')
          return response.data
        } catch (error) {
          console.error('Error fetching tags:', error)
          return []
        }
      },
      row: 4,
      rule: []
    }
  }
}

export const ProjectDataModel: Partial<ProjectCreate> = { image: null, description: '', tags: null }
