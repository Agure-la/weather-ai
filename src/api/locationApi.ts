import api from './axios'
import type { LocationResponse, PageResponse } from '../types/location'

const DEFAULT_PAGE = 0
const DEFAULT_SIZE = 20

export const getAllLocations = async (page = DEFAULT_PAGE, size = DEFAULT_SIZE) => {
  const response = await api.get<PageResponse<LocationResponse>>('/api/v1/locations', {
    params: { page, size },
  })
  return response.data
}

export const searchLocations = async (city: string, page = DEFAULT_PAGE, size = DEFAULT_SIZE) => {
  const response = await api.get<PageResponse<LocationResponse>>('/api/v1/locations/search', {
    params: { city, page, size },
  })
  return response.data
}

export const getLocationByCity = async (city: string) => {
  const response = await api.get<LocationResponse>(
    `/api/v1/locations/${encodeURIComponent(city)}`,
  )
  return response.data
}
