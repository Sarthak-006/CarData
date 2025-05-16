export interface CarData {
  id: string
  timestamp: string
  speed: number
  rpm: number
  fuelLevel: number
  engineTemp: number
  tirePressure: {
    frontLeft: number
    frontRight: number
    rearLeft: number
    rearRight: number
  }
  location: {
    latitude: number
    longitude: number
  }
  diagnostics: {
    hasError: boolean
    errorCode: string | null
    errorDescription: string | null
  }
  batteryLevel: number
  odometer: number
  price?: number
  listedAt?: string
  fuelEfficiency: number // MPG
}

export interface DataSharingSettings {
  shareLocation: boolean
  shareDiagnostics: boolean
  sharePerformance: boolean
  shareFuelData: boolean
}

export interface MarketplaceListing {
  id: string
  seller: string
  dataType: string
  price: string
  rating: number
  reviews: number
  sample: CarData
  createdAt: string
}
