import Link from 'next/link'
import { Globe } from 'lucide-react'
import { SITE_NAME, TOOL_LINKS, SUPPORTED_COUNTRIES } from '@/lib/constants'

const footerLinks = {
  tools: TOOL_LINKS.map((tool) => ({
    label: tool.title,
    href: tool.href,
  })),
  guides: SUPPORTED_COUNTRIES.map((country) => ({
    label: country.name,
    href: `/guides/${country.slug}`,
  })),
  resources: [
    { label: 'Tax Basics', href: '/learn' },
    { label: 'FAQ', href: '/resources/faq' },
    { label: 'About', href: '/about' },
  ],
  legal: [
    { label: 'Disclaimer', href: '/about#disclaimer' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">{SITE_NAME}</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Free tax planning tools for digital nomads. Understand your tax obligations across borders.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Tools</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Country Guides */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Country Guides</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.guides.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-xs text-gray-500 mb-4">
            <strong>Disclaimer:</strong> The information and tools provided on this website are for educational and informational purposes only. They do not constitute professional tax, legal, or financial advice. Tax laws are complex and vary by jurisdiction. Always consult with a qualified tax professional before making any tax-related decisions.
          </p>
          <p className="text-sm text-gray-600">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
