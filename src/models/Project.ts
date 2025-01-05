import { ProjectCreate, ProjectOut } from '../api'
import { ApiCall } from '../helpers/API'
import { GenericRepresentation } from './Generic'

export const ProjectRepresentation: GenericRepresentation<ProjectOut> = {
  id: {
    label: '',
    dataDialog: '',
    tableColumn: '',
    formRepresentation: {
      component: 'Hidden',
      row: 0,
      rule: []
    }
  },
  name: {
    label: 'Name',
    dataDialog: '',
    tableColumn: '',
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
    dataDialog: '',
    tableColumn: '',
    formRepresentation: {
      component: 'InputValue',
      row: 2,
      rule: []
    }
  },
  description: {
    label: 'Description',
    dataDialog: '',
    tableColumn: '',
    formRepresentation: {
      component: 'InputValue',
      row: 3,
      rule: []
    }
  },
  tags: {
    label: 'Tags',
    dataDialog: '',
    tableColumn: '',
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

export const ProjectDataModel: Partial<ProjectCreate> = { image: '', description: '', tags: null }
