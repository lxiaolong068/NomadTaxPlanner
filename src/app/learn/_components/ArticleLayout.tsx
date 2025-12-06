import Link from "next/link";
import { ChevronRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  lastUpdated: string;
  readTime?: string;
  featuredImageSearch?: string;
  featuredImageAlt?: string;
}

export function ArticleLayout({
  children,
  title,
  description,
  lastUpdated,
  readTime = "5 min read",
  featuredImageSearch,
  featuredImageAlt,
}: ArticleLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Featured Image */}
      {featuredImageSearch && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={featuredImageSearch}
            alt={featuredImageAlt || title}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/learn" className="hover:text-primary transition-colors">
          Learn
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
          {title}
        </span>
      </nav>

      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>NomadTaxPlanner Team</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Updated {lastUpdated}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
              {readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none lg:prose-lg">
        {children}
      </article>

      {/* Footer CTA */}
      <div className="mt-16 p-8 bg-muted/50 rounded-2xl text-center">
        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
        <p className="text-muted-foreground mb-6">
          Check out our other guides or use our free tools to assess your
          situation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/tools/tax-residency-checker">Check Tax Residency</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/learn">Back to Learning Center</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
