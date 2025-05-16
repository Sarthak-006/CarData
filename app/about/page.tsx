import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Car, ShieldCheck, Coins, Brain, Database, Lock } from "lucide-react"

export default function About() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About CarData Marketplace</h1>
        <p className="text-xl text-gray-600">
          A decentralized platform empowering vehicle owners to monetize their data while maintaining privacy and
          control.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At CarData Marketplace, we believe that vehicle data is a valuable asset that should benefit the people who
            generate it - the drivers. Our mission is to create a fair, transparent ecosystem where car owners can
            monetize their data while maintaining complete control over what they share.
          </p>
          <p className="text-gray-600 mb-4">
            We're building the infrastructure for the future of mobility, where data flows securely between vehicles,
            owners, and buyers in a decentralized network that rewards participation and protects privacy.
          </p>
          <Link href="/dashboard">
            <Button className="mt-2">
              Explore the Platform <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="bg-gray-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Why CarData Marketplace?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <ShieldCheck className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
              <span>Full control over what data you share and with whom</span>
            </li>
            <li className="flex items-start">
              <Coins className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
              <span>Earn tokens by sharing anonymized vehicle data</span>
            </li>
            <li className="flex items-start">
              <Brain className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
              <span>AI-powered insights about your vehicle and driving habits</span>
            </li>
            <li className="flex items-start">
              <Database className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
              <span>Decentralized infrastructure ensures data integrity</span>
            </li>
            <li className="flex items-start">
              <Lock className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
              <span>End-to-end encryption protects your sensitive information</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <Car className="h-12 w-12 text-emerald-600" />
              </div>
              <p className="text-gray-600">
                Connect your vehicle to our platform using our OBD device or simulator. Your data remains encrypted and
                under your control at all times.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <ShieldCheck className="h-12 w-12 text-emerald-600" />
              </div>
              <p className="text-gray-600">
                Choose exactly what data you want to share. Set permissions for different types of data and revoke
                access at any time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Earn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <Coins className="h-12 w-12 text-emerald-600" />
              </div>
              <p className="text-gray-600">
                Receive tokens when your data is purchased on the marketplace. The more valuable your data, the more you
                earn.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-lg p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Future of Mobility</h2>
          <p className="text-gray-600 mb-6">
            CarData Marketplace is more than just a platform - it's a movement towards a more equitable data economy
            where vehicle owners are fairly compensated for the valuable data they generate.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">How secure is my data?</h3>
            <p className="text-gray-600">
              Your data is encrypted end-to-end and stored on a decentralized network. You maintain complete control
              over what is shared and with whom.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">What kind of data can I share?</h3>
            <p className="text-gray-600">
              You can share various types of vehicle data including location, diagnostics, performance metrics, and fuel
              consumption data.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">How do I get paid for my data?</h3>
            <p className="text-gray-600">
              You receive DATA tokens in your connected wallet whenever someone purchases your data on the marketplace.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">Who buys vehicle data?</h3>
            <p className="text-gray-600">
              Various entities including insurance companies, urban planners, automotive manufacturers, and research
              institutions purchase anonymized vehicle data for analysis and product improvement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
