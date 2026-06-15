export interface LocationResponse {
  id: string
  city: string
  latitude: number
  longitude: number
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}
