import { Metadata } from 'next'
import { DayTracker } from '@/components/tools/day-tracker'
import { ToolJsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Day Tracker - Track Your Travel Days for Tax Purposes',
  description:
    'Free day tracker for digital nomads. Monitor your travel days across countries, track tax residency thresholds, and avoid unexpected tax obligations.',
  keywords: [
    'day tracker',
    'travel day counter',
    'digital nomad tracker',
    'tax day counter',
    '183 day tracker',
    'residency day tracker',
    'nomad tax tracker',
  ],
  openGraph: {
    title: 'Day Tracker - Track Your Travel Days for Tax Purposes',
    description:
      'Free day tracking tool for digital nomads. Monitor tax residency thresholds across countries.',
    url: `${SITE_CONFIG.url}/tools/day-tracker`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/tools/day-tracker`,
  },
}

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Tools', href: '/tools' },
  { name: 'Day Tracker', href: '/tools/day-tracker' },
]

const faqs = [
  {
    question: 'Why should I track my travel days?',
    answer:
      'Tracking your travel days helps you monitor your presence in different countries and avoid accidentally triggering tax residency. Many countries use a day-count threshold (often 183 days) to determine tax obligations.',
  },
  {
    question: 'Is my data stored securely?',
    answer:
      'Your travel data is stored locally in your browser using LocalStorage. It never leaves your device and is not sent to any server. You can export your data at any time for backup.',
  },
  {
    question: 'Do arrival and departure days count as full days?',
    answer:
      'This varies by country. Some count the day of arrival, others count the day of departure, and some count both. Our tracker counts both arrival and departure dates as full days for conservative planning.',
  },
  {
    question: 'Can I track multiple years?',
    answer:
      'Yes, the day tracker supports multiple years. Use the year selector to view and add trips for different tax years. Your historical data is preserved.',
  },
  {
    question: 'How do I export my travel data?',
    answer:
      'Click the Export button to download your travel data as a JSON file. This includes all your trips and country summaries, which you can use for tax filing or backup purposes.',
  },
]

export default function DayTrackerPage() {
  return (
    <>
      <ToolJsonLd
        name="Day Tracker"
        description="Free travel day tracking tool for digital nomads. Monitor your days in each country and track tax residency thresholds."
        url={`${SITE_CONFIG.url}/tools/day-tracker`}
      />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Day Tracker</h1>
          <p className="text-lg text-muted-foreground">
            Track your travel days across countries and monitor tax residency thresholds. Your data
            is stored locally on your device for privacy.
          </p>
        </header>

        <DayTracker />

        {/* Educational Content for SEO */}
        <section className="mt-12 prose prose-slate max-w-none">
          <h2>Why Tracking Your Travel Days Matters</h2>
          <p>
            As a digital nomad, keeping accurate records of your travel is essential for tax
            compliance. Many countries determine tax residency based on the number of days you
            spend within their borders, making day tracking a crucial part of nomad life.
          </p>

          <h3>Common Day-Counting Rules</h3>
          <p>
            Different countries have different rules for counting days. Here are some common
            approaches:
          </p>
          <ul>
            <li>
              <strong>Physical Presence:</strong> Any day you are physically present in the country,
              even for part of the day
            </li>
            <li>
              <strong>Midnight Rule:</strong> Only days where you are present at midnight count
            </li>
            <li>
              <strong>Calendar Year:</strong> Days are counted within a calendar year (Jan 1 - Dec
              31)
            </li>
            <li>
              <strong>Rolling Period:</strong> Days are counted over a rolling 12-month or 365-day
              period
            </li>
          </ul>

          <h3>Best Practices for Day Tracking</h3>
          <ul>
            <li>Record trips immediately after travel to ensure accuracy</li>
            <li>Keep supporting documents like boarding passes and hotel receipts</li>
            <li>Note the purpose of each trip (work, leisure, transit)</li>
            <li>Export your data regularly for backup and tax filing</li>
            <li>Review your totals monthly to avoid surprises</li>
          </ul>

          <h3>What Happens When You Exceed a Threshold?</h3>
          <p>
            Exceeding a country&apos;s residency threshold typically means you become a tax resident
            and may need to:
          </p>
          <ul>
            <li>File a tax return in that country</li>
            <li>Pay taxes on income earned while there (or worldwide income)</li>
            <li>Register with local tax authorities</li>
            <li>Potentially claim tax treaty benefits to avoid double taxation</li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
