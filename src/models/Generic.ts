export type GenericRepresentation<Type> = {
  [Property in keyof Type]: GenericProperties
}

export type GenericProperties = {
  label: string
  formRepresentation: FormRepresentation
}

interface BaseFormRepresentation {
  component:
    | 'Autocomplete'
    | 'CheckBox'
    | 'ColorPicker'
    | 'FileInput'
    | 'Hidden'
    | 'InputValue'
    | 'TextArea'
  row: number
  rule: any
}

type FormRepresentation =
  | AutocompleteProperties
  | CheckBoxProperties
  | ColorPickerProperties
  | FileInputProperties
  | HiddenProperties
  | InputValueProperties
  | TextAreaProperties

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

export interface FileInputProperties extends BaseFormRepresentation {
  component: 'FileInput'
  icon: string
}

export interface HiddenProperties extends BaseFormRepresentation {
  component: 'Hidden'
}

export interface InputValueProperties extends BaseFormRepresentation {
  component: 'InputValue'
  type?: 'password'
}

export interface TextAreaProperties extends BaseFormRepresentation {
  component: 'TextArea'
}
