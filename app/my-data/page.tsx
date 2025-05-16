"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useCarData } from "@/context/data-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, AlertTriangle, Gauge, Droplet, Download, Upload, Lock, Unlock } from "lucide-react"

export default function MyData() {
  const { user, login } = useAuth()
  const {
    carData,
    historicalData,
    sharingSettings,
    updateSharingSettings,
    listedDataItems,
    listDataForSale,
    removeDataFromSale,
  } = useCarData()
  const { toast } = useToast()

  const [newListingPrice, setNewListingPrice] = useState<number>(5)

  const handleToggleSetting = (setting: string, value: boolean) => {
    updateSharingSettings({ [setting]: value })

    toast({
      title: value ? "Data Sharing Enabled" : "Data Sharing Disabled",
      description: `${setting.replace("share", "")} data sharing has been ${value ? "enabled" : "disabled"}.`,
    })
  }

  const handleListData = (dataType: string) => {
    if (!carData) return

    listDataForSale(carData, newListingPrice)

    toast({
      title: "Data Listed",
      description: `Your ${dataType} data has been listed for $${newListingPrice.toFixed(2)}.`,
    })
  }

  const handleRemoveListing = (dataId: string) => {
    removeDataFromSale(dataId)

    toast({
      title: "Listing Removed",
      description: "Your data listing has been removed from the marketplace.",
    })
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Please connect your wallet to manage your data sharing preferences.</CardDescription>
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Data</h1>
        <p className="text-gray-500">Manage your data sharing preferences and marketplace listings</p>
      </div>

      <Tabs defaultValue="sharing">
        <TabsList className="mb-4">
          <TabsTrigger value="sharing">Data Sharing</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="export">Export Data</TabsTrigger>
        </TabsList>

        <TabsContent value="sharing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-emerald-600 mr-2" />
                  <CardTitle>Location Data</CardTitle>
                </div>
                <CardDescription>Control sharing of your vehicle's GPS location data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Share Location Data</div>
                    <div className="text-sm text-gray-500">
                      {sharingSettings.shareLocation
                        ? "Your location data is being shared on the marketplace"
                        : "Your location data is private"}
                    </div>
                  </div>
                  <Switch
                    checked={sharingSettings.shareLocation}
                    onCheckedChange={(value) => handleToggleSetting("shareLocation", value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  {sharingSettings.shareLocation ? (
                    <div className="flex items-center text-emerald-600">
                      <Unlock className="h-4 w-4 mr-1" />
                      Public
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-600">
                      <Lock className="h-4 w-4 mr-1" />
                      Private
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!sharingSettings.shareLocation}
                  onClick={() => handleListData("Location")}
                >
                  List for Sale
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-emerald-600 mr-2" />
                  <CardTitle>Diagnostic Data</CardTitle>
                </div>
                <CardDescription>Control sharing of your vehicle's diagnostic and error codes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Share Diagnostic Data</div>
                    <div className="text-sm text-gray-500">
                      {sharingSettings.shareDiagnostics
                        ? "Your diagnostic data is being shared on the marketplace"
                        : "Your diagnostic data is private"}
                    </div>
                  </div>
                  <Switch
                    checked={sharingSettings.shareDiagnostics}
                    onCheckedChange={(value) => handleToggleSetting("shareDiagnostics", value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  {sharingSettings.shareDiagnostics ? (
                    <div className="flex items-center text-emerald-600">
                      <Unlock className="h-4 w-4 mr-1" />
                      Public
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-600">
                      <Lock className="h-4 w-4 mr-1" />
                      Private
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!sharingSettings.shareDiagnostics}
                  onClick={() => handleListData("Diagnostics")}
                >
                  List for Sale
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Gauge className="h-5 w-5 text-emerald-600 mr-2" />
                  <CardTitle>Performance Data</CardTitle>
                </div>
                <CardDescription>
                  Control sharing of your vehicle's speed, RPM, and other performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Share Performance Data</div>
                    <div className="text-sm text-gray-500">
                      {sharingSettings.sharePerformance
                        ? "Your performance data is being shared on the marketplace"
                        : "Your performance data is private"}
                    </div>
                  </div>
                  <Switch
                    checked={sharingSettings.sharePerformance}
                    onCheckedChange={(value) => handleToggleSetting("sharePerformance", value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  {sharingSettings.sharePerformance ? (
                    <div className="flex items-center text-emerald-600">
                      <Unlock className="h-4 w-4 mr-1" />
                      Public
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-600">
                      <Lock className="h-4 w-4 mr-1" />
                      Private
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!sharingSettings.sharePerformance}
                  onClick={() => handleListData("Performance")}
                >
                  List for Sale
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Droplet className="h-5 w-5 text-emerald-600 mr-2" />
                  <CardTitle>Fuel Data</CardTitle>
                </div>
                <CardDescription>Control sharing of your vehicle's fuel level and consumption data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Share Fuel Data</div>
                    <div className="text-sm text-gray-500">
                      {sharingSettings.shareFuelData
                        ? "Your fuel data is being shared on the marketplace"
                        : "Your fuel data is private"}
                    </div>
                  </div>
                  <Switch
                    checked={sharingSettings.shareFuelData}
                    onCheckedChange={(value) => handleToggleSetting("shareFuelData", value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  {sharingSettings.shareFuelData ? (
                    <div className="flex items-center text-emerald-600">
                      <Unlock className="h-4 w-4 mr-1" />
                      Public
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-600">
                      <Lock className="h-4 w-4 mr-1" />
                      Private
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!sharingSettings.shareFuelData}
                  onClick={() => handleListData("Fuel")}
                >
                  List for Sale
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <CardTitle>My Data Listings</CardTitle>
              <CardDescription>Manage your active data listings on the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              {listedDataItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You don't have any active data listings.</p>
                  <Button variant="outline" onClick={() => handleListData("Sample")}>
                    Create a Listing
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {listedDataItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Badge className="mb-1">
                            {item.diagnostics.hasError
                              ? "Diagnostics"
                              : item.speed > 50
                                ? "Performance"
                                : item.fuelLevel < 50
                                  ? "Fuel"
                                  : "Location"}
                          </Badge>
                          <h3 className="font-medium">Vehicle Data Package</h3>
                          <p className="text-sm text-gray-500">
                            Listed on {new Date(item.listedAt || "").toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-lg font-bold text-emerald-600">${item.price?.toFixed(2)}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div className="text-gray-500">Speed:</div>
                        <div>{item.speed} mph</div>
                        <div className="text-gray-500">Fuel Level:</div>
                        <div>{item.fuelLevel}%</div>
                        <div className="text-gray-500">Engine Temp:</div>
                        <div>{item.engineTemp}°F</div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" onClick={() => handleRemoveListing(item.id)}>
                          Remove Listing
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Export Your Data</CardTitle>
              <CardDescription>Download your vehicle data in various formats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">JSON Format</h3>
                      <p className="text-sm text-gray-500">Export your complete vehicle data in JSON format</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">CSV Format</h3>
                      <p className="text-sm text-gray-500">Export your vehicle data in CSV format for spreadsheets</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Upload to IPFS</h3>
                      <p className="text-sm text-gray-500">Store your data permanently on IPFS decentralized storage</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
