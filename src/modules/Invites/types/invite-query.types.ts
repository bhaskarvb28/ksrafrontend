
export interface InviteQueryParams {
  page?: number
  limit?: number

  search?: string
  status?: string
  role?: string

  sort_by?: string

  order?: "asc" | "desc"
}