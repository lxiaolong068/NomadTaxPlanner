'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { TripRecord, CountrySummary } from '@/types'
import { calculateDaysBetween } from '@/lib/utils'

interface DayTrackerState {
  trips: TripRecord[]
  addTrip: (trip: Omit<TripRecord, 'id' | 'days'>) => void
  updateTrip: (id: string, trip: Partial<Omit<TripRecord, 'id' | 'days'>>) => void
  removeTrip: (id: string) => void
  clearAllTrips: () => void
  getCountrySummaries: (year?: number) => CountrySummary[]
  getTotalDaysInCountry: (countryCode: string, year?: number) => number
  getTripsForYear: (year: number) => TripRecord[]
}

const generateId = (): string => {
  return `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const useDayTrackerStore = create<DayTrackerState>()(
  persist(
    (set, get) => ({
      trips: [],

      addTrip: (tripData) => {
        const days = calculateDaysBetween(
          new Date(tripData.startDate),
          new Date(tripData.endDate)
        )

        const newTrip: TripRecord = {
          id: generateId(),
          ...tripData,
          days,
        }

        set((state) => ({
          trips: [...state.trips, newTrip].sort(
            (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          ),
        }))
      },

      updateTrip: (id, tripData) => {
        set((state) => ({
          trips: state.trips.map((trip) => {
            if (trip.id !== id) return trip

            const updatedTrip = { ...trip, ...tripData }

            // Recalculate days if dates changed
            if (tripData.startDate || tripData.endDate) {
              updatedTrip.days = calculateDaysBetween(
                new Date(updatedTrip.startDate),
                new Date(updatedTrip.endDate)
              )
            }

            return updatedTrip
          }).sort(
            (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          ),
        }))
      },

      removeTrip: (id) => {
        set((state) => ({
          trips: state.trips.filter((trip) => trip.id !== id),
        }))
      },

      clearAllTrips: () => {
        set({ trips: [] })
      },

      getCountrySummaries: (year?: number) => {
        const { trips } = get()
        const filteredTrips = year
          ? trips.filter((trip) => {
              const tripYear = new Date(trip.startDate).getFullYear()
              return tripYear === year
            })
          : trips

        const countryMap = new Map<string, CountrySummary>()

        filteredTrips.forEach((trip) => {
          const existing = countryMap.get(trip.countryCode)

          if (existing) {
            existing.totalDays += trip.days
            existing.trips.push(trip)

            // Update first and last visit dates
            const tripStart = new Date(trip.startDate)
            const tripEnd = new Date(trip.endDate)

            if (tripStart < new Date(existing.firstVisit)) {
              existing.firstVisit = trip.startDate
            }
            if (tripEnd > new Date(existing.lastVisit)) {
              existing.lastVisit = trip.endDate
            }
          } else {
            countryMap.set(trip.countryCode, {
              countryCode: trip.countryCode,
              countryName: trip.countryName,
              totalDays: trip.days,
              trips: [trip],
              firstVisit: trip.startDate,
              lastVisit: trip.endDate,
            })
          }
        })

        return Array.from(countryMap.values()).sort(
          (a, b) => b.totalDays - a.totalDays
        )
      },

      getTotalDaysInCountry: (countryCode: string, year?: number) => {
        const summaries = get().getCountrySummaries(year)
        const country = summaries.find((s) => s.countryCode === countryCode)
        return country?.totalDays ?? 0
      },

      getTripsForYear: (year: number) => {
        const { trips } = get()
        return trips.filter((trip) => {
          const tripYear = new Date(trip.startDate).getFullYear()
          return tripYear === year
        })
      },
    }),
    {
      name: 'nomad-tax-planner-trips',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
)

// Selector hooks for optimized re-renders
export const useTrips = () => useDayTrackerStore((state) => state.trips)
export const useAddTrip = () => useDayTrackerStore((state) => state.addTrip)
export const useRemoveTrip = () => useDayTrackerStore((state) => state.removeTrip)
export const useClearAllTrips = () => useDayTrackerStore((state) => state.clearAllTrips)
