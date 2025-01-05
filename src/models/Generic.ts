export type GenericRepresentation<Type> = {
  [Property in keyof Type]: GenericProperties
}

export type GenericProperties = {
  label: string
  dataDialog: any
  tableColumn: any
  formRepresentation: FormRepresentation
}

interface BaseFormRepresentation {
  component: 'Autocomplete' | 'CheckBox' | 'ColorPicker' | 'InputValue' | 'Hidden'
  row: number
  rule: any
}

type FormRepresentation =
  | AutocompleteProperties
  | CheckBoxProperties
  | ColorPickerProperties
  | HiddenProperties
  | InputValueProperties

export interface AutocompleteProperties extends BaseFormRepresentation {
  component: 'Autocomplete'
  listItems: any
  multiple?: boolean
}

export interface CheckBoxProperties extends BaseFormRepresentation {
  component: 'CheckBox'
}

export interface ColorPickerProperties extends BaseFormRepresentation {
  component: 'ColorPicker'
}

export interface HiddenProperties extends BaseFormRepresentation {
  component: 'Hidden'
}

export interface InputValueProperties extends BaseFormRepresentation {
  component: 'InputValue'
  type?: 'password'
}
