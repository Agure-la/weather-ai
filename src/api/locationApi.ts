import api from './axios'
import type { CreateLocationRequest, LocationResponse } from '../types/location'

export const createLocation = async (request: CreateLocationRequest) => {
  const response = await api.post<LocationResponse>('/api/v1/locations', request)
  return response.data
}

export const getLocations = async () => {
  const response = await api.get<LocationResponse[]>('/api/v1/locations')
  return response.data
}

export const deleteLocation = async (id: string) => {
  const response = await api.delete(`/api/v1/locations/${id}`)
  return response.data
}
