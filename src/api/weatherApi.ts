import api from './axios'
import type {
  CurrentWeather,
  DailyWeather,
  ForecastWeather,
  HourlyWeather,
  WeatherRequest,
} from '../types/weather'

const buildWeatherRequest = (request?: WeatherRequest) => {
  if (!request) return undefined

  return {
    city: request.city ?? request.cityName,
    days: request.days,
    ai: request.ai,
    units: request.units,
    lang: request.lang,
  }
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
   const response = await api.post<HourlyWeather>(
    '/api/v1/weather/hourly',
    buildWeatherRequest(request)
  )
  return response.data
}

export const getDailyWeather = async (request?: WeatherRequest) => {
   const response = await api.post<DailyWeather>(
    '/api/v1/weather/daily',
    buildWeatherRequest(request)
  )
  return response.data
}
