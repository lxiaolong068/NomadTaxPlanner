import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  FileText,
  Globe,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  ArticleJsonLd,
  FaqJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SITE_CONFIG } from "@/lib/constants";
import {
  getCountryTaxInfo,
  getAllCountryGuides,
  COUNTRY_GUIDES,
} from "@/lib/country-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all country guides
export async function generateStaticParams() {
  return getAllCountryGuides().map((guide) => ({
    slug: guide.slug,
  }));
}

// Generate metadata for each country
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = Object.values(COUNTRY_GUIDES).find((g) => g.slug === slug);

  if (!guide) {
    return {
      title: "Country Guide Not Found",
    };
  }

  return {
    title: `${guide.name} Tax Guide for Digital Nomads - Tax Rules & Residency`,
    description: `Complete tax guide for digital nomads in ${guide.name}. Learn about the ${guide.residencyThreshold}-day rule, tax rates, filing requirements, and special programs like ${guide.specialPrograms?.join(", ") || "tax incentives"}.`,
    keywords: [
      `${guide.name.toLowerCase()} tax guide`,
      `${guide.name.toLowerCase()} digital nomad`,
      `${guide.name.toLowerCase()} tax residency`,
      `${guide.name.toLowerCase()} expat tax`,
      `${guide.residencyThreshold} day rule ${guide.name.toLowerCase()}`,
    ],
    openGraph: {
      title: `${guide.name} Tax Guide for Digital Nomads`,
      description: `Tax residency rules, rates, and special programs in ${guide.name}.`,
      url: `${SITE_CONFIG.url}/guides/${guide.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/guides/${guide.slug}`,
    },
  };
}

export default async function CountryGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = Object.values(COUNTRY_GUIDES).find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const taxInfo = getCountryTaxInfo(guide.code);

  if (!taxInfo) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Country Guides", href: "/guides" },
    { name: guide.name, href: `/guides/${guide.slug}` },
  ];

  return (
    <>
      <ArticleJsonLd
        title={`${guide.name} Tax Guide for Digital Nomads`}
        description={taxInfo.overview}
        url={`${SITE_CONFIG.url}/guides/${guide.slug}`}
        datePublished={guide.lastUpdated}
        dateModified={guide.lastUpdated}
      />
      <FaqJsonLd faqs={taxInfo.faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <header className="mb-8">
          <Link
            href="/guides"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            All Country Guides
          </Link>
          <div className="flex items-start gap-4">
            <span className="text-6xl">{guide.flag}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {guide.name} Tax Guide
              </h1>
              <p className="text-lg text-muted-foreground">
                Everything digital nomads need to know about taxes in{" "}
                {guide.name}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  {guide.residencyThreshold} day threshold
                </Badge>
                <Badge variant="outline">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {guide.currency}
                </Badge>
                <Badge variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  Updated {guide.lastUpdated}
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Overview */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{taxInfo.overview}</p>
            </CardContent>
          </Card>
        </section>

        {/* Quick Facts */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">
                {guide.residencyThreshold}
              </div>
              <div className="text-sm text-muted-foreground">Day Threshold</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">
                {guide.currency}
              </div>
              <div className="text-sm text-muted-foreground">Currency</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">
                {taxInfo.taxRates[0]?.rate.split(" ")[0]}
              </div>
              <div className="text-sm text-muted-foreground">Top Tax Rate</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">
                {taxInfo.doubleTaxationTreaties.length}+
              </div>
              <div className="text-sm text-muted-foreground">Tax Treaties</div>
            </div>
          </div>
        </section>

        {/* Residency Rules */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Tax Residency Rules
              </CardTitle>
              <CardDescription>
                How {guide.name} determines tax residency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {taxInfo.residencyRules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Tax Rates */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Tax Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Type</th>
                      <th className="text-left py-2 font-medium">Rate</th>
                      <th className="text-left py-2 font-medium">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxInfo.taxRates.map((rate, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 font-medium">{rate.type}</td>
                        <td className="py-3">
                          <Badge variant="secondary">{rate.rate}</Badge>
                        </td>
                        <td className="py-3 text-muted-foreground">
                          {rate.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Special Programs */}
        {taxInfo.specialPrograms.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Special Programs</h2>
            <div className="space-y-4">
              {taxInfo.specialPrograms.map((program, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Eligibility</h4>
                        <ul className="space-y-1">
                          {program.eligibility.map((item, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-primary">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Benefits</h4>
                        <ul className="space-y-1">
                          {program.benefits.map((item, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Filing Requirements */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Filing Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {taxInfo.filingRequirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Remote Work Rules */}
        {taxInfo.remoteWorkRules && (
          <section className="mb-8">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Remote Work Considerations</AlertTitle>
              <AlertDescription>
                <ul className="mt-2 space-y-1">
                  {taxInfo.remoteWorkRules.map((rule, index) => (
                    <li key={index}>• {rule}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </section>
        )}

        {/* Double Tax Treaties */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Double Taxation Treaties</CardTitle>
              <CardDescription>
                {guide.name} has tax treaties with these countries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {taxInfo.doubleTaxationTreaties.map((country) => (
                  <Badge key={country} variant="outline">
                    {country}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {taxInfo.faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important Disclaimer</AlertTitle>
          <AlertDescription>
            This guide provides general information only and should not be
            considered professional tax or legal advice. Tax laws change
            frequently, and individual circumstances vary. Always consult with a
            qualified tax professional familiar with {guide.name} tax law before
            making decisions based on this information. Last updated:{" "}
            {guide.lastUpdated}.
          </AlertDescription>
        </Alert>

        {/* CTA */}
        <div className="text-center py-8 bg-muted rounded-lg">
          <h2 className="text-xl font-bold mb-2">
            Track Your Days in {guide.name}
          </h2>
          <p className="text-muted-foreground mb-4">
            Use our free Day Tracker to monitor your presence and avoid
            unexpected tax obligations.
          </p>
          <Link
            href="/tools/day-tracker"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Start Tracking
          </Link>
        </div>
      </div>
    </>
  );
}
