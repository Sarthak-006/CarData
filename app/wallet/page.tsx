"use client"

import { ConnectWallet } from "@/components/connect-wallet"
import { usePara } from "@/context/para-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WalletPage() {
    const { hasWallet, wallets, loginStep } = usePara()

    // If user hasn't connected wallet, show connect component
    if (!hasWallet && loginStep !== 'complete') {
        return (
            <div className="container mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold text-center mb-10">Wallet Connection</h1>
                <ConnectWallet />
            </div>
        )
    }

    // User has a connected wallet, show wallet info
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-center mb-10">Your Wallet</h1>

            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Wallet Connected</CardTitle>
                    <CardDescription>
                        Your wallet is ready to use with Radiator Springs Marketplace
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {Object.entries(wallets).map(([key, wallet]) => (
                        <div key={key} className="p-4 border rounded-md">
                            <h3 className="font-medium text-lg mb-2">Wallet: {key}</h3>
                            <p className="text-sm mb-2 font-mono">Address: {wallet.address}</p>

                            {wallet.balances ? (
                                <div className="mt-3">
                                    <h4 className="text-sm font-medium mb-1">Balances:</h4>
                                    <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-xs overflow-auto max-h-40">
                                        {JSON.stringify(wallet.balances, null, 2)}
                                    </pre>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Loading balances...</p>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
} 