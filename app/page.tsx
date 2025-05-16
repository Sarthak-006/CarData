import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { DocHudsonIcon, LightningMcQueenIcon, SheriffIcon, FloIcon } from "@/components/car-icons"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-900 to-emerald-700 text-white py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your Car Data, <span className="text-emerald-300">Vrooming with Value</span>
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Turn your vehicle's personality into a revenue stream on our decentralized marketplace. Share what makes your ride special, earn rewards, and join our Radiator Springs of mobility innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-white text-emerald-800 hover:bg-emerald-100 w-full sm:w-auto">
                    Start Your Engines <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    Meet The Cars
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-96">
              <Image
                src="/cars-hero.svg"
                alt="Lightning McQueen and friends with data visualization"
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How Radiator Springs Data Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<DocHudsonIcon className="h-14 w-14 text-blue-800" />}
              title="Connect with Doc Hudson"
              description="Let our resident expert analyze your car's health data with the wisdom of the Fabulous Hudson Hornet."
            />
            <FeatureCard
              icon={<LightningMcQueenIcon className="h-14 w-14 text-red-600" />}
              title="Lightning Fast Insights"
              description="Get McQueen-quality analytics and visualizations that help you understand your car's performance."
            />
            <FeatureCard
              icon={<SheriffIcon className="h-14 w-14 text-gray-700" />}
              title="Sheriff's Data Protection"
              description="Choose exactly what data you want to share. We keep your information under Sheriff's watchful eye."
            />
            <FeatureCard
              icon={<FloIcon className="h-14 w-14 text-teal-600" />}
              title="Flo's Rewards Cafe"
              description="Earn tokens at Flo's V8 Cafe when others purchase your anonymized data on our marketplace."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ka-Chow! Ready to Race Into Data Rewards?</h2>
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            Join thousands of vehicles already earning their racing stripes by sharing their data on our secure, decentralized Piston Cup marketplace.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Rev Your Engines Now
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
