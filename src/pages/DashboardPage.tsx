import { useEffect, useState } from 'react'
import { FiCalendar, FiClock, FiCloud, FiSun ,FiFileText} from 'react-icons/fi'
import LocationPanel from '../components/locations/LocationPanel'
import CurrentWeatherCard from '../components/weather/CurrentWeatherCard'
import ForecastView from '../components/weather/ForecastView'
import HourlyView from '../components/weather/HourlyView'
import DailyView from '../components/weather/DailyView'
import WeatherSummaryView from '../components/weather/WeatherSummaryView'
import type { LocationResponse } from '../types/location'

type WeatherTab = 'current' | 'forecast' | 'hourly' | 'daily' | 'summary'

const tabs: { id: WeatherTab; label: string; icon: typeof FiSun }[] = [
  { id: 'current', label: 'Current', icon: FiSun },
  { id: 'forecast', label: 'Forecast', icon: FiCloud },
  { id: 'hourly', label: 'Hourly', icon: FiClock },
  { id: 'daily', label: 'Daily', icon: FiCalendar },
  { id: 'summary', label: 'Summary', icon: FiFileText },
]

export default function DashboardPage() {
  const [selectedLocation, setSelectedLocation] = useState<LocationResponse | null>(null)
  const [activeTab, setActiveTab] = useState<WeatherTab>('current')

  useEffect(() => {
    const saved = sessionStorage.getItem('selected-location')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        sessionStorage.removeItem('selected-location')
      }
    }
  }, [])

  const handleSelectLocation = (location: LocationResponse) => {
    setSelectedLocation(location)
    sessionStorage.setItem('selected-location', JSON.stringify(location))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Weather Dashboard</h1>
        <p className="mt-1 text-slate-400">
          Search for a location and explore real-time weather intelligence
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <LocationPanel
          selectedId={selectedLocation?.id ?? null}
          onSelect={handleSelectLocation}
        />

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition sm:flex-none ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon />
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'current' && <CurrentWeatherCard location={selectedLocation} />}
          {activeTab === 'forecast' && <ForecastView location={selectedLocation} />}
          {activeTab === 'hourly' && <HourlyView location={selectedLocation} />}
          {activeTab === 'daily' && <DailyView location={selectedLocation} />}
          {activeTab === 'summary' && <WeatherSummaryView location={selectedLocation} />}
        </div>
      </div>
    </div>
  )
}
