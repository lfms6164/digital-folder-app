import { AuthArgs } from '../api'
import { GenericRepresentation } from './Generic'

export const AuthRepresentation: GenericRepresentation<AuthArgs> = {
  username: {
    label: 'entity.auth.fields.username',
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
    label: 'entity.auth.fields.password',
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
