import { Metadata } from "next";
import Link from "next/link";
import { Globe, ArrowRight, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllCountryGuides } from "@/lib/country-data";

export const metadata: Metadata = {
  title: "Digital Nomad Tax Guides by Country - Tax Rules & Requirements",
  description:
    "Comprehensive tax guides for digital nomads. Understand tax residency rules, filing requirements, and special programs in popular nomad destinations.",
  keywords: [
    "digital nomad tax guides",
    "country tax guides",
    "expat tax guide",
    "nomad tax rules",
    "international tax guide",
    "tax residency by country",
  ],
  openGraph: {
    title: "Digital Nomad Tax Guides by Country",
    description:
      "Tax residency rules, filing requirements, and special programs for digital nomads.",
    url: `${SITE_CONFIG.url}/guides`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/guides`,
  },
};

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Country Guides", href: "/guides" },
];

export default function GuidesPage() {
  const guides = getAllCountryGuides();

  // Group by region
  const guidesByRegion = guides.reduce(
    (acc, guide) => {
      if (!acc[guide.region]) {
        acc[guide.region] = [];
      }
      acc[guide.region].push(guide);
      return acc;
    },
    {} as Record<string, typeof guides>,
  );

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Digital Nomad Tax Guides by Country
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive guides to help you understand tax residency rules,
            filing requirements, and special programs for digital nomads in
            popular destinations.
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-primary">
              {guides.length}
            </div>
            <div className="text-sm text-muted-foreground">Country Guides</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-primary">183</div>
            <div className="text-sm text-muted-foreground">
              Common Day Threshold
            </div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-primary">10+</div>
            <div className="text-sm text-muted-foreground">
              Special Programs
            </div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-primary">2024</div>
            <div className="text-sm text-muted-foreground">Last Updated</div>
          </div>
        </div>

        {/* Guides by Region */}
        {Object.entries(guidesByRegion).map(([region, regionGuides]) => (
          <section key={region} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Globe className="h-6 w-6" />
              {region}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionGuides.map((guide) => (
                <Link
                  key={guide.code}
                  href={`/guides/${guide.slug}`}
                  className="block group"
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <span className="text-4xl">{guide.flag}</span>
                        <Badge variant="outline">
                          {guide.residencyThreshold} days
                        </Badge>
                      </div>
                      <CardTitle className="mt-3 group-hover:text-primary transition-colors">
                        {guide.name}
                      </CardTitle>
                      <CardDescription>
                        Tax residency threshold: {guide.residencyThreshold} days
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {guide.specialPrograms &&
                        guide.specialPrograms.length > 0 && (
                          <div className="mb-4">
                            <div className="text-sm font-medium mb-2">
                              Special Programs:
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {guide.specialPrograms
                                .slice(0, 3)
                                .map((program) => (
                                  <Badge
                                    key={program}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {program}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                        )}
                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Read Guide <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                        <Calendar className="h-3 w-3" />
                        Updated: {guide.lastUpdated}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Educational Content */}
        <section className="mt-16 prose prose-slate max-w-none">
          <h2>Understanding International Tax for Digital Nomads</h2>
          <p>
            As a digital nomad, understanding the tax rules of countries you
            visit and live in is essential. Each country has its own rules for
            determining tax residency, and exceeding these thresholds can have
            significant tax implications.
          </p>

          <h3>Common Tax Residency Rules</h3>
          <p>
            Most countries use one or more of these tests to determine tax
            residency:
          </p>
          <ul>
            <li>
              <strong>Physical Presence Test:</strong> Spending a certain number
              of days (often 183) in a country triggers tax residency.
            </li>
            <li>
              <strong>Habitual Abode:</strong> Maintaining a permanent home or
              center of life in a country.
            </li>
            <li>
              <strong>Economic Ties:</strong> Having significant economic
              interests or activities in a country.
            </li>
          </ul>

          <h3>Double Taxation and Tax Treaties</h3>
          <p>
            Many countries have tax treaties to prevent double taxation. These
            treaties establish rules for determining which country has taxing
            rights over various types of income and often include tie-breaker
            provisions for people who might be residents of both countries.
          </p>

          <h3>Special Programs for Digital Nomads</h3>
          <p>
            Several countries now offer special visa and tax programs designed
            for digital nomads and remote workers. These programs often provide
            favorable tax treatment, simplified visa processes, and other
            benefits to attract location-independent workers.
          </p>
        </section>
      </div>
    </>
  );
}
