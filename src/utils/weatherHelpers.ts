import type { ForecastDay, HourlyForecast } from '../types/weather'

export const getTemp = (item: Record<string, unknown>): number | null => {
  const value = item.temperature ?? item.temp ?? item.high ?? item.maxTemp
  return typeof value === 'number' ? value : null
}

export const getLowTemp = (item: ForecastDay): number | null => {
  const value = item.low ?? item.minTemp
  return typeof value === 'number' ? value : null
}

export const getHighTemp = (item: ForecastDay): number | null => {
  const value = item.high ?? item.maxTemp ?? item.temperature
  return typeof value === 'number' ? value : null
}

export const getDescription = (item: Record<string, unknown>): string => {
  const value = item.description ?? item.condition
  return typeof value === 'string' ? value : '—'
}

export const getTimeLabel = (item: HourlyForecast): string => {
  const value = item.time ?? item.hour
  if (typeof value !== 'string') return '—'
  if (value.includes('T')) {
    return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  return value
}

export const getDateLabel = (item: ForecastDay): string => {
  const value = item.date ?? item.day
  if (typeof value !== 'string') return '—'
  const parsed = new Date(value)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
  }
  return value
}

export const weatherEmoji = (description: string): string => {
  const text = description.toLowerCase()
  if (text.includes('thunder') || text.includes('storm')) return '⛈️'
  if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) return '🌧️'
  if (text.includes('snow') || text.includes('sleet') || text.includes('blizzard')) return '❄️'
  if (text.includes('fog') || text.includes('mist') || text.includes('haze')) return '🌫️'
  if (text.includes('cloud') || text.includes('overcast')) return '☁️'
  if (text.includes('partly') || text.includes('few')) return '⛅'
  if (text.includes('clear') || text.includes('sunny') || text.includes('fair')) return '☀️'
  if (text.includes('wind')) return '💨'
  return '🌤️'
}

export const formatError = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response
    if (response?.data?.message) return response.data.message
  }
  if (error instanceof Error) return error.message
  return 'Something went wrong. Please try again.'
}

export const formatCoordinates = (
  latitude: number | null | undefined,
  longitude: number | null | undefined,
): string => {
  if (latitude == null || longitude == null) return 'Coordinates pending'
  return `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`
}

export const locationId = (id: string | number): string => String(id)
