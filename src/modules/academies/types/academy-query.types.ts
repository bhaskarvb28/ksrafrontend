// academy-query.types.ts

export interface AcademyQueryParams {
  page?: number

  limit?: number | "all"
  
  search?: string

  state_id?: number

  district_id?: number

  sort_by?: string

  order_by?: "asc" | "desc"
}
