import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FiCpu } from 'react-icons/fi'
import { getForecastWeather } from '../../api/weatherApi'
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

interface ForecastViewProps {
  location: LocationResponse | null
}

export default function ForecastView({ location }: ForecastViewProps) {
  const [days, setDays] = useState(7)
  const [aiEnabled, setAiEnabled] = useState(true)

  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', 'forecast', location?.city, days, aiEnabled],
    queryFn: () =>
      getForecastWeather({
        city: location!.city,
        days,
        ai: aiEnabled,
      }),
    enabled: !!location,
  })

  if (!location) {
    return (
      <GlassCard className="text-center text-slate-500">
        Select a location to view the forecast
      </GlassCard>
    )
  }

  const forecastDays = data?.days ?? data?.forecast ?? []

  return (
    <div className="space-y-4">
      <GlassCard>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Multi-day Forecast</h3>
            <p className="text-sm text-slate-400">{location.city} · {days} days</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-white outline-none"
            >
              {[3, 5, 7, 10, 14].map((n) => (
                <option key={n} value={n}>
                  {n} days
                </option>
              ))}
            </select>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={aiEnabled}
                onChange={(e) => setAiEnabled(e.target.checked)}
                className="accent-sky-400"
              />
              <FiCpu className="text-sky-400" />
              AI Summary
            </label>
          </div>
        </div>

        {isLoading && <LoadingSpinner label="Loading forecast..." />}
        {error && <ErrorMessage message={formatError(error)} />}

        {!isLoading && !error && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {forecastDays.map((day, index) => {
              const desc = getDescription(day)
              const high = getHighTemp(day)
              const low = getLowTemp(day)
              return (
                <div
                  key={`${getDateLabel(day)}-${index}`}
                  className="rounded-xl border border-white/10 bg-slate-900/40 p-4 transition hover:border-sky-400/30"
                >
                  <p className="text-sm font-medium text-slate-300">{getDateLabel(day)}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-3xl">{weatherEmoji(desc)}</span>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-white">
                        {high != null ? `${Math.round(high)}°` : '—'}
                      </p>
                      <p className="text-sm text-slate-500">
                        {low != null ? `${Math.round(low)}°` : '—'}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs capitalize text-slate-400">{desc}</p>
                </div>
              )
            })}

            {forecastDays.length === 0 && (
              <p className="col-span-full py-8 text-center text-slate-500">No forecast data available</p>
            )}
          </div>
        )}
      </GlassCard>

      {aiEnabled && (data?.aiSummary || data?.summary) && (
        <GlassCard className="border-sky-400/20 bg-gradient-to-br from-sky-500/10 to-indigo-500/10">
          <div className="mb-2 flex items-center gap-2 text-sky-300">
            <FiCpu />
            <h4 className="font-semibold">AI Weather Summary</h4>
          </div>
          <p className="leading-relaxed text-slate-200">{data.aiSummary ?? data.summary}</p>
        </GlassCard>
      )}
    </div>
  )
}
