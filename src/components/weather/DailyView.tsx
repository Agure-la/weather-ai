import { useQuery } from '@tanstack/react-query'
import { getDailyWeather } from '../../api/weatherApi'
import type { LocationResponse } from '../../types/location'
import {
  formatError
} from '../../utils/weatherHelpers'
import GlassCard from '../ui/GlassCard'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorMessage from '../ui/ErrorMessage'
import type { HourlyForecast } from '../../types/weather'

interface DailyViewProps {
  location: LocationResponse | null
}

type DailyGroup = {
  date: string
  temperatures: number[]
  hours: HourlyForecast[]
}

export default function DailyView({ location }: DailyViewProps) {

  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', 'daily', location?.city],
    queryFn: () =>
      getDailyWeather({
        city: location!.city,
      }),
    enabled: !!location,
  })


  if (!location) {
    return (
      <GlassCard className="text-center text-slate-500">
        Select a location to view daily summary
      </GlassCard>
    )
  }


  const days =
  data?.hourly
    ?.reduce<DailyGroup[]>((acc, hour) => {
      const date = hour.time.split('T')[0]

      const existing = acc.find(
        (day) => day.date === date
      )


        if (existing) {

          existing.temperatures.push(hour.temperature)
          existing.hours.push(hour)

        } else {

          acc.push({
            date,
            temperatures: [hour.temperature],
            hours: [hour],
          })

        }


        return acc

      }, [])
      .map((day) => {

        const temps = day.temperatures

        const high = Math.max(...temps)
        const low = Math.min(...temps)

        const firstHour = day.hours[0]


        return {
          date: day.date,
          high,
          low,
          condition: firstHour,
          precipitation:
            firstHour.precipitation_probability,
        }

      }) ?? []



  return (

    <GlassCard>

      <h3 className="mb-6 text-lg font-semibold text-white">
        Daily Summary
      </h3>


      {isLoading && (
        <LoadingSpinner label="Loading daily summary..." />
      )}


      {error && (
        <ErrorMessage message={formatError(error)} />
      )}



      {!isLoading && !error && (

        <div className="space-y-3">


          {days.map((day, index) => {


            const desc =
              `Condition ${day.condition.condition_code}`


            return (

              <div
                key={`${day.date}-${index}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/40 px-5 py-4"
              >


                <div className="flex items-center gap-4">


                  <img
                    src={day.condition.icon}
                    alt="weather"
                    className="h-12 w-12"
                  />


                  <div>

                    <p className="font-medium text-white">

                      {new Date(day.date).toLocaleDateString(
                        'en-US',
                        {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                        }
                      )}

                    </p>


                    <p className="text-sm capitalize text-slate-400">

                      {desc}

                    </p>


                  </div>


                </div>



                <div className="text-right">


                  <p className="text-lg font-semibold text-white">

                    {Math.round(day.high)}°

                    <span className="mx-1 text-slate-600">
                      /
                    </span>

                    {Math.round(day.low)}°

                  </p>



                  {day.precipitation != null && (

                    <p className="text-xs text-sky-400">

                      {day.precipitation}% precip

                    </p>

                  )}


                </div>


              </div>

            )

          })}



          {days.length === 0 && (

            <p className="py-8 text-center text-slate-500">
              No daily data available
            </p>

          )}


        </div>

      )}

    </GlassCard>

  )
}
