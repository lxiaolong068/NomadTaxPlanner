import { Metadata } from "next";
import Link from "next/link";
import { Shield, Database, Cookie, Eye, Server, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_CONFIG.name}`,
  description:
    "NomadTaxPlanner privacy policy. Learn how we protect your privacy - we collect no personal data and all calculations happen locally on your device.",
};

const privacyPoints = [
  {
    icon: Database,
    title: "No Data Collection",
    description:
      "We do not collect, store, or process any personal information. No forms to fill, no accounts to create, no data to harvest.",
  },
  {
    icon: Server,
    title: "Local Processing",
    description:
      "All calculations happen entirely in your browser. Your financial data never leaves your device or touches our servers.",
  },
  {
    icon: Cookie,
    title: "No Tracking Cookies",
    description:
      "We don't use tracking cookies, advertising pixels, or any other surveillance technologies to monitor your behavior.",
  },
  {
    icon: Eye,
    title: "No Third-Party Analytics",
    description:
      "We don't use Google Analytics, Facebook Pixel, or any third-party services that would track your activity across the web.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Privacy Policy
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your Privacy Matters
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We believe privacy is a fundamental right. {SITE_CONFIG.name} is
              built from the ground up with privacy as a core principle.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Highlights */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6">
            {privacyPoints.map((point, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="p-2 bg-primary/10 rounded-lg w-fit mb-4">
                    <point.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{point.title}</CardTitle>
                  <CardDescription className="text-base">
                    {point.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-6">Privacy Policy Details</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Information We Collect
                </h3>
                <p className="text-muted-foreground">
                  <strong>Short answer: None.</strong> We do not collect any
                  personal information. Our tools are designed to work entirely
                  within your browser without sending data to our servers.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Local Storage</h3>
                <p className="text-muted-foreground">
                  Some features, like the Day Tracker, use your browser&apos;s
                  local storage to save your data between sessions. This data is
                  stored only on your device and is never transmitted to us. You
                  can clear this data at any time through your browser settings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Cookies and Tracking
                </h3>
                <p className="text-muted-foreground">
                  We do not use cookies for tracking purposes. We do not use any
                  third-party analytics services. We do not display
                  advertisements or use advertising tracking pixels.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Third-Party Services
                </h3>
                <p className="text-muted-foreground">
                  Our website is hosted on Vercel. While Vercel may collect
                  basic server logs (IP addresses, access times) for operational
                  purposes, we do not access or use this data. We have no
                  third-party integrations that would track your behavior.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">External Links</h3>
                <p className="text-muted-foreground">
                  Our website may contain links to external sites. We are not
                  responsible for the privacy practices of other websites. We
                  encourage you to review the privacy policies of any external
                  sites you visit.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Children&apos;s Privacy
                </h3>
                <p className="text-muted-foreground">
                  Our services are not directed to children under 18. We do not
                  knowingly collect any information from anyone, including
                  children.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Changes to This Policy
                </h3>
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. Any
                  changes will be posted on this page with an updated revision
                  date. Our commitment to not collecting personal data will
                  remain unchanged.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                <p className="text-muted-foreground">
                  If you have any questions about this privacy policy, please
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

            <p className="text-sm text-muted-foreground mt-8 pt-8 border-t">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Privacy by Design</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We built {SITE_CONFIG.name} with privacy as a core feature, not an
            afterthought. Your tax planning data stays exactly where it
            belongs—with you.
          </p>
          <p className="text-muted-foreground mt-4">
            See also our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/about" className="text-primary hover:underline">
              About page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
