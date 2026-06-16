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
  const response = await api.post<CurrentWeather>(
    '/api/v1/weather/current',
    {
      city: request?.city ?? request?.cityName,
      ai: request?.ai,
      units: request?.units,
      lang: request?.lang,
    }
  )

  return response.data
}

export const getForecastWeather = async (request?: WeatherRequest) => {
  const response = await api.post<ForecastWeather>(
    '/api/v1/weather/forecast',
    request
  )

  return response.data
}

export const getHourlyWeather = async (request?: WeatherRequest) => {
  const response = await api.post<HourlyWeather>('/api/v1/weather/hourly', {
    params: buildParams(request),
  })
  return response.data
}

export const getDailyWeather = async (request?: WeatherRequest) => {
  const response = await api.post<DailyWeather>('/api/v1/weather/daily', {
    params: buildParams(request),
  })
  return response.data
}
