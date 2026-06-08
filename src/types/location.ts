export interface CreateLocationRequest {
  city: string
  latitude?: number | string
  longitude?: number | string
}

export interface LocationResponse {
  id: string
  city: string
  latitude: number
  longitude: number
}
