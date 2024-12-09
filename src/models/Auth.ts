import { AuthArgs } from '../api'
import { GenericRepresentation } from './Generic'

export const AuthRepresentation: GenericRepresentation<AuthArgs> = {
  username: {
    label: 'Username',
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
  password: {
    label: 'Password',
    dataDialog: '',
    tableColumn: '',
    formRepresentation: {
      component: 'InputValue',
      row: 2,
      type: 'password',
      rule: [
        (value: unknown) => {
          if (value) return true

          return 'Required field'
        }
      ]
    }
  }
}

export const AuthDataModel: Partial<AuthArgs> = {}
