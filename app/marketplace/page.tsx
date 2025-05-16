"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { Star, Search, ShoppingCart, Tag, User } from "lucide-react"
import { fetchMarketplaceListings } from "@/lib/data-service"
import type { MarketplaceListing } from "@/types/car-data"

export default function Marketplace() {
  const { user, login } = useAuth()
  const { toast } = useToast()
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"price" | "date" | "rating">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    loadListings()
  }, [])

  const loadListings = async () => {
    setIsLoading(true)
    try {
      const data = await fetchMarketplaceListings()
      setListings(data)
    } catch (error) {
      console.error("Error loading marketplace listings:", error)
      toast({
        title: "Error",
        description: "Failed to load marketplace listings",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePurchase = (listing: MarketplaceListing) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please connect your wallet to purchase data",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Purchase Successful",
      description: `You have purchased ${listing.dataType} data for $${listing.price}`,
    })
  }

  const filteredListings = listings
    .filter((listing) => {
      // Apply search filter
      if (searchTerm && !listing.dataType.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Apply category filter
      if (selectedCategory && listing.dataType !== selectedCategory) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "price") {
        return sortOrder === "asc"
          ? Number.parseFloat(a.price) - Number.parseFloat(b.price)
          : Number.parseFloat(b.price) - Number.parseFloat(a.price)
      } else if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy === "rating") {
        return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
      }
      return 0
    })

  const categories = [...new Set(listings.map((listing) => listing.dataType))]

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Please connect your wallet to access the marketplace and purchase vehicle data.
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
          <h1 className="text-3xl font-bold">Data Marketplace</h1>
          <p className="text-gray-500">Buy and sell vehicle data in a secure, decentralized marketplace</p>
        </div>
        <Button variant="outline" onClick={() => loadListings()} disabled={isLoading} className="mt-4 md:mt-0">
          Refresh Listings
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <Card className="lg:w-1/4">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search listings..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Categories</label>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 text-sm rounded-md w-full text-left ${
                    selectedCategory === null ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-sm rounded-md w-full text-left ${
                      selectedCategory === category
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <div className="flex items-center space-x-2 mb-2">
                <button
                  onClick={() => {
                    setSortBy("price")
                    setSortOrder(sortOrder === "asc" && sortBy === "price" ? "desc" : "asc")
                  }}
                  className={`px-3 py-1.5 text-sm rounded-md flex-1 text-center ${
                    sortBy === "price" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Price
                </button>
                <button
                  onClick={() => {
                    setSortBy("rating")
                    setSortOrder(sortOrder === "asc" && sortBy === "rating" ? "desc" : "asc")
                  }}
                  className={`px-3 py-1.5 text-sm rounded-md flex-1 text-center ${
                    sortBy === "rating" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Rating
                </button>
                <button
                  onClick={() => {
                    setSortBy("date")
                    setSortOrder(sortOrder === "asc" && sortBy === "date" ? "desc" : "asc")
                  }}
                  className={`px-3 py-1.5 text-sm rounded-md flex-1 text-center ${
                    sortBy === "date" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Date
                </button>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => setSortOrder("asc")}
                  className={`px-3 py-1.5 text-sm rounded-l-md flex-1 text-center ${
                    sortOrder === "asc" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Ascending
                </button>
                <button
                  onClick={() => setSortOrder("desc")}
                  className={`px-3 py-1.5 text-sm rounded-r-md flex-1 text-center ${
                    sortOrder === "desc" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Descending
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:w-3/4">
          <Tabs defaultValue="buy">
            <TabsList className="mb-4">
              <TabsTrigger value="buy">Buy Data</TabsTrigger>
              <TabsTrigger value="sell">Sell Your Data</TabsTrigger>
            </TabsList>

            <TabsContent value="buy">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-64 w-full" />
                  ))}
                </div>
              ) : filteredListings.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-gray-500 mb-4">No listings found matching your criteria.</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory(null)
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredListings.map((listing) => (
                    <Card key={listing.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge className="mb-2">{listing.dataType}</Badge>
                            <CardTitle className="text-lg">Vehicle Data Package</CardTitle>
                          </div>
                          <div className="text-xl font-bold text-emerald-600">${listing.price}</div>
                        </div>
                        <CardDescription className="flex items-center mt-1">
                          <User className="h-3 w-3 mr-1" />
                          Seller: {listing.seller.substring(0, 6)}...
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < listing.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">({listing.reviews} reviews)</span>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Sample Speed:</span>
                            <span>{listing.sample.speed} mph</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Sample Fuel Level:</span>
                            <span>{listing.sample.fuelLevel}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Listed:</span>
                            <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handlePurchase(listing)}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Purchase Data
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="sell">
              <Card>
                <CardHeader>
                  <CardTitle>List Your Vehicle Data</CardTitle>
                  <CardDescription>Create a new listing to sell your vehicle data on the marketplace</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Data Type</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="Location">Location Data</option>
                        <option value="Diagnostics">Diagnostic Data</option>
                        <option value="Performance">Performance Data</option>
                        <option value="Fuel">Fuel Data</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Price (USD)</label>
                      <Input type="number" min="0.01" step="0.01" placeholder="5.00" />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Description</label>
                      <textarea
                        className="w-full p-2 border rounded-md min-h-[100px]"
                        placeholder="Describe your data package..."
                      ></textarea>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Tag className="h-4 w-4 mr-2" />
                    Create Listing
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
