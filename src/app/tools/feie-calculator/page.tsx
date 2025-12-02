import { Metadata } from 'next'
import { FEIECalculator } from '@/components/tools/feie-calculator'
import { ToolJsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'FEIE Calculator - Foreign Earned Income Exclusion Calculator',
  description:
    'Free FEIE calculator for US expats and digital nomads. Calculate your Foreign Earned Income Exclusion eligibility and potential tax savings using the Physical Presence Test.',
  keywords: [
    'FEIE calculator',
    'foreign earned income exclusion',
    'physical presence test',
    'form 2555',
    'expat tax calculator',
    'US expat taxes',
    'digital nomad tax usa',
  ],
  openGraph: {
    title: 'FEIE Calculator - Foreign Earned Income Exclusion',
    description:
      'Calculate your Foreign Earned Income Exclusion eligibility and potential tax savings.',
    url: `${SITE_CONFIG.url}/tools/feie-calculator`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/tools/feie-calculator`,
  },
}

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Tools', href: '/tools' },
  { name: 'FEIE Calculator', href: '/tools/feie-calculator' },
]

const faqs = [
  {
    question: 'What is the Foreign Earned Income Exclusion (FEIE)?',
    answer:
      'The FEIE allows qualifying US citizens and resident aliens living abroad to exclude a certain amount of foreign earned income from US taxation. For 2024, the maximum exclusion is $126,500.',
  },
  {
    question: 'What is the Physical Presence Test?',
    answer:
      'The Physical Presence Test requires you to be physically present in a foreign country or countries for at least 330 full days during a consecutive 12-month period. This is one of two ways to qualify for the FEIE.',
  },
  {
    question: 'How many days can I spend in the US and still qualify?',
    answer:
      'During your 365-day test period, you can spend up to 35 days in the US (365 - 330 = 35). However, these days must not break your qualifying period, and there may be restrictions on the purpose of your US visits.',
  },
  {
    question: 'What income qualifies for the FEIE?',
    answer:
      'Only earned income (wages, salaries, self-employment income, professional fees) qualifies. Passive income like dividends, interest, capital gains, and rental income do not qualify for the exclusion.',
  },
  {
    question: 'Do I still need to file a US tax return if I qualify for FEIE?',
    answer:
      'Yes, US citizens and resident aliens must file a tax return regardless of where they live if their income exceeds filing thresholds. You claim the FEIE by filing Form 2555 with your return.',
  },
  {
    question: 'What is the Bona Fide Residence Test?',
    answer:
      'The Bona Fide Residence Test is an alternative to the Physical Presence Test. It requires you to be a bona fide resident of a foreign country for an uninterrupted period that includes an entire tax year. This test is more subjective and considers factors like intent, ties to the foreign country, and more.',
  },
]

export default function FEIECalculatorPage() {
  return (
    <>
      <ToolJsonLd
        name="FEIE Calculator"
        description="Free Foreign Earned Income Exclusion calculator for US expats and digital nomads. Calculate your eligibility and potential tax savings."
        url={`${SITE_CONFIG.url}/tools/feie-calculator`}
      />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">FEIE Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Calculate your Foreign Earned Income Exclusion eligibility and potential tax savings
            using the Physical Presence Test. For US citizens and resident aliens living abroad.
          </p>
        </header>

        <FEIECalculator />

        {/* Educational Content for SEO */}
        <section className="mt-12 prose prose-slate max-w-none">
          <h2>Understanding the Foreign Earned Income Exclusion</h2>
          <p>
            The Foreign Earned Income Exclusion (FEIE) is one of the most valuable tax benefits
            available to US citizens and resident aliens working abroad. It allows qualifying
            taxpayers to exclude a significant amount of their foreign earned income from US
            federal income tax.
          </p>

          <h3>2024 FEIE Maximum Exclusion</h3>
          <p>
            For the 2024 tax year, the maximum FEIE is <strong>$126,500</strong>. This amount is
            adjusted annually for inflation. Combined with the Foreign Housing Exclusion, expats
            can potentially exclude even more of their income.
          </p>

          <h3>Physical Presence Test Requirements</h3>
          <p>To qualify using the Physical Presence Test, you must:</p>
          <ul>
            <li>Be physically present in a foreign country for at least 330 full days</li>
            <li>During any consecutive 12-month period</li>
            <li>The 12-month period must include days in the tax year you&apos;re claiming</li>
          </ul>

          <h3>What Counts as a &quot;Full Day&quot;?</h3>
          <p>
            A full day means the entire 24-hour period from midnight to midnight. Days spent
            traveling over international waters or in international airspace do not count toward
            the 330-day requirement. Partial days in a foreign country do not count as full days.
          </p>

          <h3>Choosing Your 12-Month Period</h3>
          <p>
            One advantage of the Physical Presence Test is flexibility in choosing your 12-month
            period. It doesn&apos;t have to be a calendar year—you can choose any consecutive
            365-day period that maximizes your qualifying days.
          </p>

          <h3>Form 2555</h3>
          <p>
            To claim the FEIE, you must file Form 2555, Foreign Earned Income, with your tax
            return. This form requires detailed information about your foreign residence, time
            spent abroad, and foreign earned income.
          </p>

          <h3>Important Considerations</h3>
          <ul>
            <li>
              <strong>Self-Employment Tax:</strong> The FEIE only excludes income from federal
              income tax, not self-employment tax.
            </li>
            <li>
              <strong>Tax Bracket Impact:</strong> Excluded income still affects your tax bracket
              for any remaining taxable income.
            </li>
            <li>
              <strong>Foreign Tax Credit:</strong> You cannot claim the Foreign Tax Credit on
              income excluded under FEIE.
            </li>
            <li>
              <strong>State Taxes:</strong> State tax treatment varies; some states don&apos;t
              recognize the FEIE.
            </li>
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
