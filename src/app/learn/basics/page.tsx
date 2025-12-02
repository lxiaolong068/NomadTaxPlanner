import { Metadata } from "next";
import { ArticleLayout } from "../_components/ArticleLayout";

export const metadata: Metadata = {
    title: "Digital Nomad Taxes 101: The Ultimate Beginner's Guide | NomadTaxPlanner",
    description:
        "New to the digital nomad lifestyle? Learn the absolute basics of international taxation, tax residency, and how to stay compliant while traveling the world.",
};

export default function BasicsPage() {
    return (
        <ArticleLayout
            title="Digital Nomad Taxes 101: The Ultimate Beginner's Guide"
            description="Everything you need to know about taxes when you start living a location-independent lifestyle."
            lastUpdated="December 2024"
            readTime="6 min read"
        >
            <h2>The Myth of &quot;Tax-Free&quot; Living</h2>
            <p>
                One of the most dangerous myths in the digital nomad community is that if you keep moving, you don&apos;t have to pay taxes anywhere. This is known as the &quot;Perpetual Traveler&quot; theory, and while it was somewhat feasible decades ago, in today&apos;s interconnected world of CRS (Common Reporting Standard) and FATCA, it is increasingly difficult and risky.
            </p>
            <p>
                <strong>The reality is simple:</strong> You likely owe taxes somewhere. The question is <em>where</em> and <em>how much</em>.
            </p>

            <h2>Citizenship vs. Residency</h2>
            <p>
                To understand nomad taxes, you must distinguish between two concepts:
            </p>
            <ul>
                <li>
                    <strong>Citizenship:</strong> The country that issued your passport. For most people (except US citizens), citizenship does not automatically trigger tax liability if you don&apos;t live there.
                </li>
                <li>
                    <strong>Tax Residency:</strong> The place where you legally &quot;live&quot; for tax purposes. This is usually determined by where you spend your time or where your center of life is.
                </li>
            </ul>
            <p>
                <em>Note for US Citizens:</em> The United States is one of the few countries that taxes based on citizenship. If you are a US citizen, you must file a US tax return every year, regardless of where you live. However, you can often reduce your bill to zero using the Foreign Earned Income Exclusion (FEIE).
            </p>

            <h2>The 183-Day Rule</h2>
            <p>
                The most common standard for determining tax residency is the <strong>183-day rule</strong>. In many countries, if you spend more than 183 days (about 6 months) in a calendar year within their borders, you automatically become a tax resident.
            </p>
            <p>
                Once you are a tax resident, that country typically has the right to tax your <strong>worldwide income</strong>. This means even if your clients are in the US or UK, the country you are living in wants a cut.
            </p>

            <h2>Territorial vs. Worldwide Tax Systems</h2>
            <p>
                Not all countries tax the same way. Knowing the difference can save you thousands:
            </p>
            <ul>
                <li>
                    <strong>Worldwide Taxation:</strong> Residents are taxed on all income, from all sources, globally. (Most high-tax countries like UK, Germany, Canada, Australia).
                </li>
                <li>
                    <strong>Territorial Taxation:</strong> Residents are only taxed on income earned <em>within</em> the country. Foreign income is often tax-free. (e.g., Thailand, Malaysia, Panama, Costa Rica - with specific conditions).
                </li>
                <li>
                    <strong>Zero Tax:</strong> Countries with no income tax at all. (e.g., UAE, Bahamas, Cayman Islands).
                </li>
            </ul>

            <h2>What Should You Do?</h2>
            <p>
                1. <strong>Track Your Days:</strong> Use our <a href="/tools/day-tracker">Day Tracker</a> to ensure you don&apos;t accidentally trigger tax residency in a high-tax country.
            </p>
            <p>
                2. <strong>Establish a Home Base:</strong> Consider setting up tax residency in a tax-friendly country (like Dubai or Paraguay) to legally disconnect from your high-tax home country.
            </p>
            <p>
                3. <strong>Consult a Professional:</strong> International tax law is complex. Always get advice tailored to your specific situation.
            </p>
        </ArticleLayout>
    );
}
