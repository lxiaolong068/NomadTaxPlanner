import { Metadata } from "next";
import { ArticleLayout } from "../_components/ArticleLayout";

export const metadata: Metadata = {
    title: "Freelancer & Self-Employed Taxes Abroad | NomadTaxPlanner",
    description:
        "A guide for freelancers and contractors. Learn about invoicing, social security contributions, and structuring your business while traveling.",
};

export default function FreelancerTaxesPage() {
    return (
        <ArticleLayout
            title="Freelancer & Self-Employed Taxes Abroad"
            description="Being your own boss gives you freedom, but it also complicates your taxes. Here is how to handle self-employment while nomadic."
            lastUpdated="December 2024"
            readTime="6 min read"
        >
            <h2>The &quot;Permanent Establishment&quot; Risk</h2>
            <p>
                If you work for yourself, you are a walking business. When you spend time in a country, you risk creating a <strong>Permanent Establishment (PE)</strong> for your business there.
            </p>
            <p>
                If a country decides your business has a PE within its borders, it can tax your business profits, not just your personal income.
            </p>
            <p>
                <strong>Triggers for PE:</strong>
            </p>
            <ul>
                <li>Working from a fixed place (home office or co-working space) for an extended period (often 6+ months).</li>
                <li>Signing contracts or making management decisions while in the country.</li>
                <li>Hiring local employees.</li>
            </ul>

            <h2>Sole Proprietorship vs. LLC/LTD</h2>
            <p>
                How you structure your business matters immensely.
            </p>

            <h3>Sole Proprietorship</h3>
            <p>
                You and the business are the same legal entity.
            </p>
            <ul>
                <li><strong>Pros:</strong> Simple to set up.</li>
                <li><strong>Cons:</strong> Harder to separate personal and business tax residency. If you become a resident of Spain, your entire freelance income is Spanish income.</li>
            </ul>

            <h3>Foreign Company (LLC / LTD)</h3>
            <p>
                You own a separate legal entity (e.g., a US LLC, UK Ltd, or Estonia OU).
            </p>
            <ul>
                <li><strong>Pros:</strong> The company pays tax where it is incorporated (or managed). You only pay personal tax on the salary or dividends you withdraw.</li>
                <li><strong>Cons:</strong> More paperwork. Some countries have &quot;CFC Rules&quot; (Controlled Foreign Corporation) that look through the company and tax you anyway if you live there.</li>
            </ul>

            <h2>Social Security Contributions</h2>
            <p>
                Income tax isn&apos;t the only cost. Social security can be 15-40% of your income.
            </p>
            <ul>
                <li>
                    <strong>EU/EEA:</strong> If you move between EU countries, you generally pay social security in the country where you work (physically). You need form A1 to prove you are paying elsewhere if you are posted temporarily.
                </li>
                <li>
                    <strong>US Citizens:</strong> The US has &quot;Totalization Agreements&quot; with ~30 countries. If you pay social security to one of these countries (e.g., UK, Spain), you are exempt from US Self-Employment Tax (15.3%). If you live in a non-agreement country (e.g., Thailand, Panama), you might have to pay <strong>both</strong>.
                </li>
            </ul>

            <h2>Invoicing and VAT</h2>
            <p>
                If your clients are in Europe, you need to understand VAT (Value Added Tax).
            </p>
            <ul>
                <li><strong>B2B (Business to Business):</strong> Usually &quot;Reverse Charge&quot; applies. You don&apos;t charge VAT if the client is in another country.</li>
                <li><strong>B2C (Business to Consumer):</strong> You might need to charge the VAT rate of the <em>customer&apos;s</em> country (using schemes like VAT MOSS).</li>
                <li><strong>Non-EU Clients:</strong> Usually no VAT is charged.</li>
            </ul>

            <h2>Deductible Expenses</h2>
            <p>
                One benefit of being self-employed is deducting expenses. Common nomad deductions include:
            </p>
            <ul>
                <li>Co-working space fees.</li>
                <li>Laptop and equipment.</li>
                <li>Professional software (Adobe, Zoom, etc.).</li>
                <li>Travel costs (only if strictly business-related, e.g., flying to a conference). <em>Note: Your flight to your next nomad destination is usually NOT deductible.</em></li>
            </ul>
        </ArticleLayout>
    );
}
