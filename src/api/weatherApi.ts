import api from './axios'
import type {
  CurrentWeather,
  DailyWeather,
  ForecastWeather,
  HourlyWeather,
  WeatherRequest,
} from '../types/weather'

const buildParams = (request?: WeatherRequest) => {
  if (!request) return undefined
  const params: Record<string, string | number | boolean> = {}
  const city = request.city ?? request.cityName
  if (city) params.city = city
  if (request.days != null) params.days = request.days
  if (request.ai != null) params.ai = request.ai
  if (request.units) params.units = request.units
  if (request.lang) params.lang = request.lang
  return params
}

export const getCurrentWeather = async (request?: WeatherRequest) => {
  const response = await api.get<CurrentWeather>('/api/v1/weather/current', {
    params: buildParams(request),
  })
  return response.data
}

export const getForecastWeather = async (request?: WeatherRequest) => {
  const response = await api.get<ForecastWeather>('/api/v1/weather/forecast', {
    params: buildParams(request),
  })
  return response.data
}

export const getHourlyWeather = async (request?: WeatherRequest) => {
  const response = await api.get<HourlyWeather>('/api/v1/weather/hourly', {
    params: buildParams(request),
  })
  return response.data
}

export const getDailyWeather = async (request?: WeatherRequest) => {
  const response = await api.get<DailyWeather>('/api/v1/weather/daily', {
    params: buildParams(request),
  })
  return response.data
}
