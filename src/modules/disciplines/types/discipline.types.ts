// discipline.types.ts

export interface Discipline {
  id: number

  code: string

  display_name: string
}

export interface DisciplinesResponse {
  success: boolean

  message: string

  data: Discipline[]
}