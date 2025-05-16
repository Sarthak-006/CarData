"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet.heat"

interface HeatMapProps {
    data: {
        lat: number
        lng: number
        weight: number
    }[]
    config: {
        radius: number
        opacity: number
    }
}

export default function HeatMap({ data, config }: HeatMapProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<L.Map | null>(null)
    const heatLayerRef = useRef<any>(null)

    useEffect(() => {
        if (!mapRef.current || !data.length) return

        // Initialize map if not already initialized
        if (!mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapRef.current).setView(
                [data[0].lat, data[0].lng],
                13
            )

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapInstanceRef.current)
        }

        // Convert data to heatmap format
        const heatData = data.map(point => [point.lat, point.lng, point.weight])

        // Remove existing heat layer if it exists
        if (heatLayerRef.current) {
            heatLayerRef.current.remove()
        }

        // Add new heat layer
        heatLayerRef.current = (L as any).heatLayer(heatData, {
            radius: config.radius,
            blur: config.radius * 1.5,
            maxZoom: 18,
            max: 1.0,
            gradient: { 0.4: "blue", 0.65: "lime", 1: "red" },
        }).addTo(mapInstanceRef.current)

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null
            }
        }
    }, [data, config])

    return <div ref={mapRef} className="h-[300px] w-full rounded-lg" />
} 