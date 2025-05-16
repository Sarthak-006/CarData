import type { CarData } from "@/types/car-data"

// Sample OBD codes for simulation
const obdCodes = [
  { code: "P0420", description: "Catalyst System Efficiency Below Threshold" },
  { code: "P0171", description: "System Too Lean (Bank 1)" },
  { code: "P0300", description: "Random/Multiple Cylinder Misfire Detected" },
  { code: "P0455", description: "Evaporative Emission System Leak Detected (large leak)" },
  { code: "P0128", description: "Coolant Thermostat (Coolant Temperature Below Thermostat Regulating Temperature)" },
]

// Generate a random car data point
export function generateRandomCarData(): CarData {
  const hasError = Math.random() < 0.2 // 20% chance of having an error
  const errorCode = hasError ? obdCodes[Math.floor(Math.random() * obdCodes.length)] : null

  // Base location (somewhere in San Francisco)
  const baseLat = 37.7749
  const baseLng = -122.4194

  // Add small random variations to location
  const lat = baseLat + (Math.random() - 0.5) * 0.01
  const lng = baseLng + (Math.random() - 0.5) * 0.01

  // Calculate realistic fuel efficiency based on speed and conditions
  const baseSpeed = Math.floor(Math.random() * 75) // 0-75 mph
  const baseFuelEfficiency = 25 // Base MPG
  const speedFactor = baseSpeed < 65 ? 1 : 0.85 // Efficiency drops at high speeds
  const randomFactor = 0.9 + (Math.random() * 0.2) // +/- 10% random variation
  const fuelEfficiency = baseFuelEfficiency * speedFactor * randomFactor

  return {
    id: `data_${Date.now()}`,
    timestamp: new Date().toISOString(),
    speed: baseSpeed,
    rpm: 800 + Math.floor(Math.random() * 2200), // 800-3000 rpm
    fuelLevel: 10 + Math.floor(Math.random() * 90), // 10-100%
    engineTemp: 170 + Math.floor(Math.random() * 50), // 170-220 F
    tirePressure: {
      frontLeft: 32 + (Math.random() * 2 - 1),
      frontRight: 32 + (Math.random() * 2 - 1),
      rearLeft: 32 + (Math.random() * 2 - 1),
      rearRight: 32 + (Math.random() * 2 - 1)
    },
    location: {
      latitude: lat,
      longitude: lng,
    },
    diagnostics: {
      hasError,
      errorCode: errorCode?.code || null,
      errorDescription: errorCode?.description || null,
    },
    batteryLevel: 70 + Math.floor(Math.random() * 30), // 70-100%
    odometer: 10000 + Math.floor(Math.random() * 90000), // 10k-100k miles
    fuelEfficiency: Number(fuelEfficiency.toFixed(1)) // MPG
  }
}

// Fetch initial car data
export async function fetchCarData(): Promise<CarData> {
  // In a real app, this would fetch from an API or OBD device
  // For now, we'll generate random data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateRandomCarData())
    }, 500) // Simulate network delay
  })
}

// Simulate real-time data updates
export async function simulateRealTimeData(): Promise<CarData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateRandomCarData())
    }, 200)
  })
}

// Fetch historical data (simulated)
export async function fetchHistoricalData(days = 7): Promise<CarData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: CarData[] = []
      const now = new Date()

      for (let i = 0; i < days * 24; i++) {
        const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000).toISOString()
        data.push({
          ...generateRandomCarData(),
          timestamp,
        })
      }

      resolve(data)
    }, 1000)
  })
}

// Fetch marketplace listings (simulated)
export async function fetchMarketplaceListings(): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const listings = []

      for (let i = 0; i < 20; i++) {
        const data = generateRandomCarData()
        listings.push({
          id: `listing_${i}`,
          seller: `0x${Math.random().toString(36).substring(2, 10)}`,
          dataType: ["Location", "Diagnostics", "Performance", "Fuel"][Math.floor(Math.random() * 4)],
          price: (0.5 + Math.random() * 9.5).toFixed(2),
          rating: Math.floor(Math.random() * 5) + 1,
          reviews: Math.floor(Math.random() * 100),
          sample: data,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
      }

      resolve(listings)
    }, 1000)
  })
}
