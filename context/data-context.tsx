"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { fetchCarData, simulateRealTimeData } from "@/lib/data-service"
import type { CarData, DataSharingSettings } from "@/types/car-data"

type DataContextType = {
  carData: CarData | null
  historicalData: CarData[]
  isLoading: boolean
  error: string | null
  refreshData: () => Promise<void>
  sharingSettings: DataSharingSettings
  updateSharingSettings: (settings: Partial<DataSharingSettings>) => void
  listedDataItems: CarData[]
  listDataForSale: (data: CarData, price: number) => void
  removeDataFromSale: (dataId: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [carData, setCarData] = useState<CarData | null>(null)
  const [historicalData, setHistoricalData] = useState<CarData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sharingSettings, setSharingSettings] = useState<DataSharingSettings>({
    shareLocation: true,
    shareDiagnostics: true,
    sharePerformance: true,
    shareFuelData: true,
  })
  const [listedDataItems, setListedDataItems] = useState<CarData[]>([])

  // Initial data load
  useEffect(() => {
    loadInitialData()

    // Set up real-time data simulation
    const interval = setInterval(() => {
      simulateRealTimeData()
        .then((newData) => {
          setCarData(newData)
          setHistoricalData((prev) => {
            const updated = [newData, ...prev]
            // Keep only the last 100 data points
            return updated.slice(0, 100)
          })
        })
        .catch((err) => {
          console.error("Error simulating real-time data:", err)
        })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const loadInitialData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchCarData()
      setCarData(data)
      setHistoricalData([data])
    } catch (err) {
      console.error("Error fetching car data:", err)
      setError("Failed to load car data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchCarData()
      setCarData(data)
      setHistoricalData((prev) => [data, ...prev].slice(0, 100))
    } catch (err) {
      console.error("Error refreshing car data:", err)
      setError("Failed to refresh car data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const updateSharingSettings = (settings: Partial<DataSharingSettings>) => {
    setSharingSettings((prev) => ({ ...prev, ...settings }))
  }

  const listDataForSale = (data: CarData, price: number) => {
    const listedData = { ...data, price, listedAt: new Date().toISOString() }
    setListedDataItems((prev) => [listedData, ...prev])
  }

  const removeDataFromSale = (dataId: string) => {
    setListedDataItems((prev) => prev.filter((item) => item.id !== dataId))
  }

  return (
    <DataContext.Provider
      value={{
        carData,
        historicalData,
        isLoading,
        error,
        refreshData,
        sharingSettings,
        updateSharingSettings,
        listedDataItems,
        listDataForSale,
        removeDataFromSale,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useCarData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useCarData must be used within a DataProvider")
  }
  return context
}
