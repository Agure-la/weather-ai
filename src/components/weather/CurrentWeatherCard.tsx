import { useQuery } from '@tanstack/react-query'
import { FiDroplet, FiEye, FiSun, FiWind } from 'react-icons/fi'
import { getCurrentWeather } from '../../api/weatherApi'
import type { LocationResponse } from '../../types/location'
import { formatError, getDescription, getTemp, weatherEmoji } from '../../utils/weatherHelpers'
import GlassCard from '../ui/GlassCard'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorMessage from '../ui/ErrorMessage'

interface CurrentWeatherCardProps {
  location: LocationResponse | null
}

export default function CurrentWeatherCard({ location }: CurrentWeatherCardProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', 'current', location?.city],
    queryFn: () => getCurrentWeather({ city: location!.city }),
    enabled: !!location,
  })

  if (!location) {
    return (
      <GlassCard className="flex min-h-[280px] items-center justify-center text-slate-500">
        Select a location to view current weather
      </GlassCard>
    )
  }

  if (isLoading) return <GlassCard><LoadingSpinner label="Fetching current weather..." /></GlassCard>
  if (error) return <GlassCard><ErrorMessage message={formatError(error)} /></GlassCard>

  const temp = data ? getTemp(data) : null
  const description = data ? getDescription(data) : '—'

  const stats = [
    { icon: FiDroplet, label: 'Humidity', value: data?.humidity != null ? `${data.humidity}%` : '—' },
    { icon: FiWind, label: 'Wind', value: data?.windSpeed != null ? `${data.windSpeed} m/s` : '—' },
    { icon: FiEye, label: 'Visibility', value: data?.visibility != null ? `${data.visibility} km` : '—' },
    { icon: FiSun, label: 'UV Index', value: data?.uvIndex != null ? String(data.uvIndex) : '—' },
  ]

  return (
    <GlassCard className="overflow-hidden">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-sky-300">Current Weather</p>
          <h2 className="mt-1 text-3xl font-bold text-white">{location.city}</h2>
          <p className="mt-2 capitalize text-slate-300">{description}</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-6xl">{weatherEmoji(description)}</span>
          <div>
            <p className="text-6xl font-light text-white">
              {temp != null ? `${Math.round(temp)}°` : '—'}
            </p>
            {data?.feelsLike != null && (
              <p className="text-sm text-slate-400">Feels like {Math.round(data.feelsLike)}°</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-white/10 bg-slate-900/40 px-4 py-3"
          >
            <div className="mb-1 flex items-center gap-2 text-slate-400">
              <Icon className="text-sky-400" />
              <span className="text-xs">{label}</span>
            </div>
            <p className="text-lg font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
