import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FiMapPin, FiPlus, FiTrash2 } from 'react-icons/fi'
import { createLocation, deleteLocation, getLocations } from '../../api/locationApi'
import type { LocationResponse } from '../../types/location'
import { formatError } from '../../utils/weatherHelpers'
import GlassCard from '../ui/GlassCard'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingSpinner from '../ui/LoadingSpinner'

interface LocationPanelProps {
  selectedId: string | null
  onSelect: (location: LocationResponse) => void
}

export default function LocationPanel({ selectedId, onSelect }: LocationPanelProps) {
  const queryClient = useQueryClient()
  const [city, setCity] = useState('')
  const [formError, setFormError] = useState('')

  const { data: locations, isLoading, error } = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
  })

  const createMutation = useMutation({
    mutationFn: createLocation,
    onSuccess: (location) => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
      setCity('')
      setFormError('')
      onSelect(location)
    },
    onError: (err) => setFormError(formatError(err)),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['locations'] }),
  })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!city.trim()) return
    createMutation.mutate({ city: city.trim() })
  }

  return (
    <GlassCard className="h-full">
      <div className="mb-5 flex items-center gap-2">
        <FiMapPin className="text-sky-400" />
        <h2 className="text-lg font-semibold text-white">Your Locations</h2>
      </div>

      <form onSubmit={handleCreate} className="mb-5 flex gap-2">
        <input
          type="text"
          placeholder="Add a city (e.g. Nairobi)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-400/50"
        />
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="inline-flex items-center gap-1 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-400 disabled:opacity-60"
        >
          <FiPlus />
          Add
        </button>
      </form>

      {formError && <div className="mb-4"><ErrorMessage message={formError} /></div>}

      {isLoading && <LoadingSpinner label="Loading locations..." />}

      {error && <ErrorMessage message={formatError(error)} />}

      {!isLoading && !error && (
        <ul className="space-y-2">
          {locations?.length === 0 && (
            <li className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-slate-500">
              No locations yet. Add a city to get started.
            </li>
          )}

          {locations?.map((location) => {
            const isSelected = selectedId === location.id
            return (
              <li key={location.id}>
                <div
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 transition ${
                    isSelected
                      ? 'border-sky-400/50 bg-sky-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(location)}
                    className="flex-1 text-left"
                  >
                    <p className="font-medium text-white">{location.city}</p>
                    <p className="text-xs text-slate-400">
                      {location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteMutation.mutate(location.id)}
                    className="ml-2 rounded-lg p-2 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-400"
                    aria-label={`Delete ${location.city}`}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </GlassCard>
  )
}
