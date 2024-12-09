import { TagCreate, TagOut, TagPatch } from '../api'
import { GenericRepresentation } from './Generic'

export const TagRepresentation: GenericRepresentation<TagOut> = {
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
  icon: {
    label: 'Icon',
    dataDialog: '',
    tableColumn: '',
    formRepresentation: {
      component: 'InputValue',
      row: 2,
      rule: [
        (value: unknown) => {
          if (value) return true

          return 'Required field'
        }
      ]
    }
  },
  color: {
    label: 'Color',
    dataDialog: '',
    tableColumn: '',
    formRepresentation: {
      component: 'InputValue',
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

export const TagDataModel: Partial<TagCreate | TagPatch> = {}
