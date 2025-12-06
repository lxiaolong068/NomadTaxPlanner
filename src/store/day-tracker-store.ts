'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { TripRecord, CountrySummary } from '@/types'
import { calculateDaysBetween, formatDate } from '@/lib/utils'

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
              const tripStart = new Date(`${trip.startDate}T00:00:00`)
              const tripEnd = new Date(`${trip.endDate}T00:00:00`)
              const yearStart = new Date(`${year}-01-01T00:00:00`)
              const yearEnd = new Date(`${year}-12-31T00:00:00`)
              return tripStart <= yearEnd && tripEnd >= yearStart
            })
          : trips

        const countryMap = new Map<string, CountrySummary>()

        filteredTrips.forEach((trip) => {
          const tripStart = new Date(`${trip.startDate}T00:00:00`)
          const tripEnd = new Date(`${trip.endDate}T00:00:00`)
          const yearStart = year ? new Date(`${year}-01-01T00:00:00`) : null
          const yearEnd = year ? new Date(`${year}-12-31T00:00:00`) : null

          // If a specific year is selected, allocate only the overlapping days
          const overlapStart =
            yearStart && tripStart < yearStart ? yearStart : tripStart
          const overlapEnd = yearEnd && tripEnd > yearEnd ? yearEnd : tripEnd

          const daysForPeriod =
            year && (overlapEnd < overlapStart)
              ? 0
              : calculateDaysBetween(overlapStart, overlapEnd)

          const daysToAdd = year ? daysForPeriod : trip.days
          if (year && daysToAdd === 0) {
            return
          }

          const firstVisitDate = year
            ? overlapStart
            : tripStart
          const lastVisitDate = year ? overlapEnd : tripEnd

          const existing = countryMap.get(trip.countryCode)

          if (existing) {
            existing.totalDays += daysToAdd
            existing.trips.push(trip)

            // Update first and last visit dates
            if (firstVisitDate < new Date(existing.firstVisit)) {
              existing.firstVisit = formatDate(firstVisitDate)
            }
            if (lastVisitDate > new Date(existing.lastVisit)) {
              existing.lastVisit = formatDate(lastVisitDate)
            }
          } else {
            countryMap.set(trip.countryCode, {
              countryCode: trip.countryCode,
              countryName: trip.countryName,
              totalDays: daysToAdd,
              trips: [trip],
              firstVisit: formatDate(firstVisitDate),
              lastVisit: formatDate(lastVisitDate),
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
          const tripStart = new Date(`${trip.startDate}T00:00:00`)
          const tripEnd = new Date(`${trip.endDate}T00:00:00`)
          const yearStart = new Date(`${year}-01-01T00:00:00`)
          const yearEnd = new Date(`${year}-12-31T00:00:00`)
          return tripStart <= yearEnd && tripEnd >= yearStart
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
