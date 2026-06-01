import { useAuthStore }
from "../store/auth.store"

const BASE_URL =
  import.meta.env.VITE_API_URL

type ApiOptions = RequestInit

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const token =
    useAuthStore.getState().token

  const headers = new Headers(
    options.headers
  )

  headers.set(
    "Content-Type",
    "application/json"
  )

  // AUTO INJECT TOKEN

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    )
  }

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      ...options,

      headers,

      credentials: "include",
    }
  )

  let data: unknown = null

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    throw {
      status: response.status,

      data,
    }
  }

  return data as T
}