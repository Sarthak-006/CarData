"use client"

import "./globals.css"
import "leaflet/dist/leaflet.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/auth-context"
import { DataProvider } from "@/context/data-context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <DataProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
              </div>
              <Toaster />
            </DataProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
