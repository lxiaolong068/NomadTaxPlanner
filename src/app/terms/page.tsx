import { Metadata } from "next";
import Link from "next/link";
import { FileText, AlertTriangle, Scale, Users, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_CONFIG.name}`,
  description:
    "Terms of Service for NomadTaxPlanner. Important information about using our free tax planning tools and educational resources.",
};

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Please read these terms carefully before using {SITE_CONFIG.name}.
              By using our website, you agree to these terms.
            </p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Alert variant="destructive" className="bg-background">
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription className="text-base">
              <strong>Important:</strong> The tools and information on this
              website are for educational purposes only and do not constitute
              professional tax, legal, or financial advice. Always consult with
              qualified professionals before making tax-related decisions.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-10">
              {/* Section 1 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">
                    1. Acceptance of Terms
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  By accessing or using {SITE_CONFIG.name} (&quot;the
                  Website&quot;), you agree to be bound by these Terms of
                  Service. If you do not agree to these terms, please do not use
                  the Website.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">
                    2. Educational Purpose Only
                  </h2>
                </div>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    All content, tools, calculators, and information provided on
                    this Website are for{" "}
                    <strong>educational and informational purposes only</strong>
                    . They are not intended to provide and should not be
                    construed as:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Professional tax advice</li>
                    <li>Legal advice</li>
                    <li>Financial planning advice</li>
                    <li>Accounting services</li>
                    <li>
                      Any other form of professional advice or recommendation
                    </li>
                  </ul>
                  <p>
                    The information provided may not apply to your specific
                    situation. Tax laws are complex, vary significantly between
                    jurisdictions, and change frequently.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Scale className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">
                    3. No Professional Relationship
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  Use of this Website does not create any professional
                  relationship between you and {SITE_CONFIG.name}, including but
                  not limited to an attorney-client, accountant-client, or
                  advisor-client relationship. We are not licensed tax
                  professionals, attorneys, or financial advisors.
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">
                    4. User Responsibilities
                  </h2>
                </div>
                <div className="text-muted-foreground space-y-4">
                  <p>By using this Website, you acknowledge and agree that:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      You are solely responsible for your own tax compliance and
                      financial decisions
                    </li>
                    <li>
                      You should consult with qualified tax professionals before
                      making any tax-related decisions
                    </li>
                    <li>
                      You will verify all information independently before
                      relying on it
                    </li>
                    <li>
                      Results from our calculators and tools are estimates only
                      and may not reflect your actual tax situation
                    </li>
                    <li>
                      You will not use this Website for any unlawful purpose
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  5. Limitation of Liability
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    To the fullest extent permitted by applicable law,{" "}
                    {SITE_CONFIG.name} and its operators shall not be liable for
                    any:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Direct, indirect, incidental, special, consequential, or
                      punitive damages
                    </li>
                    <li>
                      Loss of profits, data, use, goodwill, or other intangible
                      losses
                    </li>
                    <li>
                      Damages resulting from your use of or inability to use the
                      Website
                    </li>
                    <li>
                      Damages resulting from any decisions made based on
                      information obtained from the Website
                    </li>
                    <li>
                      Tax penalties, interest, or additional taxes owed as a
                      result of using information from this Website
                    </li>
                  </ul>
                  <p>
                    This limitation applies regardless of whether the damages
                    are based on warranty, contract, tort, or any other legal
                    theory.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  6. Accuracy of Information
                </h2>
                <p className="text-muted-foreground">
                  While we strive to provide accurate and up-to-date
                  information, we make no warranties or representations about
                  the accuracy, completeness, reliability, or timeliness of any
                  content on this Website. Tax laws and regulations change
                  frequently, and information may become outdated. Always verify
                  information with official government sources and qualified
                  professionals.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  7. Intellectual Property
                </h2>
                <p className="text-muted-foreground">
                  All content on this Website, including text, graphics, logos,
                  icons, images, and software, is the property of{" "}
                  {SITE_CONFIG.name} or its content suppliers and is protected
                  by intellectual property laws. You may not reproduce,
                  distribute, modify, or create derivative works from any
                  content without our express written permission.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h2 className="text-2xl font-bold mb-4">8. Third-Party Links</h2>
                <p className="text-muted-foreground">
                  This Website may contain links to third-party websites. These
                  links are provided for convenience only. We do not endorse or
                  make any representations about third-party websites and are
                  not responsible for their content or privacy practices.
                </p>
              </div>

              {/* Section 9 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">
                    9. Changes to Terms
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  We reserve the right to modify these Terms of Service at any
                  time. Changes will be effective immediately upon posting to
                  the Website. Your continued use of the Website after any
                  changes constitutes acceptance of the new terms.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms of Service shall be governed by and construed in
                  accordance with applicable laws, without regard to conflict of
                  law principles.
                </p>
              </div>

              {/* Section 11 */}
              <div>
                <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please
                  contact us at{" "}
                  <a
                    href="mailto:hello@nomadtaxplanner.com"
                    className="text-primary hover:underline"
                  >
                    hello@nomadtaxplanner.com
                  </a>
                  .
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-12 pt-8 border-t">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Related Pages</h2>
          <p className="text-muted-foreground mb-6">
            Review our other policies and learn more about {SITE_CONFIG.name}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/privacy"
              className="text-primary hover:underline font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/about"
              className="text-primary hover:underline font-medium"
            >
              About Us
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/about#disclaimer"
              className="text-primary hover:underline font-medium"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
