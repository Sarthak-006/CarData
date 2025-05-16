"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { usePara } from "@/context/para-context"
import { ParaLogin } from "./para-login"

export function ConnectWallet() {
    const { loginStep, hasWallet, initLogin } = usePara()

    // If user already completed login, don't show this component
    if (loginStep === 'complete' || hasWallet) {
        return null
    }

    // If user is in email or OTP step, show the login component
    if (loginStep === 'email' || loginStep === 'otp') {
        return <ParaLogin />
    }

    // Handler to show email login form
    const handleConnectClick = () => {
        // This will change the loginStep to 'email' in the context
        // Empty string is used as a placeholder, the actual email
        // will be entered by the user in the ParaLogin component
        initLogin("")
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6 pb-4 flex flex-col items-center">
                <CardTitle className="text-2xl font-bold mb-2">
                    Connect Your Wallet
                </CardTitle>
                <CardDescription className="text-center mb-6">
                    Please connect your wallet to access the marketplace and purchase vehicle data.
                </CardDescription>

                <Button
                    className="w-full"
                    variant="default"
                    onClick={handleConnectClick}
                >
                    Connect Wallet
                </Button>
            </CardContent>
        </Card>
    )
} 