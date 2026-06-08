import { useQuery } from '@tanstack/react-query'
import { getHourlyWeather } from '../../api/weatherApi'
import type { LocationResponse } from '../../types/location'
import {
  formatError,
  getDescription,
  getTemp,
  getTimeLabel,
  weatherEmoji,
} from '../../utils/weatherHelpers'
import GlassCard from '../ui/GlassCard'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorMessage from '../ui/ErrorMessage'

interface HourlyViewProps {
  location: LocationResponse | null
}

export default function HourlyView({ location }: HourlyViewProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', 'hourly', location?.city],
    queryFn: () => getHourlyWeather({ city: location!.city }),
    enabled: !!location,
  })

  if (!location) {
    return (
      <GlassCard className="text-center text-slate-500">
        Select a location to view hourly forecast
      </GlassCard>
    )
  }

  const hours = data?.hours ?? data?.hourly ?? []

  return (
    <GlassCard>
      <h3 className="mb-6 text-lg font-semibold text-white">Hourly Forecast</h3>

      {isLoading && <LoadingSpinner label="Loading hourly data..." />}
      {error && <ErrorMessage message={formatError(error)} />}

      {!isLoading && !error && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {hours.map((hour, index) => {
            const desc = getDescription(hour)
            const temp = getTemp(hour)
            return (
              <div
                key={`${getTimeLabel(hour)}-${index}`}
                className="min-w-[100px] shrink-0 rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center"
              >
                <p className="text-xs text-slate-400">{getTimeLabel(hour)}</p>
                <p className="my-2 text-2xl">{weatherEmoji(desc)}</p>
                <p className="text-lg font-semibold text-white">
                  {temp != null ? `${Math.round(temp)}°` : '—'}
                </p>
                <p className="mt-1 text-xs capitalize text-slate-500">{desc}</p>
              </div>
            )
          })}

          {hours.length === 0 && (
            <p className="w-full py-8 text-center text-slate-500">No hourly data available</p>
          )}
        </div>
      )}
    </GlassCard>
  )
}
