import Link from "next/link";
import { Metadata } from "next";
import {
  Globe,
  Shield,
  Heart,
  Zap,
  Users,
  Target,
  AlertTriangle,
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SITE_CONFIG, TOOL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About Us | ${SITE_CONFIG.name}`,
  description:
    "Learn about NomadTaxPlanner - free tax planning tools for digital nomads. Our mission is to help location-independent workers understand their tax obligations.",
};

const values = [
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data stays on your device. We never collect, store, or sell personal information. All calculations happen locally in your browser.",
  },
  {
    icon: Zap,
    title: "100% Free Forever",
    description:
      "No hidden fees, premium tiers, or subscription traps. Every tool is completely free because we believe tax education should be accessible to everyone.",
  },
  {
    icon: Heart,
    title: "Built for Nomads",
    description:
      "Created by people who understand the unique challenges of location-independent living. We've faced these tax questions ourselves.",
  },
  {
    icon: Target,
    title: "Educational Focus",
    description:
      "Our goal is to educate and inform, not replace professional advice. We help you ask the right questions and understand the basics.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 md:py-32 overflow-hidden">
        {/* Hero Background Image */}
        <img
          src="https://oxnbbm6ljoyuzqns.public.blob.vercel-storage.com/remote-worker-cafe-laptop-coffee-travel/zDLU0DRe0WI.jpg"
          alt="Remote worker in a cafe"
          className="absolute inset-0 w-full h-full object-cover opacity-10 -z-10"
        />
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Simplifying Taxes for Digital Nomads
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {SITE_CONFIG.name} provides free tools and resources to help
              location-independent workers understand their international tax
              obligations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              International taxation is complex, confusing, and often
              inaccessible. Tax professionals are expensive, and reliable
              information is scattered across dozens of government websites in
              different languages.
            </p>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              We built {SITE_CONFIG.name} to bridge this gap. Our mission is to
              make tax education accessible to every digital nomad, remote
              worker, and location-independent professional—regardless of their
              budget or background.
            </p>
            <p>
              We don&apos;t replace tax professionals. Instead, we help you
              understand the fundamentals so you can make informed decisions and
              have productive conversations with qualified advisors when needed.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every decision we make is guided by these core principles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="p-2 bg-primary/10 rounded-lg w-fit mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Free tools designed specifically for the digital nomad lifestyle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TOOL_LINKS.map((tool) => (
              <Link key={tool.href} href={tool.href} className="block group">
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/tools">View All Tools</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section id="disclaimer" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <Alert variant="destructive" className="bg-background">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">
              Important Disclaimer
            </AlertTitle>
            <AlertDescription className="mt-4 space-y-4 text-base">
              <p>
                The information and tools provided on {SITE_CONFIG.name} are for{" "}
                <strong>educational and informational purposes only</strong>.
                They do not constitute professional tax, legal, or financial
                advice.
              </p>
              <p>
                Tax laws are complex, vary by jurisdiction, and change
                frequently. Your individual circumstances may require
                specialized guidance that only a qualified professional can
                provide.
              </p>
              <p>
                <strong>
                  Always consult with a qualified tax professional
                </strong>{" "}
                before making any tax-related decisions. We are not responsible
                for any actions taken based on the information provided on this
                website.
              </p>
              <p>
                For more details, please review our{" "}
                <Link href="/terms" className="underline hover:no-underline">
                  Terms of Service
                </Link>
                .
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions, feedback, or suggestions? We&apos;d love to hear
            from you. Your input helps us improve our tools and resources for
            the entire nomad community.
          </p>
          <p className="text-muted-foreground">
            Contact us at:{" "}
            <a
              href="mailto:hello@nomadtaxplanner.com"
              className="text-primary hover:underline"
            >
              hello@nomadtaxplanner.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
