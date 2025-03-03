import { ProjectCreate, ProjectOut } from '../api'
import { ApiCall } from '../helpers/API'
import { GenericRepresentation } from './Generic'

export const ProjectRepresentation: GenericRepresentation<ProjectOut> = {
  id: {
    label: '',
    formRepresentation: {
      component: 'Hidden',
      row: 0,
      rule: []
    }
  },
  name: {
    label: 'entity.project.fields.name',
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
    label: 'entity.project.fields.image',
    formRepresentation: {
      component: 'FileInput',
      icon: 'mdi-image',
      row: 2,
      rule: []
    }
  },
  introduction: {
    label: 'entity.project.fields.introduction',
    formRepresentation: {
      component: 'TextArea',
      row: 3,
      rule: []
    }
  },
  description: {
    label: 'entity.project.fields.description',
    formRepresentation: {
      component: 'TextArea',
      row: 4,
      rule: []
    }
  },
  tags: {
    label: 'entity.project.fields.tags',
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
      row: 5,
      rule: []
    }
  }
}

export const ProjectDataModel: Partial<ProjectCreate> = {
  image: null,
  introduction: '',
  description: '',
  tags: null
}
