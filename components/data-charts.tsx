"use client"

import { useState } from "react"
import type { CarData } from "@/types/car-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface DataChartsProps {
  data: CarData[]
}

export default function DataCharts({ data }: DataChartsProps) {
  const [timeRange, setTimeRange] = useState<"hour" | "day" | "week">("hour")

  // Process data for charts
  const processData = () => {
    // Sort data by timestamp
    const sortedData = [...data].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    // Limit data points based on time range
    let filteredData = sortedData
    const now = new Date().getTime()

    if (timeRange === "hour") {
      filteredData = sortedData.filter((d) => now - new Date(d.timestamp).getTime() <= 60 * 60 * 1000)
    } else if (timeRange === "day") {
      filteredData = sortedData.filter((d) => now - new Date(d.timestamp).getTime() <= 24 * 60 * 60 * 1000)
    } else if (timeRange === "week") {
      filteredData = sortedData.filter((d) => now - new Date(d.timestamp).getTime() <= 7 * 24 * 60 * 60 * 1000)
    }

    // Format data for charts
    return filteredData.map((d) => ({
      time: new Date(d.timestamp).toLocaleTimeString(),
      speed: d.speed,
      rpm: d.rpm,
      fuelLevel: d.fuelLevel,
      engineTemp: d.engineTemp,
      batteryLevel: d.batteryLevel,
    }))
  }

  const chartData = processData()

  return (
    <div className="h-full">
      <div className="mb-4 flex justify-between items-center">
        <Tabs defaultValue="speed" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="speed">Speed</TabsTrigger>
              <TabsTrigger value="engine">Engine</TabsTrigger>
              <TabsTrigger value="fuel">Fuel & Battery</TabsTrigger>
            </TabsList>

            <div className="flex space-x-2">
              <button
                onClick={() => setTimeRange("hour")}
                className={`px-3 py-1 text-sm rounded-md ${timeRange === "hour" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100"}`}
              >
                Hour
              </button>
              <button
                onClick={() => setTimeRange("day")}
                className={`px-3 py-1 text-sm rounded-md ${timeRange === "day" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100"}`}
              >
                Day
              </button>
              <button
                onClick={() => setTimeRange("week")}
                className={`px-3 py-1 text-sm rounded-md ${timeRange === "week" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100"}`}
              >
                Week
              </button>
            </div>
          </div>

          <TabsContent value="speed" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="speed" stroke="#2196F3" activeDot={{ r: 8 }} name="Speed (mph)" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="engine" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="rpm" stroke="#FF9800" name="RPM" />
                <Line yAxisId="right" type="monotone" dataKey="engineTemp" stroke="#F44336" name="Engine Temp (°F)" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="fuel" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="fuelLevel" stroke="#4CAF50" name="Fuel Level (%)" />
                <Line type="monotone" dataKey="batteryLevel" stroke="#9C27B0" name="Battery Level (%)" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
