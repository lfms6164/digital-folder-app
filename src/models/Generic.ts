export type GenericRepresentation<Type> = {
  [Property in keyof Type]: GenericProperties
}

export type GenericProperties = {
  label: string
  dataDialog: unknown
  tableColumn: unknown
  formRepresentation: formRepresentation
}

interface formRepresentation {
  component: 'Autocomplete' | 'CheckBox' | 'ColorPicker' | 'InputValue' | 'Hidden'
  row: number
  rule: any
  type?: 'password'
}
