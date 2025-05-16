import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { DocHudsonIcon, LightningMcQueenIcon, SheriffIcon, FloIcon } from "@/components/car-icons"

export default function About() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About Radiator Springs</h1>
        <p className="text-xl text-gray-600">
          A Pixar Cars-themed decentralized platform empowering vehicles to share their stories while keeping their paint job shiny and their data secure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At Radiator Springs, we believe that vehicle data is as valuable as a fresh coat of paint. Your data should benefit the car who generates it - you! Our mission is to create a fair, transparent pit stop where all vehicles can monetize their data while maintaining complete control over what they share.
          </p>
          <p className="text-gray-600 mb-4">
            We're building the highway for the future of mobility, where data flows as smoothly as Lightning McQueen on race day, connecting vehicles, owners, and buyers in a decentralized network that rewards participation and protects privacy like Sheriff watches over Route 66.
          </p>
          <Link href="/dashboard">
            <Button className="mt-2">
              Cruise the Speedway <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="bg-gray-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Why Radiator Springs?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <SheriffIcon className="h-5 w-5 text-gray-700 mr-2 mt-0.5" />
              <span>Sheriff ensures you control what data you share and with whom</span>
            </li>
            <li className="flex items-start">
              <FloIcon className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
              <span>Earn tokens at Flo's V8 Cafe by sharing anonymized vehicle data</span>
            </li>
            <li className="flex items-start">
              <DocHudsonIcon className="h-5 w-5 text-blue-800 mr-2 mt-0.5" />
              <span>Doc Hudson's analysis provides insights about your performance</span>
            </li>
            <li className="flex items-start">
              <LightningMcQueenIcon className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
              <span>Lightning-fast decentralized infrastructure ensures data integrity</span>
            </li>
            <li className="flex items-start">
              <SheriffIcon className="h-5 w-5 text-gray-700 mr-2 mt-0.5" />
              <span>End-to-end encryption protects your sensitive information like Sheriff's watch</span>
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
                <LightningMcQueenIcon className="h-12 w-12 text-red-600" />
              </div>
              <p className="text-gray-600">
                Pull into Luigi's Casa Della Tires and get connected with our special Piston Cup OBD device. Your data stays as protected as Lightning's lucky sticker collection.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <SheriffIcon className="h-12 w-12 text-gray-700" />
              </div>
              <p className="text-gray-600">
                Just like Sheriff keeps order on Route 66, you choose exactly what data you want to share. Set permissions faster than Mater can say "Dad-gum!" and revoke access any time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Earn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <FloIcon className="h-12 w-12 text-teal-600" />
              </div>
              <p className="text-gray-600">
                Receive Piston Cup tokens when your data is purchased at the Trading Post. The more valuable your laps around the track, the more you earn at Flo's V8 Cafe.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-lg p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Radiator Springs Family</h2>
          <p className="text-gray-600 mb-6">
            Radiator Springs is more than just a pit stop - it's a community that values every vehicle, from rusty tow trucks to sleek race cars. We're building a world where all vehicles get their fair share of the oil, gas, and data economy.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Ka-Chow! Start Your Engine
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
              Sheriff keeps a close eye on everything! Your data is encrypted end-to-end and stored securely in Radiator Springs' decentralized network. You maintain complete control like Doc Hudson at a Piston Cup race.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">What kind of data can I share?</h3>
            <p className="text-gray-600">
              Everything from your speed stats (Lightning loves these), to your location travels (Mater's territory), diagnostics (Doc's specialty), performance metrics, and even your fuel consumption (Fillmore keeps track of these).
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">How do I get paid for my data?</h3>
            <p className="text-gray-600">
              You receive shiny Piston Cup tokens in your connected wallet faster than Lightning McQueen can say "Ka-Chow!" whenever someone purchases your data at the Trading Post.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">Who buys vehicle data?</h3>
            <p className="text-gray-600">
              Everyone from Dinoco sponsors to Rust-eze marketers! Insurance companies, urban planners, automotive manufacturers like Radiator Springs' own Ramone, and research institutions all purchase anonymized vehicle data to make driving better for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
