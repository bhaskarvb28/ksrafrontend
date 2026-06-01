export interface State {
  id: number

  name: string
}

export interface StatesResponse {
  success: boolean

  message: string

  data: State[]
}