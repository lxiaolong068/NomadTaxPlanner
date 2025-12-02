import Link from "next/link";
import { Metadata } from "next";
import {
    BookOpen,
    Globe,
    Scale,
    Briefcase,
    FileText,
    ArrowRight,
    GraduationCap,
    HelpCircle,
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

export const metadata: Metadata = {
    title: "Digital Nomad Tax Learning Center | NomadTaxPlanner",
    description:
        "Free educational resources for digital nomads. Master the basics of international taxation, tax residency, and double taxation treaties.",
};

const topics = [
    {
        title: "Digital Nomad Taxes 101",
        description:
            "The absolute basics. Start here if you're new to the digital nomad lifestyle and international taxes.",
        href: "/learn/basics",
        icon: GraduationCap,
        badge: "Start Here",
    },
    {
        title: "Tax Residency Explained",
        description:
            "Understand the 183-day rule, tax homes, and how to determine where you actually owe taxes.",
        href: "/learn/tax-residency",
        icon: Globe,
        badge: "Crucial",
    },
    {
        title: "Double Taxation Treaties",
        description:
            "How to use international agreements to avoid paying tax on the same income twice.",
        href: "/learn/double-taxation",
        icon: Scale,
        badge: null,
    },
    {
        title: "Freelancer & Self-Employed",
        description:
            "Specific tax considerations for contractors, freelancers, and business owners abroad.",
        href: "/learn/freelancer-taxes",
        icon: Briefcase,
        badge: null,
    },
    {
        title: "Tax Glossary",
        description:
            "Definitions of common tax terms like FEIE, NHR, CRS, FATCA, and more.",
        href: "/learn/glossary",
        icon: BookOpen,
        badge: null,
    },
    {
        title: "Common Questions (FAQ)",
        description:
            "Quick answers to the most frequently asked questions about nomad taxation.",
        href: "/resources/faq",
        icon: HelpCircle,
        badge: null,
    },
];

export default function LearnPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto">
                        <Badge variant="secondary" className="mb-4">
                            Knowledge Base
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            Tax Learning Center
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Master the basics of international taxation. We break down complex
                            tax concepts into simple, actionable guides for digital nomads.
                        </p>
                    </div>
                </div>
            </section>

            {/* Topics Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topics.map((topic) => (
                            <Link key={topic.href} href={topic.href} className="block group">
                                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="p-2 bg-primary/10 rounded-lg w-fit">
                                                <topic.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            {topic.badge && (
                                                <Badge variant="secondary">{topic.badge}</Badge>
                                            )}
                                        </div>
                                        <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                                            {topic.title}
                                        </CardTitle>
                                        <CardDescription>{topic.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                                            Read Guide <ArrowRight className="h-4 w-4 ml-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA Section */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Stay Updated on Tax Laws
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Tax regulations change frequently. Subscribe to get the latest
                        updates and new guides delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg">
                            <Link href="/blog">
                                Visit Our Blog
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
