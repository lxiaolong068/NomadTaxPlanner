import { Metadata } from 'next'
import { TaxResidencyChecker } from '@/components/tools/tax-residency-checker'
import { ToolJsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Tax Residency Checker - Free Tool for Digital Nomads',
  description:
    'Free tax residency checker for digital nomads. Calculate your tax residency risk across multiple countries based on days spent. Understand 183-day rules and avoid double taxation.',
  keywords: [
    'tax residency checker',
    'digital nomad tax',
    '183 day rule',
    'tax residency calculator',
    'nomad tax planning',
    'where am I tax resident',
    'tax residency test',
  ],
  openGraph: {
    title: 'Tax Residency Checker - Free Tool for Digital Nomads',
    description:
      'Calculate your tax residency risk across multiple countries. Free tool for digital nomads.',
    url: `${SITE_CONFIG.url}/tools/tax-residency-checker`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/tools/tax-residency-checker`,
  },
}

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Tools', href: '/tools' },
  { name: 'Tax Residency Checker', href: '/tools/tax-residency-checker' },
]

const faqs = [
  {
    question: 'What is the 183-day rule for tax residency?',
    answer:
      'The 183-day rule is a common tax principle where spending 183 or more days in a country within a tax year typically makes you a tax resident there. However, different countries have variations of this rule and may consider other factors.',
  },
  {
    question: 'Can I be a tax resident in multiple countries?',
    answer:
      'Yes, it is possible to be considered a tax resident in multiple countries simultaneously. This is called dual residency. Double tax treaties between countries help determine which country has primary taxing rights.',
  },
  {
    question: 'How accurate is this tax residency checker?',
    answer:
      'This tool provides general guidance based on common day-counting rules. However, tax residency can involve many factors beyond days spent, including ties to a country, domicile, and intent. Always consult a tax professional.',
  },
  {
    question: 'What happens if I exceed the day threshold?',
    answer:
      'Exceeding the day threshold typically triggers tax residency obligations in that country. You may need to file tax returns, pay taxes on worldwide income, and comply with local tax laws. The specific implications vary by country.',
  },
  {
    question: 'Do transit days count toward tax residency?',
    answer:
      'Generally, transit days where you are merely passing through a country do not count toward tax residency. However, rules vary by country. Some count any day you are present at midnight, while others have specific transit exemptions.',
  },
]

export default function TaxResidencyCheckerPage() {
  return (
    <>
      <ToolJsonLd
        name="Tax Residency Checker"
        description="Free tax residency calculator for digital nomads. Check your residency status across multiple countries based on days spent."
        url={`${SITE_CONFIG.url}/tools/tax-residency-checker`}
      />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Tax Residency Checker</h1>
          <p className="text-lg text-muted-foreground">
            Calculate your potential tax residency status across multiple countries. Enter your
            travel data to understand where you might have tax obligations.
          </p>
        </header>

        <TaxResidencyChecker />

        {/* Educational Content for SEO */}
        <section className="mt-12 prose prose-slate max-w-none">
          <h2>Understanding Tax Residency for Digital Nomads</h2>
          <p>
            As a digital nomad, understanding tax residency is crucial for staying compliant and
            avoiding unexpected tax bills. Most countries use some form of &quot;days spent&quot;
            test to determine tax residency, with 183 days being the most common threshold.
          </p>

          <h3>The 183-Day Rule Explained</h3>
          <p>
            The 183-day rule is a common benchmark used by many countries to determine tax
            residency. If you spend 183 days or more in a country during a tax year, you are
            typically considered a tax resident and may be subject to tax on your worldwide income.
          </p>
          <p>
            However, this rule is not universal. Some countries have different thresholds (e.g.,
            Thailand uses 180 days), while others like the US use more complex calculations like
            the Substantial Presence Test.
          </p>

          <h3>Key Factors Beyond Day Counting</h3>
          <ul>
            <li>
              <strong>Permanent home:</strong> Where you maintain a permanent residence
            </li>
            <li>
              <strong>Center of vital interests:</strong> Where your personal and economic ties are
              strongest
            </li>
            <li>
              <strong>Habitual abode:</strong> Where you normally live
            </li>
            <li>
              <strong>Nationality:</strong> Your citizenship status
            </li>
          </ul>

          <h3>Double Taxation and Tax Treaties</h3>
          <p>
            If you&apos;re potentially a tax resident in multiple countries, double tax treaties
            (DTTs) can help prevent being taxed twice on the same income. These treaties establish
            rules for determining which country has primary taxing rights and often include
            tie-breaker provisions.
          </p>
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
