import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FiMapPin, FiSearch } from 'react-icons/fi'
import { getAllLocations, searchLocations } from '../../api/locationApi'
import type { LocationResponse } from '../../types/location'
import { formatError } from '../../utils/weatherHelpers'
import GlassCard from '../ui/GlassCard'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingSpinner from '../ui/LoadingSpinner'

interface LocationPanelProps {
  selectedId: string | null
  onSelect: (location: LocationResponse) => void
}

const PAGE_SIZE = 20

export default function LocationPanel({ selectedId, onSelect }: LocationPanelProps) {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchInput.trim()), 350)
    return () => clearTimeout(timer)
  }, [searchInput])

  const isSearching = debouncedQuery.length > 0

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['locations', isSearching ? 'search' : 'all', debouncedQuery],
    queryFn: () =>
      isSearching
        ? searchLocations(debouncedQuery, 0, PAGE_SIZE)
        : getAllLocations(0, PAGE_SIZE),
  })

  const locations = data?.content ?? []

  return (
    <GlassCard className="h-full">
      <div className="mb-5 flex items-center gap-2">
        <FiMapPin className="text-sky-400" />
        <h2 className="text-lg font-semibold text-white">Search Locations</h2>
      </div>

      <div className="relative mb-5">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search by city name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/50 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
        />
      </div>

      {isLoading && <LoadingSpinner label="Loading locations..." />}

      {error && <ErrorMessage message={formatError(error)} />}

      {!isLoading && !error && (
        <>
          <p className="mb-3 text-xs text-slate-500">
            {isSearching
              ? `${data?.totalElements ?? 0} result(s) for "${debouncedQuery}"`
              : `${data?.totalElements ?? 0} available location(s)`}
            {isFetching && !isLoading && ' · updating...'}
          </p>

          <ul className="max-h-[420px] space-y-2 overflow-y-auto">
            {locations.length === 0 && (
              <li className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-slate-500">
                {isSearching
                  ? 'No locations match your search.'
                  : 'No locations available.'}
              </li>
            )}

            {locations.map((location) => {
              const isSelected = selectedId === location.id
              return (
                <li key={location.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(location)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                      isSelected
                        ? 'border-sky-400/50 bg-sky-500/10 ring-1 ring-sky-400/30'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <p className="font-medium text-white">{location.city}</p>
                    <p className="text-xs text-slate-400">
                      {location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </GlassCard>
  )
}
