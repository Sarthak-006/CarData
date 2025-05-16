"use client"

import { useState, useEffect } from "react"
import { useCarData } from "@/context/data-context"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertTriangle, Gauge, Droplet, Thermometer, Battery, Car } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Import the map component dynamically to avoid SSR issues
const CarDataMap = dynamic(() => import("@/components/car-data-map"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-100 animate-pulse rounded-md"></div>,
})

// Import the charts dynamically
const DataCharts = dynamic(() => import("@/components/data-charts"), {
  loading: () => <div className="h-[300px] bg-gray-100 animate-pulse rounded-md"></div>,
})

interface EarningsCardProps {
  title: string
  value: number
}

function EarningsCard({ title, value }: EarningsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${value.toFixed(2)}</div>
        <p className="text-xs text-gray-500 mt-1">in DATA tokens</p>
      </CardContent>
    </Card>
  )
}

interface DataCardProps {
  icon: React.ReactNode
  title: string
  value: string | number
  isShared: boolean
}

function DataCard({ icon, title, value, isShared }: DataCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          {icon}
          <span className="ml-2 text-sm font-medium">{title}</span>
        </div>
        <Badge variant={isShared ? "default" : "outline"} className="text-xs">
          {isShared ? "Shared" : "Private"}
        </Badge>
      </div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  )
}

export default function Dashboard() {
  const { user, login } = useAuth()
  const { carData, historicalData, isLoading, error, refreshData, sharingSettings } = useCarData()
  const [earnings, setEarnings] = useState({ today: 0, week: 0, month: 0, total: 0 })

  // Simulate earnings data
  useEffect(() => {
    if (user) {
      setEarnings({
        today: Number.parseFloat((Math.random() * 5).toFixed(2)),
        week: Number.parseFloat((Math.random() * 25).toFixed(2)),
        month: Number.parseFloat((Math.random() * 100).toFixed(2)),
        total: Number.parseFloat((Math.random() * 500).toFixed(2)),
      })
    }
  }, [user])

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Please connect your wallet to access the dashboard and start monetizing your vehicle data.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={login} className="w-full">
              Connect Wallet
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Dashboard</h1>
          <p className="text-gray-500">Monitor your vehicle data and earnings in real-time</p>
        </div>
        <Button variant="outline" onClick={refreshData} disabled={isLoading} className="mt-4 md:mt-0">
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <EarningsCard title="Today's Earnings" value={earnings.today} />
        <EarningsCard title="This Week" value={earnings.week} />
        <EarningsCard title="This Month" value={earnings.month} />
        <EarningsCard title="Total Earnings" value={earnings.total} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Real-Time Vehicle Data</CardTitle>
            <CardDescription>Current readings from your vehicle</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading || !carData ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <DataCard
                  icon={<Gauge className="h-5 w-5 text-blue-500" />}
                  title="Speed"
                  value={`${carData.speed} mph`}
                  isShared={sharingSettings.sharePerformance}
                />
                <DataCard
                  icon={<Gauge className="h-5 w-5 text-green-500" />}
                  title="RPM"
                  value={`${carData.rpm}`}
                  isShared={sharingSettings.sharePerformance}
                />
                <DataCard
                  icon={<Droplet className="h-5 w-5 text-blue-500" />}
                  title="Fuel Level"
                  value={`${carData.fuelLevel}%`}
                  isShared={sharingSettings.shareFuelData}
                />
                <DataCard
                  icon={<Thermometer className="h-5 w-5 text-red-500" />}
                  title="Engine Temp"
                  value={`${carData.engineTemp}°F`}
                  isShared={sharingSettings.shareDiagnostics}
                />
                <DataCard
                  icon={<Battery className="h-5 w-5 text-green-500" />}
                  title="Battery"
                  value={`${carData.batteryLevel}%`}
                  isShared={sharingSettings.shareDiagnostics}
                />
                <DataCard
                  icon={<Car className="h-5 w-5 text-gray-500" />}
                  title="Odometer"
                  value={`${carData.odometer.toLocaleString()} mi`}
                  isShared={sharingSettings.sharePerformance}
                />
              </div>
            )}

            {carData?.diagnostics.hasError && (
              <Alert className="mt-6" variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Diagnostic Error Detected</AlertTitle>
                <AlertDescription>
                  {carData.diagnostics.errorCode}: {carData.diagnostics.errorDescription}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Sharing Status</CardTitle>
            <CardDescription>Control what data you share</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Location Data</span>
                  <Badge variant={sharingSettings.shareLocation ? "default" : "outline"}>
                    {sharingSettings.shareLocation ? "Sharing" : "Private"}
                  </Badge>
                </div>
                <Progress value={sharingSettings.shareLocation ? 100 : 0} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Diagnostic Data</span>
                  <Badge variant={sharingSettings.shareDiagnostics ? "default" : "outline"}>
                    {sharingSettings.shareDiagnostics ? "Sharing" : "Private"}
                  </Badge>
                </div>
                <Progress value={sharingSettings.shareDiagnostics ? 100 : 0} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Performance Data</span>
                  <Badge variant={sharingSettings.sharePerformance ? "default" : "outline"}>
                    {sharingSettings.sharePerformance ? "Sharing" : "Private"}
                  </Badge>
                </div>
                <Progress value={sharingSettings.sharePerformance ? 100 : 0} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Fuel Data</span>
                  <Badge variant={sharingSettings.shareFuelData ? "default" : "outline"}>
                    {sharingSettings.shareFuelData ? "Sharing" : "Private"}
                  </Badge>
                </div>
                <Progress value={sharingSettings.shareFuelData ? 100 : 0} className="h-2" />
              </div>
            </div>

            <div className="mt-6">
              <Link href="/my-data">
                <Button variant="outline" className="w-full">
                  Manage Data Sharing
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="map" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="map">Location Map</TabsTrigger>
          <TabsTrigger value="charts">Performance Charts</TabsTrigger>
        </TabsList>
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Location</CardTitle>
              <CardDescription>Current and historical locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {carData && historicalData && (
                  <CarDataMap
                    carData={[carData, ...historicalData.slice(0, 9)]}
                    currentLocation={carData.location}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="charts">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Historical data visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">{historicalData.length > 0 && <DataCharts data={historicalData} />}</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Marketplace Activity</CardTitle>
            <CardDescription>Your data listings and sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't listed any data for sale yet.</p>
              <Link href="/marketplace">
                <Button>Explore Marketplace</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>Personalized recommendations based on your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Get AI-powered insights about your vehicle and driving habits.</p>
              <Link href="/insights">
                <Button>View Insights</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
