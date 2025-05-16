"use client"

import { useEffect, useRef } from "react"
import type { CarData } from "@/types/car-data"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface CarDataMapProps {
  carData: CarData[]
  currentLocation?: { latitude: number; longitude: number }
}

export default function CarDataMap({ carData, currentLocation }: CarDataMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Layer[]>([])

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map if not already initialized
    if (!mapInstanceRef.current) {
      const { latitude, longitude } = currentLocation || carData[0]?.location || { latitude: 0, longitude: 0 }

      mapInstanceRef.current = L.map(mapRef.current).setView([latitude, longitude], 14)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current)
    }

    // Update markers
    updateMarkers()

    return () => {
      // Clean up markers
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.remove())
        markersRef.current = []
      }
    }
  }, [carData, currentLocation])

  const updateMarkers = () => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    if (!mapInstanceRef.current) return

    // Add current location marker
    const { latitude, longitude } = currentLocation || carData[0]?.location || { latitude: 0, longitude: 0 }

    const currentMarker = L.circleMarker([latitude, longitude], {
      radius: 8,
      fillColor: "#4CAF50",
      color: "#fff",
      weight: 2,
      opacity: 1,
      fillOpacity: 1
    }).addTo(mapInstanceRef.current)

    currentMarker.bindPopup("Current Location")
    markersRef.current.push(currentMarker)

    // Center map on current location
    mapInstanceRef.current.setView([latitude, longitude])

    // Add historical markers
    carData.forEach((data, index) => {
      if (index === 0) return // Skip the first one as it's the same as current

      const marker = L.circleMarker(
        [data.location.latitude, data.location.longitude],
        {
          radius: 6,
          fillColor: "#2196F3",
          color: "#fff",
          weight: 1,
          opacity: 0.7,
          fillOpacity: 0.7
        }
      ).addTo(mapInstanceRef.current!)

      marker.bindPopup(`Location at ${new Date(data.timestamp).toLocaleTimeString()}`)
      markersRef.current.push(marker)
    })

    // Draw path line if we have historical data
    if (carData.length > 1) {
      const pathCoordinates = [
        [latitude, longitude],
        ...carData.slice(1).map(data => [data.location.latitude, data.location.longitude])
      ] as [number, number][]

      const path = L.polyline(pathCoordinates, {
        color: "#2196F3",
        opacity: 0.8,
        weight: 3
      }).addTo(mapInstanceRef.current)

      markersRef.current.push(path)
    }
  }

  return (
    <div className="h-full">
      <div ref={mapRef} className="h-full rounded-md" />
    </div>
  )
}
