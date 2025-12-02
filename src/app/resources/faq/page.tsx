import { Metadata } from "next";
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Frequently Asked Questions | NomadTaxPlanner",
    description:
        "Common questions about digital nomad taxes, residency, and our tools. Get answers to the most pressing questions for location-independent workers.",
};

const faqs = [
    {
        question: "Do digital nomads have to pay taxes?",
        answer:
            "Yes, almost certainly. The idea that you can travel perpetually and pay zero tax is a myth for most people. You typically owe tax either in your country of citizenship (like the US), your country of tax residency, or the country where you physically perform work. Ignoring this can lead to severe penalties.",
    },
    {
        question: "What is the 183-day rule?",
        answer:
            "The 183-day rule is a common standard used by many countries to determine tax residency. Generally, if you spend more than 183 days (about 6 months) in a country within a tax year, you are considered a tax resident and may be taxed on your worldwide income.",
    },
    {
        question: "I'm a US citizen living abroad. Do I still have to file taxes?",
        answer:
            "Yes. The US taxes based on citizenship, not residency. You must file a US tax return every year regardless of where you live. However, you can often reduce your US tax bill to zero using the Foreign Earned Income Exclusion (FEIE) or Foreign Tax Credit (FTC).",
    },
    {
        question: "Does a 'Digital Nomad Visa' make me a tax resident?",
        answer:
            "Not necessarily, but often yes. Some nomad visas explicitly state that you become a tax resident after 183 days (e.g., Spain, Portugal). Others (like some Caribbean visas) exempt you from local income tax. Always read the specific tax terms of your visa.",
    },
    {
        question: "Can I just use a VPN and not tell anyone where I am?",
        answer:
            "This is tax fraud and is highly risky. Tax authorities share data through the Common Reporting Standard (CRS). Your bank will report your account details to the country where they think you are a resident. Immigration records also prove your location.",
    },
    {
        question: "What is a 'Tax Home'?",
        answer:
            "For US tax purposes, your 'tax home' is the general area of your main place of business or employment. You must have a tax home in a foreign country to qualify for the FEIE. If you have no regular place of business, your tax home is where you regularly live.",
    },
    {
        question: "How do I stop being a tax resident of my home country?",
        answer:
            "It depends on the country. Usually, you must prove you have left permanently and established residency elsewhere. This often involves selling your home, closing bank accounts, and spending minimal time there. Some countries (like the US) make it impossible unless you renounce citizenship.",
    },
    {
        question: "Are your tools really free?",
        answer:
            "Yes, our Tax Residency Checker, Day Tracker, and FEIE Calculator are 100% free to use. We may introduce premium features in the future, but the core tools will remain free.",
    },
];

export default function FAQPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Common questions about digital nomad taxes, residency rules, and how to
                    stay compliant while traveling.
                </p>
            </div>

            <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className="mt-12 text-center bg-muted/50 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                <p className="text-muted-foreground mb-6">
                    Explore our detailed guides or use our tools to assess your specific
                    situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                        <Link href="/learn">Visit Learning Center</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/tools/tax-residency-checker">Check Tax Residency</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
