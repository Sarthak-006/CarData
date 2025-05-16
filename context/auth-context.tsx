"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

// Define the user type
type User = {
  id: string
  address: string
  balance: string
}

// Define the context type
type AuthContextType = {
  user: User | null
  login: () => Promise<void>
  logout: () => void
  isLoading: boolean
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("cardata-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("cardata-user")
      }
    }
  }, [])

  // Mock login function (would be replaced with Para SDK in production)
  const login = async () => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        address:
          "0x" +
          Array(40)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join(""),
        balance: "1000.00",
      }

      setUser(mockUser)
      localStorage.setItem("cardata-user", JSON.stringify(mockUser))

      toast({
        title: "Wallet Connected",
        description: "You have successfully connected your wallet.",
      })
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("cardata-user")
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    })
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
