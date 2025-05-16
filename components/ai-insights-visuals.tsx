"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Gauge, Activity, AlertTriangle, Car, Fuel, Wrench, ZapIcon, Tractor, Map } from "lucide-react"
import Image from "next/image"
import { getPresetCarsImages } from "@/lib/pollinations-service"
import { LightningIcon, FillmoreIcon, DocHudsonIcon, MaterIcon } from "./cars-icons"
import { LightningPattern, FillmorePattern, DocPattern, MaterPattern } from "./cars-patterns"

interface InsightsVisualsProps {
    performanceData: {
        speed: {
            average: number
            overSpeedPercentage: number
        }
        fuel: {
            efficiency: number
            consumptionRate: number
        }
        diagnostics: {
            errorCount: number
            errorPercentage: number
        }
    }
}

export default function AiInsightsVisuals({ performanceData }: InsightsVisualsProps) {
    const [images, setImages] = useState<{
        speed: string
        fuel: string
        diagnostics: string
    } | null>(null)

    const [loadingStates, setLoadingStates] = useState({
        speed: true,
        fuel: true,
        diagnostics: true
    })

    // Get the Cars-themed images from Pollinations.ai
    useEffect(() => {
        // For a production app, you could use the generateCarsImages function
        // For now, we'll use preset images to avoid rate limits
        const carImages = getPresetCarsImages(performanceData)
        setImages(carImages)

        // Simulate loading states for the images
        const loadTimer = setTimeout(() => {
            setLoadingStates({
                speed: false,
                fuel: false,
                diagnostics: false
            })
        }, 1500)

        return () => clearTimeout(loadTimer)
    }, [performanceData])

    // Create performance indicators based on data
    const getSpeedStatus = () => {
        if (performanceData.speed.overSpeedPercentage > 20) return "high-risk"
        if (performanceData.speed.overSpeedPercentage > 10) return "medium-risk"
        return "safe"
    }

    const getFuelStatus = () => {
        if (performanceData.fuel.efficiency < 20) return "inefficient"
        if (performanceData.fuel.efficiency < 25) return "average"
        return "efficient"
    }

    const getDiagnosticStatus = () => {
        if (performanceData.diagnostics.errorPercentage > 20) return "critical"
        if (performanceData.diagnostics.errorPercentage > 10) return "warning"
        return "healthy"
    }

    const CardBackground = ({ character }: { character: 'lightning' | 'fillmore' | 'doc' }) => {
        return (
            <div className="absolute inset-0 opacity-5">
                <div
                    className={`absolute inset-0 ${character === 'lightning'
                        ? 'bg-gradient-to-br from-red-600 to-yellow-400'
                        : character === 'fillmore'
                            ? 'bg-gradient-to-br from-green-600 to-teal-400'
                            : 'bg-gradient-to-br from-blue-600 to-indigo-400'
                        }`}
                />
                <div className="absolute bottom-0 right-0 w-full h-full">
                    {character === 'lightning' && <LightningPattern className="h-full w-full" />}
                    {character === 'fillmore' && <FillmorePattern className="h-full w-full" />}
                    {character === 'doc' && <DocPattern className="h-full w-full" />}
                </div>
            </div>
        )
    }

    return (
        <Tabs defaultValue="speed" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 p-1 rounded-full bg-slate-100 w-full md:w-fit mx-auto">
                <TabsTrigger value="speed" className="flex items-center gap-2 rounded-full data-[state=active]:bg-red-500 data-[state=active]:text-white py-2">
                    <Gauge className="h-4 w-4" />
                    <span>Speed</span>
                </TabsTrigger>
                <TabsTrigger value="fuel" className="flex items-center gap-2 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-white py-2">
                    <Fuel className="h-4 w-4" />
                    <span>Fuel Economy</span>
                </TabsTrigger>
                <TabsTrigger value="diagnostics" className="flex items-center gap-2 rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white py-2">
                    <Wrench className="h-4 w-4" />
                    <span>Diagnostics</span>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="speed">
                <Card className="overflow-hidden shadow-lg border-red-100 relative">
                    <CardBackground character="lightning" />
                    <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-100 relative z-10">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-500 p-2 rounded-full">
                                    <Gauge className="h-5 w-5 text-white" />
                                </div>
                                <CardTitle>Speed Analysis</CardTitle>
                            </div>
                            <Badge
                                variant={getSpeedStatus() === "safe" ? "outline" : (getSpeedStatus() === "medium-risk" ? "secondary" : "destructive")}
                                className={`px-3 py-1 ${getSpeedStatus() === "safe" ? "border-green-500 text-green-700" : ""}`}
                            >
                                {getSpeedStatus() === "safe" ? "Safe Driving" : (getSpeedStatus() === "medium-risk" ? "Moderate Risk" : "High Risk")}
                            </Badge>
                        </div>
                        <CardDescription className="font-medium text-red-800">
                            <div className="flex items-center gap-2">
                                <LightningIcon size={24} className="inline-block text-red-600" />
                                Your driving speed patterns analyzed by Lightning McQueen
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                            <div className="w-full lg:w-1/2 relative h-[300px]">
                                {images && !loadingStates.speed ? (
                                    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform">
                                        <Image
                                            src={images.speed}
                                            alt="Lightning McQueen analyzes your speed patterns"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-white text-sm font-medium">Speed profile analyzed by Lightning McQueen</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-red-50 rounded-lg animate-pulse flex items-center justify-center shadow-inner">
                                        <Car className="h-16 w-16 text-red-200" />
                                    </div>
                                )}
                            </div>
                            <div className="w-full lg:w-1/2 space-y-6">
                                <Alert variant={getSpeedStatus() === "safe" ? "default" : "destructive"} className="bg-white/80 backdrop-blur-sm">
                                    <Activity className="h-4 w-4" />
                                    <AlertTitle>Speed Profile</AlertTitle>
                                    <AlertDescription>
                                        Average speed of <span className="font-semibold">{performanceData.speed.average} mph</span>, with
                                        <span className={`font-semibold ${performanceData.speed.overSpeedPercentage > 15 ? 'text-red-600' : ''}`}> {performanceData.speed.overSpeedPercentage}%</span> of time spent over speed limit.
                                    </AlertDescription>
                                </Alert>

                                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-red-100 space-y-4">
                                    <h4 className="text-sm font-medium flex items-center gap-2 text-red-800">
                                        <ZapIcon className="h-4 w-4" />
                                        Racing Tips from Lightning McQueen:
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2 text-sm">
                                        <li className="text-gray-600">Speed thrills, but safety wins the race! Keep a consistent pace like a pro.</li>
                                        {performanceData.speed.overSpeedPercentage > 10 && (
                                            <li className="text-red-600 font-medium">Ka-chow! You're spending too much time over the speed limit. Slow down to save fuel and reduce wear.</li>
                                        )}
                                        <li className="text-gray-600">Smooth acceleration and deceleration improves handling and efficiency.</li>
                                        <li className="text-gray-600">"Speed. I am speed!" But remember, champions know when to push and when to cruise.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="fuel">
                <Card className="overflow-hidden shadow-lg border-green-100 relative">
                    <CardBackground character="fillmore" />
                    <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-100 relative z-10">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-500 p-2 rounded-full">
                                    <Fuel className="h-5 w-5 text-white" />
                                </div>
                                <CardTitle>Fuel Efficiency</CardTitle>
                            </div>
                            <Badge
                                variant={getFuelStatus() === "efficient" ? "outline" : (getFuelStatus() === "average" ? "secondary" : "destructive")}
                                className={`px-3 py-1 ${getFuelStatus() === "efficient" ? "border-green-500 text-green-700" : ""}`}
                            >
                                {getFuelStatus() === "efficient" ? "Excellent" : (getFuelStatus() === "average" ? "Average" : "Poor")}
                            </Badge>
                        </div>
                        <CardDescription className="font-medium text-green-800">
                            <div className="flex items-center gap-2">
                                <FillmoreIcon size={24} className="inline-block text-green-600" />
                                Your fuel consumption analyzed by Fillmore
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                            <div className="w-full lg:w-1/2 relative h-[300px]">
                                {images && !loadingStates.fuel ? (
                                    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform">
                                        <Image
                                            src={images.fuel}
                                            alt="Fillmore analyzes your fuel efficiency"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-white text-sm font-medium">Fuel efficiency analyzed by Fillmore</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-green-50 rounded-lg animate-pulse flex items-center justify-center shadow-inner">
                                        <Fuel className="h-16 w-16 text-green-200" />
                                    </div>
                                )}
                            </div>
                            <div className="w-full lg:w-1/2 space-y-6">
                                <Alert variant={getFuelStatus() === "efficient" ? "default" : "destructive"} className="bg-white/80 backdrop-blur-sm">
                                    <Fuel className="h-4 w-4" />
                                    <AlertTitle>Fuel Consumption</AlertTitle>
                                    <AlertDescription>
                                        Average efficiency of <span className="font-semibold">{performanceData.fuel.efficiency} mpg</span> with
                                        <span className={`font-semibold ${performanceData.fuel.consumptionRate > 12 ? 'text-amber-600' : ''}`}> {performanceData.fuel.consumptionRate}</span> gallons/hour consumption rate.
                                    </AlertDescription>
                                </Alert>

                                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-green-100 space-y-4">
                                    <h4 className="text-sm font-medium flex items-center gap-2 text-green-800">
                                        <Tractor className="h-4 w-4" />
                                        Organic Advice from Fillmore:
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2 text-sm">
                                        <li className="text-gray-600">Like, take it easy on the throttle, man. Gentle acceleration saves the good juice.</li>
                                        {performanceData.fuel.efficiency < 25 && (
                                            <li className="text-amber-600 font-medium">Your fuel efficiency is, like, not so groovy. Try maintaining a steady speed on highways.</li>
                                        )}
                                        <li className="text-gray-600">Check your tire pressure regularly - it's all connected in the cosmic balance of efficiency.</li>
                                        <li className="text-gray-600">"That's organic, man!" Remember, your vehicle and the planet are, like, in harmony.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="diagnostics">
                <Card className="overflow-hidden shadow-lg border-blue-100 relative">
                    <CardBackground character="doc" />
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100 relative z-10">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-500 p-2 rounded-full">
                                    <Wrench className="h-5 w-5 text-white" />
                                </div>
                                <CardTitle>Diagnostic Health</CardTitle>
                            </div>
                            <Badge
                                variant={getDiagnosticStatus() === "healthy" ? "outline" : (getDiagnosticStatus() === "warning" ? "secondary" : "destructive")}
                                className={`px-3 py-1 ${getDiagnosticStatus() === "healthy" ? "border-green-500 text-green-700" : ""}`}
                            >
                                {getDiagnosticStatus() === "healthy" ? "Healthy" : (getDiagnosticStatus() === "warning" ? "Attention Needed" : "Service Required")}
                            </Badge>
                        </div>
                        <CardDescription className="font-medium text-blue-800">
                            <div className="flex items-center gap-2">
                                <DocHudsonIcon size={24} className="inline-block text-blue-600" />
                                Your vehicle's health analyzed by Doc Hudson
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                            <div className="w-full lg:w-1/2 relative h-[300px]">
                                {images && !loadingStates.diagnostics ? (
                                    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform">
                                        <Image
                                            src={images.diagnostics}
                                            alt="Doc Hudson examines your vehicle's health"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-white text-sm font-medium">Diagnostics analyzed by Doc Hudson</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-blue-50 rounded-lg animate-pulse flex items-center justify-center shadow-inner">
                                        <Wrench className="h-16 w-16 text-blue-200" />
                                    </div>
                                )}
                            </div>
                            <div className="w-full lg:w-1/2 space-y-6">
                                <Alert variant={getDiagnosticStatus() === "healthy" ? "default" : "destructive"} className="bg-white/80 backdrop-blur-sm">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Diagnostic Status</AlertTitle>
                                    <AlertDescription>
                                        <span className={`font-semibold ${performanceData.diagnostics.errorCount > 10 ? 'text-red-600' : ''}`}>{performanceData.diagnostics.errorCount}</span> error events detected
                                        (<span className={`font-semibold ${performanceData.diagnostics.errorPercentage > 15 ? 'text-red-600' : ''}`}>{performanceData.diagnostics.errorPercentage}%</span> of trips).
                                    </AlertDescription>
                                </Alert>

                                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-blue-100 space-y-4">
                                    <h4 className="text-sm font-medium flex items-center gap-2 text-blue-800">
                                        <Map className="h-4 w-4" />
                                        Professional Advice from Doc Hudson:
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2 text-sm">
                                        <li className="text-gray-600">Listen to your engine - it talks to you before problems become serious.</li>
                                        {performanceData.diagnostics.errorPercentage > 10 && (
                                            <li className="text-red-600 font-medium">Those error codes aren't just for show. Get your vehicle checked soon to prevent bigger issues.</li>
                                        )}
                                        <li className="text-gray-600">Regular maintenance isn't just about longevity - it's about safe performance when you need it most.</li>
                                        <li className="text-gray-600">"If you're going hard enough left, you'll find yourself turning right." Balance is key to longevity.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
} 