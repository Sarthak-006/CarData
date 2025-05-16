import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Car, BarChart3, ShieldCheck, Coins } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-900 to-emerald-700 text-white py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your Car Data, <span className="text-emerald-300">Your Asset</span>
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Turn your vehicle's data into a revenue stream on our decentralized marketplace. Control what you share,
                earn rewards, and contribute to the future of mobility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-white text-emerald-800 hover:bg-emerald-100 w-full sm:w-auto">
                    Launch App <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-96">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Car data visualization"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How CarData Marketplace Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Car className="h-10 w-10 text-emerald-600" />}
              title="Connect Your Vehicle"
              description="Easily connect to your car's OBD port or use our simulator to see what data your vehicle generates."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-emerald-600" />}
              title="Visualize Your Data"
              description="See real-time analytics and insights about your driving patterns, vehicle health, and more."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-emerald-600" />}
              title="Control Your Privacy"
              description="Choose exactly what data you want to share and with whom. You're always in control."
            />
            <FeatureCard
              icon={<Coins className="h-10 w-10 text-emerald-600" />}
              title="Earn Rewards"
              description="Get paid in tokens when others purchase your anonymized data on our marketplace."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Monetize Your Vehicle Data?</h2>
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            Join thousands of drivers already earning rewards by sharing their vehicle data on our secure, decentralized
            marketplace.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
