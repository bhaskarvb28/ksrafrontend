// academies.types.ts

export interface Academy {
  id: string

  name: string

  state_id: number

  state_name: string

  district_id: number

  district_name: string

  pincode_id: number

  pincode: string

  address: string

  is_active: boolean

  created_at: string

  updated_at: string
}

export interface AcademiesPagination {
  items: Academy[]

  page: number

  limit?: number | "all"

  total: number

  total_pages: number

  has_next: boolean

  has_previous: boolean
}

export interface AcademiesResponse {
  success: boolean

  message: string

  data: AcademiesPagination
}
