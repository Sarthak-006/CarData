"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { Menu, X, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { LightningMcQueenIcon } from "./car-icons"
import { usePara } from "@/context/para-context"

const navLinks = [
  { name: "Speedway", href: "/dashboard" },
  { name: "Trading Post", href: "/marketplace" },
  { name: "Doc's Analysis", href: "/insights" },
  { name: "My Garage", href: "/my-data" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, login, logout } = useAuth()
  const { hasWallet } = usePara()

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <LightningMcQueenIcon className="h-8 w-8 text-red-600" />
            <span className="ml-2 text-xl font-bold text-emerald-800">Radiator Springs</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600",
                pathname === link.href && "text-emerald-600",
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
          <Link
            href="/wallet"
            className={cn(
              "flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600",
              pathname === '/wallet' && "text-emerald-600",
            )}
          >
            <Wallet className="h-5 w-5 mr-1" />
            {hasWallet ? "My Wallet" : "Connect Wallet"}
          </Link>

          {user ? (
            <Button variant="outline" onClick={logout}>
              Park It
            </Button>
          ) : (
            <Button onClick={login}>Start Your Engine</Button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                <LightningMcQueenIcon className="h-8 w-8 text-red-600" />
                <span className="ml-2 text-xl font-bold text-emerald-800">Radiator Springs</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                        pathname === link.href && "bg-gray-50 text-emerald-600",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}

                  <Link
                    href="/wallet"
                    className={cn(
                      "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                      pathname === '/wallet' && "bg-gray-50 text-emerald-600",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Wallet className="h-5 w-5 mr-2" />
                      {hasWallet ? "My Wallet" : "Connect Wallet"}
                    </div>
                  </Link>
                </div>
                <div className="py-6">
                  {user ? (
                    <Button variant="outline" onClick={logout} className="w-full">
                      Park It
                    </Button>
                  ) : (
                    <Button onClick={login} className="w-full">
                      Start Your Engine
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
