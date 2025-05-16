"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"
import {
    initializePara,
    isAuthenticated,
    loginWithEmail,
    completeEmailLogin,
    getUserWallets,
    getWalletBalances,
    signOutUser,
    type ParaInstance
} from "@/lib/para-service"

// Define the wallet type from Para SDK
interface ParaWallet {
    id: string
    address: string
    [key: string]: any
}

// Define our wallet type
type Wallet = {
    id: string
    address: string
    balances?: Record<string, any>
}

// Define the Para context type
type ParaContextType = {
    para: ParaInstance | null
    initialized: boolean
    isLoading: boolean
    error: string | null
    currentSessionId: string | null
    userEmail: string | null
    wallets: Record<string, Wallet>
    hasWallet: boolean
    loginStep: 'email' | 'otp' | 'complete'
    initLogin: (email: string) => Promise<void>
    completeLogin: (otp: string) => Promise<void>
    logout: () => Promise<void>
    refreshWallets: () => Promise<void>
}

// Create the context
const ParaContext = createContext<ParaContextType | undefined>(undefined)

// Create a provider component
export function ParaProvider({ children }: { children: ReactNode }) {
    const [para, setPara] = useState<ParaInstance | null>(null)
    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [wallets, setWallets] = useState<Record<string, Wallet>>({})
    const [loginStep, setLoginStep] = useState<'email' | 'otp' | 'complete'>('email')

    const { toast } = useToast()

    // Initialize Para instance
    useEffect(() => {
        const init = async () => {
            try {
                setIsLoading(true)

                // Add timeout to prevent waiting indefinitely
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Para initialization timed out after 15 seconds')), 15000);
                });

                // Race between initialization and timeout
                const paraInstance = await Promise.race([
                    initializePara(),
                    timeoutPromise
                ]) as ParaInstance;

                setPara(paraInstance)

                // Check if user is already logged in
                const authenticated = await isAuthenticated(paraInstance)
                if (authenticated) {
                    setLoginStep('complete')
                    await fetchWallets(paraInstance)
                }

                setInitialized(true)
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Para wallet service';
                console.error('Para initialization error:', err)
                setError(errorMessage)
                setInitialized(true) // Mark as initialized even if there's an error

                toast({
                    title: "Connection Failed",
                    description: errorMessage,
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        init()
    }, [toast])

    // Fetch user wallets
    const fetchWallets = async (paraInstance: ParaInstance) => {
        try {
            const userWallets = await getUserWallets(paraInstance)

            // Transform wallets to our format
            const walletsTransformed: Record<string, Wallet> = {}

            for (const [key, wallet] of Object.entries(userWallets)) {
                const paraWallet = wallet as ParaWallet;
                walletsTransformed[key] = {
                    id: paraWallet.id,
                    address: paraWallet.address,
                }

                // Get balances for each wallet
                try {
                    const balances = await getWalletBalances(paraInstance, paraWallet.id)
                    walletsTransformed[key].balances = balances
                } catch (err) {
                    console.warn(`Failed to get balances for wallet ${paraWallet.id}`, err)
                }
            }

            setWallets(walletsTransformed)
        } catch (err) {
            console.error('Failed to fetch wallets:', err)
            setError('Failed to fetch wallet information')
        }
    }

    // Start login process
    const initLogin = async (email: string) => {
        if (!para) {
            setError('Wallet service not initialized')
            return
        }

        // If email is empty, just show the email form
        if (!email) {
            setLoginStep('email')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const sessionId = await loginWithEmail(para, email)
            setCurrentSessionId(sessionId)
            setUserEmail(email)
            setLoginStep('otp')

            toast({
                title: "Verification Code Sent",
                description: "Check your email for a verification code to connect your wallet.",
            })
        } catch (err) {
            console.error('Failed to initiate login:', err)
            setError('Failed to start wallet connection process')
            toast({
                title: "Connection Failed",
                description: "Failed to start wallet connection. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Complete login with OTP
    const completeLogin = async (otp: string) => {
        if (!para || !currentSessionId) {
            setError('Wallet connection session not found')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            await completeEmailLogin(para, currentSessionId, otp)
            await fetchWallets(para)
            setLoginStep('complete')

            toast({
                title: "Wallet Connected",
                description: "You've successfully connected your wallet to Radiator Springs!",
            })
        } catch (err) {
            console.error('Failed to complete login:', err)
            setError('Failed to verify code. Please try again.')
            toast({
                title: "Verification Failed",
                description: "The code you entered is incorrect or expired. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Logout/disconnect wallet
    const logout = async () => {
        if (!para) {
            return
        }

        setIsLoading(true)

        try {
            await signOutUser(para)
            setWallets({})
            setLoginStep('email')
            setUserEmail(null)
            setCurrentSessionId(null)

            toast({
                title: "Wallet Disconnected",
                description: "Your wallet has been disconnected from Radiator Springs.",
            })
        } catch (err) {
            console.error('Failed to logout:', err)
            toast({
                title: "Logout Failed",
                description: "Failed to disconnect wallet. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Refresh wallets data
    const refreshWallets = async () => {
        if (!para) {
            return
        }

        setIsLoading(true)

        try {
            await fetchWallets(para)
            toast({
                title: "Refreshed",
                description: "Your wallet information has been updated.",
            })
        } catch (err) {
            console.error('Failed to refresh wallets:', err)
            toast({
                title: "Refresh Failed",
                description: "Failed to refresh wallet information. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const hasWallet = Object.keys(wallets).length > 0

    return (
        <ParaContext.Provider
            value={{
                para,
                initialized,
                isLoading,
                error,
                currentSessionId,
                userEmail,
                wallets,
                hasWallet,
                loginStep,
                initLogin,
                completeLogin,
                logout,
                refreshWallets,
            }}
        >
            {children}
        </ParaContext.Provider>
    )
}

// Create a hook to use the Para context
export function usePara() {
    const context = useContext(ParaContext)
    if (context === undefined) {
        throw new Error("usePara must be used within a ParaProvider")
    }
    return context
} 