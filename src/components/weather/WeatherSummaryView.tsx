import { useQuery } from '@tanstack/react-query'

import GlassCard from '../ui/GlassCard'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorMessage from '../ui/ErrorMessage'
import { getWeatherSummary } from '../../api/weatherApi'
import { formatError } from '../../utils/weatherHelpers'

interface HourlyViewProps {
  location?: {
    city: string
  } | null
}

export default function WeatherSummaryView({
  location,
}: HourlyViewProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', 'summary', location?.city],
    queryFn: () => getWeatherSummary({
        city: location!.city,
      }),
    enabled: !!location,
  })

  if (!location) {
    return (
      <GlassCard className="text-center text-slate-500">
        Select a location to view weather summary
      </GlassCard>
    )
  }

  return (
    <GlassCard>
      <h3 className="mb-6 text-lg font-semibold text-white">
        Weather Summary
      </h3>

      {isLoading && (
        <LoadingSpinner label="Loading weather summary..." />
      )}

      {error && (
        <ErrorMessage message={formatError(error)} />
      )}

      {!isLoading && !error && (
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
          <p className="whitespace-pre-wrap text-slate-200 leading-relaxed">
            {data?.summary ?? 'No weather summary available'}
          </p>
        </div>
      )}
    </GlassCard>
  )
}