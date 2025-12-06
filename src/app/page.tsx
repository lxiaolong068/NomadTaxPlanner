import Link from "next/link";
import {
  Calculator,
  MapPin,
  Calendar,
  Globe,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllCountryGuides } from "@/lib/country-data";

const tools = [
  {
    title: "Tax Residency Checker",
    description:
      "Calculate your potential tax residency status across multiple countries based on days spent.",
    href: "/tools/tax-residency-checker",
    icon: MapPin,
    badge: "Most Popular",
  },
  {
    title: "Day Tracker",
    description:
      "Track your travel days across countries and monitor tax residency thresholds in real-time.",
    href: "/tools/day-tracker",
    icon: Calendar,
    badge: null,
  },
  {
    title: "FEIE Calculator",
    description:
      "Calculate your Foreign Earned Income Exclusion eligibility and potential tax savings.",
    href: "/tools/feie-calculator",
    icon: Calculator,
    badge: "US Citizens",
  },
];

const features = [
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data stays on your device. We never collect or store personal information.",
  },
  {
    icon: Zap,
    title: "100% Free",
    description:
      "All tools are completely free with no hidden fees, subscriptions, or premium tiers.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "Support for 180+ countries with detailed guides for popular nomad destinations.",
  },
];

export default function HomePage() {
  const countryGuides = getAllCountryGuides();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 md:py-32 overflow-hidden">
        {/* Hero Background Image */}
        <img
          src="https://oxnbbm6ljoyuzqns.public.blob.vercel-storage.com/digital-nomad-working-laptop-beach-tropical/Wu2MXvbyt7w.jpg"
          alt="Digital nomad working remotely"
          className="absolute inset-0 w-full h-full object-cover opacity-10 -z-10"
        />
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Free Tax Planning Tools for Digital Nomads
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Navigate Global Taxes with Confidence
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Free tools to help digital nomads understand tax residency, track
              travel days, and plan for tax obligations across multiple
              countries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/tools">
                  Explore Free Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/guides">Browse Country Guides</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Free Tax Planning Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful calculators and trackers designed specifically for the
              digital nomad lifestyle. No signup required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="block group">
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-2 bg-primary/10 rounded-lg w-fit">
                        <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      {tool.badge && (
                        <Badge variant="secondary">{tool.badge}</Badge>
                      )}
                    </div>
                    <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      Try Now <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose {SITE_CONFIG.name}?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built by nomads, for nomads. We understand the unique tax
              challenges of location-independent living.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country Guides Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Country Tax Guides</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Detailed tax guides for popular digital nomad destinations.
              Understand residency rules, tax rates, and special programs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {countryGuides.map((guide) => (
              <Link
                key={guide.code}
                href={`/guides/${guide.slug}`}
                className="flex flex-col items-center p-4 bg-background rounded-lg border hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <span className="text-4xl mb-2">{guide.flag}</span>
                <span className="font-medium text-sm group-hover:text-primary transition-colors">
                  {guide.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {guide.residencyThreshold} days
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline">
              <Link href="/guides">
                View All Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Concepts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Tax Essentials for Digital Nomads
            </h2>
            <p className="text-muted-foreground">
              Understanding these key concepts will help you navigate
              international taxes.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">The 183-Day Rule</h3>
                <p className="text-muted-foreground">
                  Most countries consider you a tax resident if you spend 183 or
                  more days there in a tax year. Some countries have lower
                  thresholds (Thailand: 180 days) or more complex calculations
                  (US: Substantial Presence Test).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Double Tax Treaties</h3>
                <p className="text-muted-foreground">
                  Tax treaties between countries help prevent double taxation.
                  They establish which country has the right to tax different
                  types of income and often include tie-breaker rules for
                  residency.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Foreign Earned Income Exclusion (US)
                </h3>
                <p className="text-muted-foreground">
                  US citizens living abroad can exclude up to $126,500 (2024) of
                  foreign earned income from US federal taxes if they meet
                  either the Physical Presence Test (330 days abroad) or Bona
                  Fide Residence Test.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Special Tax Programs</h3>
                <p className="text-muted-foreground">
                  Many countries offer special tax regimes for expats and
                  digital nomads, such as Portugal&apos;s NHR, UK&apos;s Non-Dom
                  status, or Thailand&apos;s LTR visa. These can significantly
                  reduce your tax burden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Planning Your Tax Strategy Today
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Use our free tools to understand your tax obligations, track your
            travel days, and make informed decisions about where to base
            yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/tools/tax-residency-checker">
                Check Your Tax Residency
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/tools/day-tracker">Start Tracking Days</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground">Free Forever</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div>
              <div className="text-2xl font-bold">180+</div>
              <div className="text-sm text-muted-foreground">
                Countries Supported
              </div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div>
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">
                Data Collected
              </div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div>
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Free Tools</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
