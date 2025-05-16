"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useCarData } from "@/context/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { Brain, Wrench, DollarSign, RefreshCw, AlertTriangle, ChevronDown, Gauge, TrendingUp, Activity, Calendar } from "lucide-react"
import { generateDataInsights } from "@/lib/ai-service"
import dynamic from "next/dynamic"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Dynamically import visualization components with no SSR
const LineChart = dynamic(() => import("@/components/charts/LineChart"), { ssr: false })
const GaugeChart = dynamic(() => import("@/components/charts/GaugeChart"), { ssr: false })
const BarChart = dynamic(() => import("@/components/charts/BarChart"), { ssr: false })

// Enhanced local analysis functions
function analyzeSpeed(data: any[]) {
  const speeds = data.map(d => d.speed)
  const avg = speeds.reduce((a, b) => a + b, 0) / speeds.length
  const max = Math.max(...speeds)
  const min = Math.min(...speeds)

  // Calculate speed distribution
  const distribution = speeds.reduce((acc, speed) => {
    const range = Math.floor(speed / 10) * 10
    acc[range] = (acc[range] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  // Calculate time spent over speed limit (assuming 65mph limit)
  const timeOverLimit = speeds.filter(s => s > 65).length / speeds.length * 100

  return {
    avg: avg.toFixed(1),
    max: max.toFixed(1),
    min: min.toFixed(1),
    distribution,
    timeOverLimit: timeOverLimit.toFixed(1)
  }
}

function analyzeFuel(data: any[]) {
  const levels = data.map(d => d.fuelLevel)
  const efficiency = data.map(d => d.fuelEfficiency)
    .filter(eff => eff !== undefined && eff !== null && !isNaN(eff))

  // Only calculate if we have valid efficiency data
  const avgLevel = levels.reduce((a, b) => a + b, 0) / levels.length
  const avgEff = efficiency.length > 0
    ? efficiency.reduce((a, b) => a + b, 0) / efficiency.length
    : 0

  // Calculate efficiency trend
  const efficiencyTrend = data
    .filter(d => d.fuelEfficiency !== undefined && d.fuelEfficiency !== null && !isNaN(d.fuelEfficiency))
    .map((d) => ({
      timestamp: d.timestamp,
      value: d.fuelEfficiency
    }))

  // Calculate fuel consumption rate (gallons per hour)
  const consumptionRate = levels.length > 1
    ? levels
      .slice(1)
      .map((level, i) => level - levels[i])
      .filter(rate => rate < 0)
      .reduce((sum, rate) => sum + Math.abs(rate), 0) / (levels.length - 1)
    : 0

  return {
    avgLevel: avgLevel.toFixed(1),
    avgEfficiency: avgEff.toFixed(1),
    efficiencyTrend,
    consumptionRate: consumptionRate.toFixed(2)
  }
}

function analyzeDiagnostics(data: any[]) {
  const errorEvents = data.filter(d => d.diagnostics?.hasError)
  const errorCodes = [...new Set(errorEvents.map(d => d.diagnostics.errorCode))]

  // Group errors by type
  const errorTypes = errorEvents.reduce((acc, event) => {
    const code = event.diagnostics.errorCode
    acc[code] = (acc[code] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Calculate error frequency
  const errorFrequency = errorEvents.length / data.length * 100

  return {
    totalErrors: errorEvents.length,
    errorCodes,
    errorTypes,
    errorFrequency: errorFrequency.toFixed(1)
  }
}

function generateLocalInsights(data: any[]) {
  const speedAnalysis = analyzeSpeed(data)
  const fuelAnalysis = analyzeFuel(data)
  const diagnosticAnalysis = analyzeDiagnostics(data)

  return {
    speed: {
      summary: `Average speed of ${speedAnalysis.avg} mph, with ${speedAnalysis.timeOverLimit}% of time spent over speed limit.`,
      details: speedAnalysis
    },
    fuel: {
      summary: `Average efficiency of ${fuelAnalysis.avgEfficiency} mpg with ${fuelAnalysis.consumptionRate} gallons/hour consumption rate.`,
      details: fuelAnalysis
    },
    diagnostics: {
      summary: `${diagnosticAnalysis.totalErrors} error events detected (${diagnosticAnalysis.errorFrequency}% of trips).`,
      details: diagnosticAnalysis
    }
  }
}

function InsightCard({ icon: Icon, title, value, trend, description, color = "text-emerald-600" }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={`text-xs ${trend.positive ? "text-emerald-600" : "text-red-600"}`}>
            {trend.value}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function AIInsightsView({ insights, onRefresh, isLoading }: any) {
  if (!insights) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Get detailed AI-powered insights about your driving patterns.</p>
        <Button
          onClick={onRefresh}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate AI Analysis"
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard
          icon={DollarSign}
          title="Potential Monthly Savings"
          value={`$${insights.efficiency_analysis?.potential_savings?.potential_monthly_savings?.toFixed(2) || "0.00"}`}
          description="Based on improved driving habits"
        />
        <InsightCard
          icon={Gauge}
          title="Current MPG"
          value={insights.efficiency_analysis?.current_mpg?.toFixed(1) || "0.0"}
          trend={{
            positive: true,
            value: "+2.3 mpg from last month"
          }}
        />
        <InsightCard
          icon={Activity}
          title="Driving Score"
          value={`${insights.driving_habits?.score || 0}/100`}
          color="text-blue-600"
        />
        <InsightCard
          icon={Wrench}
          title="Vehicle Health"
          value={`${insights.maintenance_insights?.current_health_score || 0}%`}
          color={insights.maintenance_insights?.current_health_score > 70 ? "text-emerald-600" : "text-amber-600"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.visualizations?.map((viz: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{viz.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {viz.type === "line" && <LineChart data={viz.data} config={viz.config} />}
                {viz.type === "gauge" && <GaugeChart data={viz.data} config={viz.config} />}
                {viz.type === "bar" && <BarChart data={viz.data} config={viz.config} />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: insights.insights }} />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={onRefresh}
          variant="outline"
          className="mt-4"
          disabled={isLoading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Analysis
        </Button>
      </div>
    </div>
  )
}

export default function Insights() {
  const { user, login } = useAuth()
  const { carData, historicalData } = useCarData()
  const { toast } = useToast()

  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [aiInsights, setAiInsights] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("local")

  // Calculate basic insights without AI
  const localInsights = historicalData.length > 0 ? generateLocalInsights(historicalData) : null

  const requestAIAnalysis = async () => {
    setIsLoadingAI(true)
    try {
      const insights = await generateDataInsights(historicalData)
      setAiInsights(insights)
      setActiveTab("ai")
    } catch (error: any) {
      console.error("Error getting AI insights:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to generate AI insights. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingAI(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Please connect your wallet to access insights about your vehicle data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={login} className="w-full">
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Insights</h1>
          <p className="text-gray-500">Real-time analysis of your vehicle data</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="local" className="flex items-center">
            <Gauge className="h-4 w-4 mr-2" />
            Basic Analysis
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="local">
          {localInsights ? (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Speed Analysis</h3>
                      <p className="text-gray-600">{localInsights.speed.summary}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Fuel Efficiency</h3>
                      <p className="text-gray-600">{localInsights.fuel.summary}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Diagnostic Health</h3>
                      <p className="text-gray-600">{localInsights.diagnostics.summary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center mt-4">
                <Button
                  onClick={requestAIAnalysis}
                  variant="outline"
                  className="flex items-center"
                  disabled={isLoadingAI}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  {isLoadingAI ? "Generating AI Insights..." : "Get AI-Powered Analysis"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No data available for analysis</div>
          )}
        </TabsContent>

        <TabsContent value="ai">
          <AIInsightsView
            insights={aiInsights}
            onRefresh={requestAIAnalysis}
            isLoading={isLoadingAI}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
