import { useQuery } from '@tanstack/react-query'
import { getDailyWeather } from '../../api/weatherApi'
import type { LocationResponse } from '../../types/location'
import {
  formatError,
  getDateLabel,
  getDescription,
  getHighTemp,
  getLowTemp,
  weatherEmoji,
} from '../../utils/weatherHelpers'
import GlassCard from '../ui/GlassCard'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorMessage from '../ui/ErrorMessage'

interface DailyViewProps {
  location: LocationResponse | null
}

export default function DailyView({ location }: DailyViewProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', 'daily', location?.city],
    queryFn: () => getDailyWeather({ city: location!.city }),
    enabled: !!location,
  })

  if (!location) {
    return (
      <GlassCard className="text-center text-slate-500">
        Select a location to view daily summary
      </GlassCard>
    )
  }

  const days = data?.days ?? data?.daily ?? []

  return (
    <GlassCard>
      <h3 className="mb-6 text-lg font-semibold text-white">Daily Summary</h3>

      {isLoading && <LoadingSpinner label="Loading daily summary..." />}
      {error && <ErrorMessage message={formatError(error)} />}

      {!isLoading && !error && (
        <div className="space-y-3">
          {days.map((day, index) => {
            const desc = getDescription(day)
            const high = getHighTemp(day)
            const low = getLowTemp(day)
            return (
              <div
                key={`${getDateLabel(day)}-${index}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/40 px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{weatherEmoji(desc)}</span>
                  <div>
                    <p className="font-medium text-white">{getDateLabel(day)}</p>
                    <p className="text-sm capitalize text-slate-400">{desc}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-white">
                    {high != null ? `${Math.round(high)}°` : '—'}
                    <span className="mx-1 text-slate-600">/</span>
                    {low != null ? `${Math.round(low)}°` : '—'}
                  </p>
                  {day.precipitation != null && (
                    <p className="text-xs text-sky-400">{day.precipitation}% precip</p>
                  )}
                </div>
              </div>
            )
          })}

          {days.length === 0 && (
            <p className="py-8 text-center text-slate-500">No daily data available</p>
          )}
        </div>
      )}
    </GlassCard>
  )
}
