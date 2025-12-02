import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Free Tax Tools for Digital Nomads - Calculators & Checkers',
  description:
    'Free tax planning tools for digital nomads: Tax Residency Checker, Day Tracker, and FEIE Calculator. Plan your travels and stay tax compliant.',
  keywords: [
    'digital nomad tax tools',
    'tax residency calculator',
    'FEIE calculator',
    'day tracker nomad',
    'free tax tools',
    'nomad tax planning tools',
  ],
  openGraph: {
    title: 'Free Tax Tools for Digital Nomads',
    description:
      'Tax Residency Checker, Day Tracker, and FEIE Calculator. Free tools for nomad tax planning.',
    url: `${SITE_CONFIG.url}/tools`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/tools`,
  },
}

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Tools', href: '/tools' },
]

const tools = [
  {
    title: 'Tax Residency Checker',
    description:
      'Calculate your potential tax residency status across multiple countries based on days spent. Understand the 183-day rule and country-specific thresholds.',
    href: '/tools/tax-residency-checker',
    icon: MapPin,
    badge: 'Most Popular',
    features: [
      'Multi-country analysis',
      'Risk level assessment',
      'Country-specific rules',
      'Recommendations',
    ],
  },
  {
    title: 'Day Tracker',
    description:
      'Track your travel days across countries throughout the year. Monitor your presence in each country and get alerts when approaching tax thresholds.',
    href: '/tools/day-tracker',
    icon: Calendar,
    badge: null,
    features: [
      'Trip logging',
      'Year-over-year tracking',
      'Threshold alerts',
      'Export functionality',
    ],
  },
  {
    title: 'FEIE Calculator',
    description:
      'Calculate your Foreign Earned Income Exclusion eligibility and potential tax savings. Determine if you qualify for the Physical Presence Test.',
    href: '/tools/feie-calculator',
    icon: Calculator,
    badge: 'US Citizens',
    features: [
      'Physical Presence Test',
      'Exclusion calculation',
      'Pro-rata adjustments',
      'Qualification check',
    ],
  },
]

export default function ToolsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Free Tax Tools for Digital Nomads
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plan your travels smartly with our free tax planning tools. Track your days, check
            residency status, and calculate potential tax savings.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="block group">
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg w-fit">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    {tool.badge && <Badge variant="secondary">{tool.badge}</Badge>}
                  </div>
                  <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    Use Tool <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Additional Info Section */}
        <section className="mt-16 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-center mb-8">Why Use Our Tax Tools?</h2>
          <div className="grid md:grid-cols-3 gap-8 not-prose">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-lg font-medium mb-1">Free Forever</div>
              <p className="text-sm text-muted-foreground">
                All our tools are completely free to use with no hidden fees or premium tiers.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">183+</div>
              <div className="text-lg font-medium mb-1">Countries Covered</div>
              <p className="text-sm text-muted-foreground">
                Comprehensive coverage of tax residency rules for countries popular with nomads.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">0</div>
              <div className="text-lg font-medium mb-1">Data Stored</div>
              <p className="text-sm text-muted-foreground">
                Your data stays on your device. We don&apos;t collect or store any personal
                information.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
