import { TagCreate, TagOut, TagPatch } from '../api'
import { GenericRepresentation } from './Generic'

export const TagRepresentation: GenericRepresentation<TagOut> = {
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
  icon: {
    label: 'Icon',
    tableRepresentation: '',
    formRepresentation: {
      component: 'InputValue',
      row: 2,
      rule: []
    }
  },
  color: {
    label: 'Color',
    tableRepresentation: '',
    formRepresentation: {
      component: 'ColorPicker',
      row: 3,
      rule: [
        (value: unknown) => {
          if (value) return true

          return 'Required field'
        }
      ]
    }
  }
}

export const TagDataModel: Partial<TagCreate | TagPatch> = { name: '', icon: '', color: '#ff0000' }
