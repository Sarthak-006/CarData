"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { usePara } from "@/context/para-context"
import { LightningMcQueenIcon } from "./car-icons"
import { AlertCircle } from "lucide-react"

export function ParaLogin() {
    const {
        initialized,
        isLoading,
        error,
        loginStep,
        userEmail,
        initLogin,
        completeLogin
    } = usePara()

    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [showRetry, setShowRetry] = useState(false)

    // Add a timer to show retry button if initialization takes too long
    useEffect(() => {
        // If we're still initializing after 5 seconds, show retry option
        const timer = setTimeout(() => {
            if (!initialized && !error) {
                setShowRetry(true)
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [initialized, error]);

    // Email validation
    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handleSubmitEmail = (e: React.FormEvent) => {
        e.preventDefault()
        if (isValidEmail(email)) {
            initLogin(email)
        }
    }

    const handleSubmitOtp = (e: React.FormEvent) => {
        e.preventDefault()
        if (otp.length >= 4) {
            completeLogin(otp)
        }
    }

    // Handle manual retry for Para initialization
    const handleRetry = () => {
        // Reload the page to restart the Para initialization
        window.location.reload()
    }

    if (!initialized) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Starting Engines...</CardTitle>
                    <CardDescription>
                        Just a moment while we fire up your wallet connection
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center py-6">
                    <div className="animate-pulse mb-4">
                        <LightningMcQueenIcon className="h-20 w-20 text-red-600" />
                    </div>

                    {showRetry && (
                        <div className="mt-4 text-center">
                            <p className="text-amber-600 mb-2">Hmm, this is taking longer than expected.</p>
                            <Button
                                variant="outline"
                                onClick={handleRetry}
                                className="mt-2"
                            >
                                Restart Engines
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    }

    // If there's an initialization error, show error card
    if (error && loginStep === 'email' && !userEmail) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4 text-red-500">
                        <AlertCircle size={48} />
                    </div>
                    <CardTitle className="text-2xl">Engine Trouble</CardTitle>
                    <CardDescription className="text-center">
                        We're having trouble connecting to the wallet service.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <p className="text-sm text-red-500">{error}</p>
                    <p className="text-sm">Try again later or contact support if the problem persists.</p>

                    <Button
                        variant="outline"
                        onClick={handleRetry}
                        className="mt-4"
                    >
                        Try Again
                    </Button>
                </CardContent>
            </Card>
        )
    }

    if (loginStep === 'email') {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <LightningMcQueenIcon className="h-16 w-16 text-red-600" />
                    </div>
                    <CardTitle className="text-center text-2xl">Start Your Engines</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to connect your wallet to Radiator Springs.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmitEmail}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700"
                            disabled={isLoading || !isValidEmail(email)}
                        >
                            {isLoading ? "Revving Up..." : "Race to Connect Wallet"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        )
    }

    if (loginStep === 'otp') {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <LightningMcQueenIcon className="h-16 w-16 text-red-600" />
                    </div>
                    <CardTitle className="text-center text-2xl">Checkpoint Verification</CardTitle>
                    <CardDescription className="text-center">
                        We sent a code to {userEmail}. Enter it below to complete the connection.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmitOtp}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="otp">Verification Code</Label>
                            <Input
                                id="otp"
                                placeholder="Enter the code from your email"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                        <Button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700"
                            disabled={isLoading || otp.length < 4}
                        >
                            {isLoading ? "Fueling Up..." : "Verify & Connect"}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full text-sm"
                            onClick={() => initLogin(userEmail || email)}
                            disabled={isLoading}
                        >
                            Resend Code
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        )
    }

    return null; // When login is complete
} 