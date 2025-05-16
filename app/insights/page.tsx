"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useCarData } from "@/context/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { Brain, Wrench, DollarSign, RefreshCw, AlertTriangle, GaugeCircle, Car, Activity, BarChart, Gauge } from "lucide-react"
import { generateDataInsights } from "@/lib/ai-service"
import AiInsightsVisuals from "@/components/ai-insights-visuals"
import { LightningIcon, DocHudsonIcon, MaterIcon, FillmoreIcon } from "@/components/cars-icons"
import { CarsPatterns, LightningPattern } from "@/components/cars-patterns"
import dynamic from "next/dynamic"
import Image from "next/image"

export default function InsightsPage() {
  const { user } = useAuth()
  const { carData } = useCarData()
  const { toast } = useToast()
  const [insights, setInsights] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [performanceData, setPerformanceData] = useState({
    speed: {
      average: 38.0,
      overSpeedPercentage: 15.8,
    },
    fuel: {
      efficiency: 24.6,
      consumptionRate: 13.66,
    },
    diagnostics: {
      errorCount: 12,
      errorPercentage: 21.1,
    }
  })
  const [mockAuthEnabled, setMockAuthEnabled] = useState(false)

  // Generate semi-random performance data for demo purposes
  const generateRandomPerformanceData = () => {
    // Generate values with some randomness but still realistic
    const speedAvg = Math.round((35 + Math.random() * 15) * 10) / 10; // 35-50 mph
    const overSpeedPct = Math.round((10 + Math.random() * 20) * 10) / 10; // 10-30%

    const fuelEff = Math.round((20 + Math.random() * 15) * 10) / 10; // 20-35 mpg
    const consumptionRate = Math.round((10 + Math.random() * 8) * 100) / 100; // 10-18 gal/hr

    const errorCount = Math.floor(5 + Math.random() * 20); // 5-25 errors
    const errorPct = Math.round((errorCount / 50) * 100 * 10) / 10; // percentage based on errors

    return {
      speed: {
        average: speedAvg,
        overSpeedPercentage: overSpeedPct,
      },
      fuel: {
        efficiency: fuelEff,
        consumptionRate: consumptionRate,
      },
      diagnostics: {
        errorCount: errorCount,
        errorPercentage: errorPct,
      }
    };
  };

  async function generateInsights() {
    if (!user && !mockAuthEnabled) {
      toast({
        title: "Authentication required",
        description: "Please connect your wallet to generate insights",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)

      // Generate new random performance data for the visualizations
      const newData = generateRandomPerformanceData();
      setPerformanceData(newData);

      // Create mock car data based on the CarData interface
      const mockCarData = Array(50).fill(0).map((_, i) => ({
        id: `data_${Date.now() + i}`,
        timestamp: new Date(Date.now() - i * 3600000).toISOString(), // hourly data points
        speed: newData.speed.average * (0.8 + Math.random() * 0.4),
        rpm: 800 + Math.floor(Math.random() * 2200),
        fuelLevel: 10 + Math.floor(Math.random() * 90),
        engineTemp: 170 + Math.floor(Math.random() * 50),
        tirePressure: {
          frontLeft: 32 + (Math.random() * 2 - 1),
          frontRight: 32 + (Math.random() * 2 - 1),
          rearLeft: 32 + (Math.random() * 2 - 1),
          rearRight: 32 + (Math.random() * 2 - 1)
        },
        location: {
          latitude: 37.7749 + (Math.random() - 0.5) * 0.01,
          longitude: -122.4194 + (Math.random() - 0.5) * 0.01,
        },
        diagnostics: {
          hasError: i % 8 === 0, // every 8th data point has an error
          errorCode: i % 8 === 0 ? "P0420" : null,
          errorDescription: i % 8 === 0 ? "Catalyst System Efficiency Below Threshold" : null,
        },
        batteryLevel: 70 + Math.floor(Math.random() * 30),
        odometer: 10000 + i * 10 + Math.floor(Math.random() * 50),
        fuelEfficiency: newData.fuel.efficiency * (0.9 + Math.random() * 0.2)
      }));

      // Call the GROQ API service with all our defined settings
      const results = await generateDataInsights(mockCarData);
      setInsights(results);

      toast({
        title: "Insights generated!",
        description: "Lightning McQueen and friends have analyzed your driving data.",
      })
    } catch (error) {
      toast({
        title: "Failed to generate insights",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Generate initial data on page load - this ensures we have visualizations right away
    if (!insights && !loading) {
      // Enable mock auth for demo purposes
      setMockAuthEnabled(true);

      // Generate initial insights without notification
      try {
        const initialData = generateRandomPerformanceData();
        setPerformanceData(initialData);
      } catch (error) {
        console.error("Error generating initial data:", error);
      }
    }
  }, [insights, loading]);

  return (
    <div className="container mx-auto py-8 px-4 relative">
      <CarsPatterns />
      {/* Pixar Cars Themed Header */}
      <div className="relative mb-12 p-6 rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <LightningPattern className="h-full w-full" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
          <div>
            <h1 className="text-4xl font-bold drop-shadow-md">Pixar Cars AI Insights</h1>
            <p className="text-white/90 text-lg mt-2 max-w-xl">
              Your vehicle data analyzed by Lightning McQueen, Mater, Doc Hudson and the whole Radiator Springs crew!
            </p>
          </div>
          <Button
            onClick={generateInsights}
            disabled={loading}
            className="mt-4 md:mt-0 bg-amber-400 hover:bg-amber-300 text-black font-bold px-6 py-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Analyzing..." : "Refresh Insights"}
          </Button>
        </div>
        <div className="absolute -bottom-8 right-4 h-32 w-32 md:h-40 md:w-40 flex items-center justify-center">
          <LightningIcon size={180} className="drop-shadow-xl text-red-600" />
        </div>
      </div>

      {!user && !mockAuthEnabled ? (
        <Card className="border-2 border-red-200 shadow-lg">
          <CardHeader className="bg-slate-50 border-b">
            <div className="flex items-center gap-3">
              <Car className="h-6 w-6 text-red-500" />
              <CardTitle>Connect Your Wallet</CardTitle>
            </div>
            <CardDescription>Please connect your wallet to access the full Radiator Springs experience</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-6 relative h-40 w-40 flex items-center justify-center">
                <MaterIcon size={160} className="text-amber-700 drop-shadow-md" />
              </div>
              <p className="text-lg mb-4">"Dad gum! You need to connect your wallet to see all our analysis!"</p>
              <Button size="lg" className="mt-2 bg-amber-500 hover:bg-amber-400 text-black font-medium">
                Connect Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="visualizations" className="w-full">
          <TabsList className="mb-8 p-1 bg-slate-100 rounded-full w-fit mx-auto">
            <TabsTrigger value="visualizations" className="flex items-center gap-2 px-6 py-2 rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-amber-500 data-[state=active]:text-white">
              <GaugeCircle className="h-5 w-5" />
              <span className="font-medium">Pixar Cars Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2 px-6 py-2 rounded-full">
              <DollarSign className="h-5 w-5" />
              <span className="font-medium">Detailed Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visualizations">
            <AiInsightsVisuals performanceData={performanceData} />
          </TabsContent>

          <TabsContent value="insights">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            ) : insights ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insights.visualizations?.map((viz: any, index: number) => (
                  <Card key={index} className="border-slate-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b flex flex-row items-center gap-3">
                      <div className="bg-blue-500 p-2 rounded-full">
                        {viz.type === 'line' && <Activity className="h-4 w-4 text-white" />}
                        {viz.type === 'bar' && <BarChart className="h-4 w-4 text-white" />}
                        {viz.type === 'gauge' && <Gauge className="h-4 w-4 text-white" />}
                      </div>
                      <CardTitle>{viz.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {viz.type === "line" && (
                        <div className="h-64 w-full">
                          <div className="h-full w-full bg-blue-50 rounded-md flex items-center justify-center">
                            <DocHudsonIcon size={64} className="text-blue-200 mb-4" />
                            <p className="text-blue-600 mt-2">Doc Hudson analyzed your driving patterns</p>
                          </div>
                        </div>
                      )}
                      {viz.type === "gauge" && (
                        <div className="h-64 w-full">
                          <div className="h-full w-full bg-red-50 rounded-md flex flex-col items-center justify-center">
                            <LightningIcon size={64} className="text-red-200 mb-4" />
                            <p className="text-red-600 mt-2">Lightning McQueen rated your performance</p>
                          </div>
                        </div>
                      )}
                      {viz.type === "bar" && (
                        <div className="h-64 w-full">
                          <div className="h-full w-full bg-green-50 rounded-md flex flex-col items-center justify-center">
                            <FillmoreIcon size={64} className="text-green-200 mb-4" />
                            <p className="text-green-600 mt-2">Fillmore analyzed your fuel efficiency</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                <Card className="md:col-span-2 border-slate-200 shadow-md">
                  <CardHeader className="bg-slate-50 border-b flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-500 p-2 rounded-full">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle>AI Insights Summary</CardTitle>
                        <CardDescription>
                          Generated by {insights.model_info?.name || "GROQ llama-3.1-8b-instant"} with max 1000 tokens
                        </CardDescription>
                      </div>
                    </div>
                    <MaterIcon size={40} className="text-amber-500" />
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: insights.insights }} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-amber-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-amber-50/50 border-b border-amber-100">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <CardTitle className="text-xl">No Insights Available Yet</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative h-32 w-32 flex-shrink-0 flex items-center justify-center">
                      <DocHudsonIcon size={100} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-2">Doc Hudson says:</p>
                      <p className="text-gray-600 mb-4">
                        "You need to click that 'Refresh Insights' button up there to see your detailed analysis.
                        I can't help you tune your engine without the data!"
                      </p>
                      <Button
                        onClick={generateInsights}
                        disabled={loading}
                        variant="outline"
                        className="border-blue-400 bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium px-4 py-2 flex items-center gap-2"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Working on it...
                          </>
                        ) : (
                          <>
                            <GaugeCircle className="h-4 w-4" />
                            Generate Detailed Analysis
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Pixar Cars Themed Footer */}
      <div className="mt-16 p-4 bg-slate-100 rounded-lg text-center">
        <p className="text-sm text-slate-500">
          Powered by AI and inspired by Disney/Pixar's Cars. This is a fan project and not affiliated with Disney or Pixar.
        </p>
      </div>
    </div>
  )
}
